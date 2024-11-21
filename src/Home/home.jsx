import React from 'react';
import './home.css';
import Header from "../MainResource/Header";
import Logo from "../MainResource/NgHook";

const Home = () => {
    return (
        <>
            <Header/>
            <div className="main-container">
                <aside className="sidebar">
                    <div className="cafe-info">
                        <h3 className="cafe-name">청룡인 커뮤니티</h3>
                        <p className="member-count">회원수 23,456명</p>
                    </div>
                    <ul className="menu-list">
                        <li>전채게시판<span>1000</span> </li>
                        <li>공지사항 <span>12</span></li>
                        <li>자유게시판 <span>2,345</span></li>
                        <li>질문과답변 <span>890</span></li>
                        <li>갤러리 <span>567</span></li>
                        <li>정보공유 <span>234</span></li>
                        <li>동영상 <span>123</span></li>
                    </ul>
                </aside>

                <main className="content">
                    <div className="board-header">
                        <h2>전체글보기</h2>
                        <Logo name={"더 보기"} loc={"/all-bulletin-boards"} className={"more-button"}/>
                    </div>

                    <div className="post-list">
                        {[
                            { number: "공지", title: "청룡인 커뮤니티 이용안내", author: "운영자", comments: "11", date: "2024.11.01", views: "462" },
                            { number: "813", title: "집하가 취업된 집했습니다!", author: "행복한회원", comments: "24", date: "2024.11.05", views: "343" },
                            { number: "812", title: "이런 시절 맞나요 보느는 검아자", author: "열심회원", comments: "9", date: "2024.11.05", views: "24" },
                            { number: "811", title: "이상한 곳으로 만드는 현재", author: "새싹회원", comments: "16", date: "2024.11.05", views: "30" }
                        ].map((post) => (
                            <div key={post.number} className="post-item">
                                <span className="post-number">{post.number}</span>
                                <div className="post-content">
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-author">{post.author} [{post.comments}]</div>
                                </div>
                                <div className="post-info">
                                    <span>{post.date}</span>
                                    <span>{post.views}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* 하단 소식 섹션 */}
            <div className="news-section">
                <h2>용산소식</h2>

                {/* 소식 카드들 */}
                    {[
                        { title: "공지/교육", description: "건설공사 안전점검 수확길 지정 공고 (2024-11-06)" },
                        { title: "행사/교육", description: "용산청소년문화의집 청소년 동아리 축제 개최 (2024-11-05)" },
                        { title: "공지/교육", description: "용산구 사건예방 CCTV 설치 안내 (2024-11-06)" }
                    ].map((card, index) => (
                        <div key={index} className="news-card">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}

            </div>

        </>
    );
};

export default Home;
