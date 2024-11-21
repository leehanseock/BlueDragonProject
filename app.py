from datetime import datetime
import cx_Oracle
from flask import Flask, request, jsonify
from database import get_db_connection
from models import Post
from repository import PostRepository
from config import SECRET_KEY  # config에서 SECRET_KEY를 임포트
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY  # config에서 가져온 SECRET_KEY로 설정
post_repository = PostRepository()

CORS(app)
CORS(app, supports_credentials=True)


@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        # 페이지와 항목 수를 쿼리 파라미터에서 가져옴
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        # 잘못된 페이지나 항목 수가 들어오면 오류 반환
        if page < 1 or per_page < 1:
            return jsonify({'error': '잘못된 페이지 매개변수입니다'}), 400

        # 게시물 데이터를 가져옴
        posts, total_count = post_repository.get_posts_page(page, per_page)

        # 응답 반환
        return jsonify({
            'posts': posts,
            'total_posts': total_count,
            'current_page': page,
            'per_page': per_page,
            'total_pages': (total_count + per_page - 1) // per_page
        })

    except Exception as e:
        # 예외 발생 시 로깅하고 서버 오류 반환
        app.logger.error(f"Error in get_posts: {str(e)}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500




@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        # Fetch the post data from the repository
        post = post_repository.get_post_by_id(post_id)

        if not post:
            return jsonify({'error': '게시글을 찾을 수 없습니다'}), 404

        # Handle datetime fields safely for created_at
        created_at = post.created_at
        if isinstance(created_at, datetime):
            created_at = created_at.strftime('%Y-%m-%d %H:%M:%S')
        elif created_at is None:
            created_at = None

        # Return post details as a JSON response
        return jsonify({
            'post_id': post.post_id,
            'category': post.category,
            'author': post.author,  # Author of the post
            'title': post.title,
            'content': post.content,
            'created_at': created_at,  # Formatted created_at field
            'views': post.views,

            'nickname': post.nickname,  # Comment author's nicknames
            'nickname_comment': post.comment_content  # Combined comments
        })

    except Exception as e:
        import traceback
        app.logger.error(f"Error in get_post: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500

@app.route('/api/posts/', methods=['GET'])
def get_or_search_posts():
    try:
        # 쿼리 파라미터 가져오기
        query = request.args.get('query')  # 검색어
        scope = request.args.get('scope', 'title')  # 기본 검색 범위는 'title'

        # 검색어(query)가 없으면 전체 목록 조회로 처리
        if not query:
            posts = post_repository.get_all_posts()  # 전체 게시글 조회 메서드
        else:
            # 검색 범위 검증
            if scope not in ['title', 'content', 'title_content']:
                return jsonify({'error': '잘못된 검색 범위입니다'}), 400

            # 검색 수행
            posts = post_repository.search_posts(query, scope)

        # 결과 JSON 변환
        return jsonify([{
            'post_id': post.post_id,
            'title': post.title,
            'content': post.content,
            'author': post.author,
            'created_at': post.created_at,
            'views': post.views,
            'category': post.category
        } for post in posts])

    except Exception as e:
        import traceback
        app.logger.error(f"Error in get_or_search_posts: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500







@app.route('/api/posts', methods=['POST'])
def create_post():
    try:
        data = request.json
        title = data.get('title')
        content = data.get('content')
        category = data.get('category')
        user_id = data.get('user_id')  # 사용자 ID

        if not title or not content or not category or not user_id:
            return jsonify({'error': '모든 필드를 입력하세요.'}), 400

        # 1. 사용자 ID가 숫자형인지 확인하고 변환
        try:
            user_id = int(user_id)  # user_id를 숫자형으로 변환
        except ValueError:
            return jsonify({'error': '유효한 사용자 ID가 아닙니다.'}), 400

        # 2. 사용자 ID가 존재하는지 확인
        with get_db_connection() as connection:
            cursor = connection.cursor()

            # 디버그용 로그: user_id 값을 확인하기
            app.logger.debug(f"user_id: {user_id}")  # 추가된 로그

            cursor.execute("SELECT COUNT(*) FROM \"USER\" WHERE USER_ID = :user_id", {'user_id': user_id})
            if cursor.fetchone()[0] == 0:
                return jsonify({'error': '유효한 사용자 ID가 아닙니다.'}), 400

            # 게시글 ID 자동 생성 (시퀀스 사용)
            cursor.execute("SELECT POST_SEQ.NEXTVAL FROM DUAL")
            post_id = cursor.fetchone()[0]

            # 게시글 작성 쿼리
            query = """
                INSERT INTO SITE_POST (POST_ID, POST_TITLE, POST_ARTICLE, USER_ID, AUTHOR_ID, CATEGORY, IS_POST_MODIFIED, DATE_PUBLISHED, VIEWS)
                VALUES (:post_id, :title, :content, :user_id, :user_id, :category, :is_post_modified, SYSDATE, :views)
            """
            cursor.execute(query, {
                'post_id': post_id,
                'title': title,
                'content': content,
                'user_id': user_id,
                'category': category,
                'is_post_modified': 0,
                'views': 0
            })

            connection.commit()

        return jsonify({'message': '게시글이 성공적으로 작성되었습니다.'}), 201

    except Exception as e:
        import traceback
        app.logger.error(f"Error in create_post: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': '서버 오류가 발생했습니다.'}), 500



@app.route('/api/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    try:
        data = request.get_json()

        if not all(key in data for key in ['title', 'content']):
            return jsonify({'error': '필수 입력값이 누락되었습니다'}), 400

        if not post_repository.update_post(post_id, data['title'], data['content']):
            return jsonify({'error': '게시글을 찾을 수 없습니다'}), 404

        return jsonify({'message': '게시글이 수정되었습니다'})

    except Exception as e:
        app.logger.error(f"Error in update_post: {str(e)}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500


@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    try:
        if not post_repository.delete_post(post_id):
            return jsonify({'error': '게시글을 찾을 수 없습니다'}), 404

        return jsonify({'message': '게시글이 삭제되었습니다'})

    except Exception as e:
        app.logger.error(f"Error in delete_post: {str(e)}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500


@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        nickname = data.get('nickname')

        if not email or not password or not nickname:
            return jsonify({'error': '모든 필드를 입력하세요.'}), 400

        with get_db_connection() as connection:
            cursor = connection.cursor()

            # 이메일 중복 체크
            cursor.execute("SELECT COUNT(*) FROM \"USER\" WHERE EMAIL = :1", [email])
            if cursor.fetchone()[0] > 0:
                return jsonify({'error': '이미 사용 중인 이메일입니다.'}), 400

            # 비밀번호 해싱
            hashed_password = generate_password_hash(password)

            # USER_SEQ.NEXTVAL로 user_id 생성
            cursor.execute("SELECT USER_SEQ.NEXTVAL FROM DUAL")
            user_id = cursor.fetchone()[0]

            # 기본 역할 설정 (예: 'USER')
            role = 'USER'

            # 사용자 정보 삽입
            query = """
                INSERT INTO "USER" (USER_ID, EMAIL, PASSWORD, NICKNAME, CREATED_DATE, ROLE)
                VALUES (:1, :2, :3, :4, SYSDATE, :5)
            """
            cursor.execute(query, [user_id, email, hashed_password, nickname, role])

            # 커밋하여 데이터 저장
            connection.commit()

        return jsonify({'message': '회원가입 성공!'}), 201

    except Exception as e:
        import traceback
        app.logger.error(f"Error in register: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': '서버 오류가 발생했습니다.'}), 500




@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': '모든 필드를 입력하세요.'}), 400

        with get_db_connection() as connection:
            cursor = connection.cursor()

            # 사용자 정보 조회
            query = "SELECT USER_ID, PASSWORD, NICKNAME FROM \"USER\" WHERE EMAIL = :1"
            cursor.execute(query, [email])
            user = cursor.fetchone()

            if not user or not check_password_hash(user[1], password):
                return jsonify({'error': '이메일 또는 비밀번호가 잘못되었습니다.'}), 401

            # JWT 토큰 생성
            payload = {
                'user_id': user[0],
                'nickname': user[2],
                'exp': datetime.utcnow() + timedelta(hours=2)  # 토큰 만료 시간
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'message': '로그인 성공!', 'token': token}), 200

    except Exception as e:
        import traceback
        app.logger.error(f"Error in login: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': '서버 오류가 발생했습니다.'}), 500



if __name__ == '__main__':
    app.run(host='192.168.24.158', port=5000, debug=True)
