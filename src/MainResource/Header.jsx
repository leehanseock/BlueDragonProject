import React from "react";
import './MainCss/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo" onClick={() => window.location.href = 'ysProject.html'}>청룡인</div>
            <nav className="nav-menu">
                <a href="AllBulletinBoards.html">게시판</a>
                <a href="notice.html">공지사항</a>
                <a href="#blog">챗봇상담</a>
                <a href="#mail">정신건강 사업정보</a>
            </nav>
            <div className="user-menu">
                <a href="login.html">로그인</a>
                <a href="signUp.html">회원가입</a>
            </div>
        </header>
    );
}

export default Header;