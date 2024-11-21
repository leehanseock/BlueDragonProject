
from typing import List, Optional, Dict, Any
from datetime import datetime

import cx_Oracle
from docutils.nodes import comment

from app import SECRET_KEY
from database import get_db_connection
from models import Post


from flask import request, jsonify
import jwt

class PostRepository:

    def __init__(self):
        pass


    def get_posts_page(self, page: int, per_page: int) -> tuple[List[Dict[str, Any]], int]:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            # Get total count
            cursor.execute("SELECT COUNT(*) FROM SITE_POST")
            total_count = cursor.fetchone()[0]

            offset = (page - 1) * per_page
            query = """
                SELECT p.POST_ID, p.POST_TITLE, u.NICKNAME, p.DATE_PUBLISHED, p.VIEWS, p.category
                FROM SITE_POST p
                JOIN "USER" u ON p.USER_ID = u.USER_ID
                ORDER BY p.DATE_PUBLISHED DESC
                OFFSET :1 ROWS FETCH NEXT :2 ROWS ONLY
            """

            # Execute the query with offset and limit
            cursor.execute(query, [offset, per_page])

            posts = [{
                'post_id': row[0],
                'title': row[1],
                'author': row[2],
                'created_at': row[3].strftime('%Y-%m-%d %H:%M:%S'),  # Format the timestamp
                'views': row[4],
                'category': row[5]
            } for row in cursor]

            return posts, total_count


    def get_post_by_id(self, post_id: int) -> Optional[Post]:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            # Increment views
            cursor.execute(
                "UPDATE SITE_POST SET views = views + 1 WHERE post_id = :1",
                [post_id]
            )

            # Fetch the post data
            query = """
                SELECT 
                    p.POST_ID, 
                    p.POST_TITLE, 
                    p.POST_ARTICLE, 
                    p.USER_ID AS POST_AUTHOR_ID, 
                    p.DATE_PUBLISHED, 
                    p.VIEWS, 
                    p.CATEGORY, 
                    u1.NICKNAME AS POST_AUTHOR_NICKNAME,
                    pc.COMMENT_ID,  -- 댓글 ID
                    pc.COMMENT_CONTENT,
                    pc.USER_ID AS COMMENT_AUTHOR_ID,
                    u2.NICKNAME AS COMMENT_AUTHOR_NICKNAME
                FROM 
                    SITE_POST p
                JOIN 
                    "USER" u1 ON p.USER_ID = u1.USER_ID
                LEFT JOIN 
                    POST_COMMENT pc ON p.POST_ID = pc.POST_ID
                LEFT JOIN 
                    "USER" u2 ON pc.USER_ID = u2.USER_ID
                WHERE 
                    p.POST_ID = :1
            """

            cursor.execute(query, [post_id])

            # Convert rows to dictionaries by using column names
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]  # Get column names

            # Convert rows from tuples to dictionaries
            dict_rows = [dict(zip(columns, row)) for row in rows]

            if not dict_rows:
                return None

            # Extract data for the post
            post_id = dict_rows[0]["POST_ID"]
            title = dict_rows[0]["POST_TITLE"]
            content = dict_rows[0]["POST_ARTICLE"]
            author = dict_rows[0]["POST_AUTHOR_ID"]  # Updated alias
            author_nickname = dict_rows[0]["POST_AUTHOR_NICKNAME"]
            created_at = dict_rows[0]["DATE_PUBLISHED"]
            views = dict_rows[0]["VIEWS"]
            category = dict_rows[0]["CATEGORY"]

            # If content is a LOB (CLOB), convert it to a string
            if isinstance(content, cx_Oracle.LOB):
                content = content.read()
            elif isinstance(content, str):
                content = content  # Keep it as is if it's already a string

            # Handle comments and comment-related nicknames
            comments = []
            comment_nicknames = []
            for row in dict_rows:
                comment_content = row.get("COMMENT_CONTENT")
                comment_nickname = row.get("COMMENT_AUTHOR_NICKNAME")
                if comment_content:
                    comments.append(comment_content)
                if comment_nickname:
                    comment_nicknames.append(comment_nickname)

            combined_comments = ", ".join(comments)
            combined_comment_nicknames = ", ".join(comment_nicknames)

            # Handle created_at field safely
            if isinstance(created_at, datetime):
                created_at.strftime('%Y-%m-%d %H:%M:%S')
            elif isinstance(created_at, str):
                try:
                    created_at_dt = datetime.strptime(created_at, '%Y-%m-%d %H:%M:%S')
                    created_at_dt.strftime('%Y-%m-%d %H:%M:%S')
                except ValueError:
                    created_at
            else:
                created_at = None  # Handle unexpected cases

            # Return the Post object
            return Post(
                post_id=post_id,
                author=author,
                category=category,
                title=title,
                content=content,
                created_at=created_at.strftime('%Y-%m-%d %H:%M:%S') if isinstance(created_at, datetime) else created_at,
                views=views,

                nickname=combined_comment_nicknames,  # Comments' nicknames combined
                comment_content=combined_comments,  # Comments combined
                user_id=author,
                comment_id = None
            )

    def get_all_posts(self, query: Optional[str] = None, scope: str = "title") -> List[Post]:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            sql_query = """
                SELECT p.POST_ID, p.POST_TITLE, p.POST_ARTICLE, p.DATE_PUBLISHED, 
                       p.VIEWS, u.NICKNAME, p.CATEGORY
                FROM SITE_POST p
                JOIN "USER" u ON p.USER_ID = u.USER_ID
            """

            if query:
                if scope == "title":
                    search_condition = "p.POST_TITLE LIKE '%' || :query || '%'"
                elif scope == "content":
                    search_condition = "p.POST_ARTICLE LIKE '%' || :query || '%'"
                elif scope == "title_content":
                    search_condition = "(p.POST_TITLE LIKE '%' || :query || '%' OR p.POST_ARTICLE LIKE '%' || :query || '%')"
                else:
                    search_condition = None

                if search_condition:
                    sql_query += f" WHERE {search_condition}"



            cursor.execute(query)
            rows = cursor.fetchall()

            posts = []
            columns = [col[0] for col in cursor.description]
            for row in rows:
                row_dict = dict(zip(columns, row))
                posts.append(Post(
                    post_id=row_dict["POST_ID"],
                    title=row_dict["POST_TITLE"],
                    content=row_dict["POST_ARTICLE"],
                    author=row_dict["NICKNAME"],
                    created_at=row_dict["DATE_PUBLISHED"],
                    views=row_dict["VIEWS"],
                    category=row_dict["CATEGORY"],
                    user_id=None,  # 필요시 추가
                    comment_id=None,  # 필요시 추가
                    comment_content=None,  # 필요시 추가
                    nickname = row_dict["NICKNAME"]  # 댓글 작성자 닉네임 (적절한 값으로 수정)

                ))
            return posts

    def search_posts(self, query: str, scope: str = "title") -> List[Post]:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            # 기본 검색 쿼리
            sql_query = """
                SELECT p.POST_ID, p.POST_TITLE, p.POST_ARTICLE, p.DATE_PUBLISHED, 
                       p.VIEWS, u.NICKNAME, p.CATEGORY
                FROM SITE_POST p
                JOIN "USER" u ON p.USER_ID = u.USER_ID
            """

            # 검색 조건 추가
            if scope == "title":
                search_condition = "p.POST_TITLE LIKE '%' || :query || '%'"
            elif scope == "content":
                search_condition = "p.POST_ARTICLE LIKE '%' || :query || '%'"
            elif scope == "title_content":
                search_condition = "(p.POST_TITLE LIKE '%' || :query || '%' OR p.POST_ARTICLE LIKE '%' || :query || '%')"
            else:
                raise ValueError("Invalid search scope. Use 'title', 'content', or 'title_content'.")

            sql_query += f" WHERE {search_condition}"

            # 쿼리 실행
            cursor.execute(sql_query, {"query": query})
            rows = cursor.fetchall()

            # 결과를 Post 객체 리스트로 변환
            posts = []
            columns = [col[0] for col in cursor.description]
            for row in rows:
                row_dict = dict(zip(columns, row))
                posts.append(Post(
                    post_id=row_dict["POST_ID"],
                    title=row_dict["POST_TITLE"],
                    content=row_dict["POST_ARTICLE"],
                    author=row_dict["NICKNAME"],
                    created_at=row_dict["DATE_PUBLISHED"],
                    views=row_dict["VIEWS"],
                    category=row_dict["CATEGORY"],
                    user_id=None,  # 필요시 추가
                    comment_id=None,  # 필요시 추가
                    comment_content=None,  # 필요시 추가
                    nickname = row_dict["NICKNAME"]  # 댓글 작성자 닉네임 (적절한 값으로 수정)

                ))
            return posts

    def create_post(self, post: Post) -> int:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            cursor.execute("SELECT post_seq.NEXTVAL FROM DUAL")
            post_id = cursor.fetchone()[0]

            # user_id가 숫자형이어야 한다면, 강제로 int로 변환
            user_id = int(post.user_id)

            cursor.execute("""
                INSERT INTO posts (post_id, title, content, user_id)
                VALUES (:1, :2, :3, :4)
            """, [post_id, post.title, post.content, user_id])

            connection.commit()
            return post_id

    def update_post(self, post_id: int, title: str, content: str) -> bool:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            cursor.execute("""
                UPDATE posts 
                SET title = :1, content = :2, updated_at = CURRENT_TIMESTAMP
                WHERE post_id = :3
            """, [title, content, post_id])

            success = cursor.rowcount > 0
            connection.commit()
            return success

    def delete_post(self, post_id: int) -> bool:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            cursor.execute("DELETE FROM posts WHERE post_id = :1", [post_id])

            success = cursor.rowcount > 0
            connection.commit()
            return success



    def token_required(f):
        def decorator(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': '토큰이 없습니다.'}), 401
            try:
                jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                return jsonify({'error': '토큰이 만료되었습니다.'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': '유효하지 않은 토큰입니다.'}), 401
            return f(*args, **kwargs)
        return decorator

