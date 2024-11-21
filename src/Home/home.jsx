import React from 'react';
import './home.css';
import Header from "../MainResource/Header";

function Home() {
    return (
        <div>
            <Header/>
            <div className="home-main-container">
                <Sidebar />
                <MainContent />
            </div>
            <NewsSection />
        </div>
    );
}

function Sidebar() {
    return (
        <aside className="home-sidebar">
            <div className="home-cafe-info">
                <div className="home-cafe-name">청룡인 커뮤니티</div>
                <div className="home-member-count">회원수 23,456명</div>
            </div>
            <MenuList />
        </aside>
    );
}

function MenuList() {
    const menuItems = [
        { href: "notice.html", text: "공지사항", count: "12" },
        { href: "JaUgesipan.html", text: "자유게시판", count: "2,345" },
        { href: "QnA.html", text: "질문과답변", count: "890" },
        { href: "gallery.html", text: "갤러리", count: "567" },
        { href: "info.html", text: "정보공유", count: "234" },
        { href: "video.html", text: "동영상", count: "123" }
    ];

    return (
        <ul className="home-menu-list">
            {menuItems.map((item, index) => (
                <li key={index}>
                    <a href={item.href}>
                        {item.text} <span className="home-menu-count">{item.count}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

function MainContent() {
    const posts = [
        {
            number: "813",
            title: "집하가 취업된 집했습니다!",
            author: "행복한회원",
            comments: "24",
            date: "2024.11.05",
            views: "343"
        },
        {
            number: "812",
            title: "이런 시절 맞나요 보느는 검아자",
            author: "열심회원",
            comments: "9",
            date: "2024.11.05",
            views: "24"
        },
        {
            number: "811",
            title: "이상한 곳으로 만드는 현재",
            author: "새싹회원",
            comments: "16",
            date: "2024.11.05",
            views: "30"
        }
    ];

    return (
        <main className="home-content">
            <BoardHeader />
            <div className="home-post-list">
                <NoticePost />
                {posts.map((post, index) => (
                    <PostItem key={index} {...post} />
                ))}
            </div>
        </main>
    );
}

function BoardHeader() {
    return (
        <div className="home-board-header">
            <h2 className="home-board-title">전체글보기</h2>
            <button
                className="home-write-button"
                onClick={() => window.location.href = 'AllBulletinBoards.html'}
            >
                더 보기
            </button>
        </div>
    );
}

function NoticePost() {
    return (
        <div className="home-post-item home-notice">
            <div className="home-post-number">공지</div>
            <div className="home-post-info">
                <a href="#" className="home-post-title">청룡인 커뮤니티 이용안내</a>
                <div className="home-post-meta">
                    <span>운영자</span>
                    <span className="home-comment-count">[11]</span>
                </div>
            </div>
            <div className="home-post-date">2024.11.05</div>
            <div className="home-post-views">462</div>
        </div>
    );
}

function PostItem({ number, title, author, comments, date, views }) {
    return (
        <div className="home-post-item">
            <div className="home-post-number">{number}</div>
            <div className="home-post-info">
                <a href="#" className="home-post-title">{title}</a>
                <div className="home-post-meta">
                    <span>{author}</span>
                    <span className="home-comment-count">[{comments}]</span>
                </div>
            </div>
            <div className="home-post-date">{date}</div>
            <div className="home-post-views">{views}</div>
        </div>
    );
}

function NewsSection() {
    const newsCards = [
        {
            category: "공지/교육",
            content: "건설공사 안전점검 수확길 지정 공고 (2024-11-06)"
        },
        {
            category: "행사/교육",
            content: "용산청소년문화의집 청소년 동아리 축제 개최 (2024-11-05)"
        },
        {
            category: "공지/교육",
            content: "용산구 사건예방 CCTV 설치 안내 (2024-11-06)"
        }
    ];

    return (
        <div className="home-news-section">
            <h2>정신건강 사업정보</h2>
            <div className="home-carousel-container">
                <button className="home-carousel-arrow home-prev">&#8249;</button>
                <div className="home-news-cards">
                    {newsCards.map((card, index) => (
                        <NewsCard key={index} {...card} />
                    ))}
                </div>
                <button className="home-carousel-arrow home-next">&#8250;</button>
            </div>
        </div>
    );
}

function NewsCard({ category, content }) {
    return (
        <div className="home-news-card">
            <h3>{category}</h3>
            <p>{content}</p>
        </div>
    );
}

export default Home;