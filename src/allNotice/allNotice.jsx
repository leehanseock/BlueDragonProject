import React from 'react';
import './allNotice.css';

const AllNotice = () => {
    const noticeItems = [
        {
            id: 1,
            image: "https://placehold.co/400x300",
            title: "12월 슬기로운 고혈압·당뇨관리 공부방",
            description: "고혈압·당뇨 관리 교육 프로그램 안내"
        },
        {
            id: 2,
            image: "https://placehold.co/400x300",
            title: "2024년 제4회 정비사업 관련 교육",
            description: "정비사업 교육 프로그램 안내"
        },
        {
            id: 3,
            image: "https://placehold.co/400x300",
            title: "강남구 어르신복지 정보 안내",
            description: "어르신 복지 서비스 안내"
        },
        {
            id: 4,
            image: "https://placehold.co/400x300",
            title: "신중년다지원 일자리센터 활성화프로그램",
            description: "일자리 지원 프로그램 안내"
        },
        {
            id: 5,
            image: "https://placehold.co/400x300",
            title: "지방세 체납차량 단속",
            description: "체납차량 단속 안내"
        },
        {
            id: 6,
            image: "https://placehold.co/400x300",
            title: "열린공고 및 주민설명회",
            description: "주민설명회 일정 안내"
        }
    ];

    return (
        <>
            <header className="header">
                <div className="logo" onClick={() => window.location.href='ysProject.html'}>청룡인</div>
                <nav className="nav-menu">
                    <a href="AllBulletinBoards.html">게시판</a>
                    <a href="notice.html">공지사항</a>
                    <a href="#blog">챗봇상담</a>
                    <a href="allNotice.html">정책 알림판</a>
                </nav>
                <div className="user-menu">
                    <a href="login.html">로그인</a>
                    <a href="signUp.html">회원가입</a>
                </div>
            </header>

            <div className="news-section">
                <h2>정책 알림판</h2>
                <div className="notice-grid">
                    {noticeItems.map(item => (
                        <div key={item.id} className="notice-item">
                            <img src={item.image} alt={item.title} />
                            <div className="notice-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllNotice;