import React from 'react';
import './postFirst.css'
import Header from "../MainResource/Header";

const PostHeader = () => (
    <div className="post-header">
        <h1 className="post-title">게시글 제목이 여기에 표시됩니다</h1>
        <div className="post-info">
            <div className="post-author">
                <div className="author-image"></div>
                <span>작성자 이름</span>
                <span>2024.11.19</span>
            </div>
            <div className="post-stats">
                <span>조회 123</span>
                <span>댓글 45</span>
            </div>
        </div>
    </div>
);

const PostContent = () => (
    <div className="post-content">
        게시글 내용이 여기에 표시됩니다.
        여러 줄의 텍스트가 들어갈 수 있습니다.
    </div>
);

const PostFooter = () => (
    <div className="post-footer">
        <div className="reaction-buttons">
            <button className="button">👍 좋아요</button>
            <button className="button">💬 댓글</button>
        </div>
        <div>
            <button className="button">수정</button>
            <button className="button">삭제</button>
        </div>
    </div>
);

const CommentsSection = () => (
    <div className="comments-section">
        <h3>댓글</h3>
        <div className="comment-form">
            <textarea className="comment-input" placeholder="댓글을 입력하세요"></textarea>
            <button className="button">댓글 작성</button>
        </div>
    </div>
);

// 게시글 리스트 컴포넌트
const PostList = ({ posts }) => {
    return (
        <tbody>
        {posts.map((post, index) => (
            <tr key={index}>
                <td>
                    <a href="#">{post.title}</a>
                    {post.commentCount && (
                        <span className="comment-count">[{post.commentCount}]</span>
                    )}
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
            </tr>
        ))}
        </tbody>
    );
};



const postFirst = () => (
    <div>
        <Header />
        <div className="container">
            <div className="post-container">
                <PostHeader />
                <PostContent />
                <PostFooter />
                <CommentsSection />
                <PostList />
            </div>
        </div>
    </div>
);

export default postFirst;
