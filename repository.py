
from typing import List, Optional, Dict, Any
from datetime import datetime

import cx_Oracle

from database import get_db_connection
from models import Post



class PostRepository:
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
                SELECT p.POST_ID, p.POST_TITLE, p.POST_ARTICLE, u.USER_ID, 
                       p.DATE_PUBLISHED, p.VIEWS, p.USER_ID, p.CATEGORY
                FROM SITE_POST p
                JOIN "USER" u ON p.USER_ID = u.USER_ID
                WHERE p.POST_ID = :1
            """
            cursor.execute(query, [post_id])
            row = cursor.fetchone()

            if not row:
                return None

            # Unpack row data
            post_id, title, content, author, created_at, views, user_id, category= row

            # If content is a LOB (CLOB), convert it to a string
            if isinstance(content, cx_Oracle.LOB):
                content = content.read()
            elif isinstance(content, str):
                content = content  # Keep it as is if it's already a string

            # Handle created_at field safely
            if isinstance(created_at, datetime):
                created_at_str = created_at.strftime('%Y-%m-%d %H:%M:%S')
            elif isinstance(created_at, str):
                try:
                    created_at_dt = datetime.strptime(created_at, '%Y-%m-%d %H:%M:%S')
                    created_at_str = created_at_dt.strftime('%Y-%m-%d %H:%M:%S')
                except ValueError:
                    created_at_str = created_at
            else:
                created_at_str = None  # Handle unexpected cases

            # Return the Post object (no updated_at field)
            return Post(
                post_id=post_id,
                title=title,
                content=content,
                author=author,
                created_at=created_at_str,
                views=views,
                user_id=user_id,
                category=category
            )


    def create_post(self, post: Post) -> int:
        with get_db_connection() as connection:
            cursor = connection.cursor()

            cursor.execute("SELECT post_seq.NEXTVAL FROM DUAL")
            post_id = cursor.fetchone()[0]

            cursor.execute("""
                INSERT INTO posts (post_id, title, content, member_id)
                VALUES (:1, :2, :3, :4)
            """, [post_id, post.title, post.content, post.member_id])

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
