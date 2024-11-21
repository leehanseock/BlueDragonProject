import React from "react";
import './postFirst.css';
import Header from "../MainResource/Header";
import Sidebar from "../MainResource/sidebar";


// 게시글 컴포넌트
const PostContent = () => {
    return (
        <div className="postFirst-post-container">
            <div className="postFirst-post-header">
                <h1 className="postFirst-post-title">게시글 제목이 여기에 표시됩니다</h1>
                <div className="postFirst-post-info">
                    <div className="postFirst-post-author">
                        <div className="postFirst-author-image"></div>
                        <span>작성자 이름</span>
                        <span>2024.11.19</span>
                    </div>
                    <div className="postFirst-post-stats">
                        <span>조회 123</span>
                        <span>댓글 45</span>
                    </div>
                </div>
            </div>

            <div className="postFirst-post-content">
                게시글 내용이 여기에 표시됩니다.
                여러 줄의 텍스트가 들어갈 수 있습니다.
            </div>

            <div className="postFirst-post-footer">
                <div className="postFirst-reaction-buttons">
                    <button className="postFirst-button">👍 좋아요</button>
                    <button className="postFirst-button">💬 댓글</button>
                </div>
                <div>
                    <button className="postFirst-button">수정</button>
                    <button className="postFirst-button">삭제</button>
                </div>
            </div>

            <div className="postFirst-comments-section">
                <h3>댓글</h3>
                <div className="postFirst-comment-form">
                    <textarea className="postFirst-comment-input" placeholder="댓글을 입력하세요"></textarea>
                    <button className="postFirst-button">댓글 작성</button>
                </div>
            </div>
        </div>
    );
};

// 게시글 리스트 컴포넌트
const PostList = () => {
    const posts = [
        { title: "[생방송] 누가 예상을 물리자마자 ㅋㅋㅋ", author: "칼칼멸어", date: "2024.11.15.", comments: 54 },
        { title: "[자유] 씹덕왔니?", author: "마현빈", date: "2024.11.15.", comments: 0 },
        { title: "[공지] 오늘 조금 늦음 ㅅㄱ", author: "이한석", date: "2024.11.15.", comments: 13 },
        { title: "[유머] 목균 폴렌스 중고시설 당신은 어디에?", author: "마녀의 일상", date: "2024.11.15.", comments: 0 },
        { title: "[자유] 8시부터 늦게 오실거 같음", author: "낭이s", date: "2024.11.15.", comments: 23 }
    ];

    return (
        <div className="postFirst-post-list">
            <div className="postFirst-post-list-title">전체글</div>
            <table className="postFirst-table">
                <thead>
                <tr>
                    <th style={{ width: "60%" }}>제목</th>
                    <th style={{ width: "20%" }}>작성자</th>
                    <th style={{ width: "20%" }}>작성일</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post, index) => (
                    <tr key={index}>
                        <td>
                            <a href="#">{post.title}</a>
                            {post.comments > 0 && <span className="postFirst-comment-count">[{post.comments}]</span>}
                        </td>
                        <td>{post.author}</td>
                        <td>{post.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="postFirst-pagination">
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </div>
        </div>
    );
};

// App 컴포넌트 (최상위 컴포넌트)
const PostFirst = () => {
    return (
        <div className="postFirst-app">
            <Header />
            <Sidebar/>
            <div className="postFirst-container">
                <PostContent />
                <PostList />
            </div>
        </div>
    );
};

export default PostFirst;
