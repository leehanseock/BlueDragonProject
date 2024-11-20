import React from "react";
import './MainCss/Header.css';
import {Link} from "react-router-dom";
import Logo from "./NgHook";



function Header() {
    return (
        <header className="header">
            {/* eslint-disable-next-line no-undef */}
            <Logo name={"청룡인"} loc={"/"} className={"logo"} />
            <nav className="nav-menu">
                <Link to="/all-bulletin-boards">게시판</Link>
                <Link to="/Notice">공지사항</Link>
                <Link to="/chatbot">챗봇상담</Link>
                <Link to="/health-info">정신건강 사업정보</Link>
            </nav>
            <div className="user-menu">
                <Link to="/Login">로그인</Link>
                <Link to="/signUp">회원가입</Link>
            </div>
        </header>
    );
}

export default Header;