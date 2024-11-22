// PostFirst.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './postFirst.css';
import Header from "../MainResource/Header";
import Sidebar from "../MainResource/sidebar";
import { fetchPostById, deletePost } from '../api';

const PostContent = ({ post, onDelete }) => {
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    if (!post) return <div>로딩 중...</div>;

    const handleDelete = async () => {
        try {
            await deletePost(post.post_id);
            navigate('/');
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${post.post_id}`);
    };

    const handleCommentSubmit = () => {
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            author: 'SJ', // 현재 로그인한 사용자 정보로 대체
            content: commentText,
            created_at: new Date().toISOString()
        };

        setComments([...comments, newComment]);
        setCommentText('');
    };

    return (
        <div className="postFirst-post-container">
            <div className="postFirst-post-header">
                <h1 className="postFirst-post-title">{post.title}</h1>
                <div className="postFirst-post-info">
                    <div className="postFirst-post-author">
                        <div className="postFirst-author-image"></div>
                        <span>{post.author}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="postFirst-post-stats">
                        <span>조회 {post.views}</span>
                        <span>댓글 {post.comments_count || 0}</span>
                    </div>
                </div>
            </div>

            <div className="postFirst-post-content">
                {post.content}
            </div>

            <div className="postFirst-post-footer">
                <div className="postFirst-reaction-buttons">
                    <button className="postFirst-button">👍 좋아요</button>
                    <button className="postFirst-button">💬 댓글</button>
                </div>
                <div>
                    <button
                        className="postFirst-button"
                        onClick={handleEdit}
                    >수정</button>
                    <button
                        className="postFirst-button"
                        onClick={handleDelete}
                    >삭제</button>
                </div>
            </div>

            <div className="postFirst-comments-section">
                <h3>댓글</h3>
                <div className="postFirst-comment-form">
                    <textarea
                        className="postFirst-comment-input"
                        placeholder="댓글을 입력하세요"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button
                        className="postFirst-button"
                        onClick={handleCommentSubmit}
                    >
                        댓글 작성
                    </button>
                </div>
                <div className="postFirst-comments-list">
                    {comments.map(comment => (
                        <div key={comment.id} className="postFirst-comment">
                            <div className="postFirst-comment-header">
                                <span className="postFirst-comment-author">
                                    {comment.author}
                                </span>
                                <span className="postFirst-comment-date">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="postFirst-comment-content">
                                {comment.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PostFirst = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                setLoading(true);
                const data = await fetchPostById(postId);
                setPost(data);
            } catch (err) {
                setError('게시글을 불러오는데 실패했습니다.');
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [postId]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="postFirst-app">
            <Header />
            <Sidebar />
            <div className="postFirst-container">
                <PostContent post={post} />
            </div>
        </div>
    );
};

export default PostFirst;