from datetime import datetime

import cx_Oracle
from flask import Flask, request, jsonify
from models import Post
from repository import PostRepository
from config import Config
from flask_cors import CORS




app = Flask(__name__)
app.config.from_object(Config)
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
        post = post_repository.get_post_by_id(post_id)

        if not post:
            return jsonify({'error': '게시글을 찾을 수 없습니다'}), 404

        # Handle CLOB content (if content is CLOB type, decode it to a string)
        content = post.content
        if isinstance(content, cx_Oracle.LOB):
            content = content.read()
        elif not isinstance(content, str):
            content = str(content)

        # Handle datetime fields safely for created_at
        created_at = post.created_at
        if isinstance(created_at, datetime):
            created_at = created_at.strftime('%Y-%m-%d %H:%M:%S')
        elif created_at is None:
            created_at = None

        return jsonify({
            'post_id': post.post_id,
            'title': post.title,
            'content': content,
            'author': post.author,
            'created_at': created_at,
            'views': post.views,
            'category': post.category
        })

    except Exception as e:
        import traceback
        app.logger.error(f"Error in get_post: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500

@app.route('/api/posts', methods=['POST'])
def create_post():
    try:
        data = request.get_json()

        if not all(key in data for key in ['title', 'content', 'member_id']):
            return jsonify({'error': '필수 입력값이 누락되었습니다'}), 400

        post = Post(
            post_id=0,  # Will be set by sequence
            title=data['title'],
            content=data['content'],
            member_id=data['member_id']
        )

        post_id = post_repository.create_post(post)
        return jsonify({
            'message': '게시글이 작성되었습니다',
            'post_id': post_id
        }), 201

    except Exception as e:
        app.logger.error(f"Error in create_post: {str(e)}")
        return jsonify({'error': '서버 오류가 발생했습니다'}), 500


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


if __name__ == '__main__':
    app.run(debug=True, port=5000)