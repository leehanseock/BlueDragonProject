import React, { useState, useEffect } from "react";
import './MainCss/Header.css';
import { Link, useNavigate } from "react-router-dom";
import Logo from "./NgHook";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태 확인
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // JWT 토큰에서 닉네임 추출
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setNickname(payload.nickname);
            } catch (error) {
                console.error('토큰 파싱 에러:', error);
            }
        }
    }, []);


    // userInfo(()=>{
    //     return(payload.nickname);
    // })

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setNickname('');
        navigate('/');
    };

    return (
        <header className="header">
            <Logo name={"청룡인"} loc={"/"} className={"logo"} />
            <nav className="nav-menu">
                <Link to="/all-bulletin-boards">게시판</Link>
                <Link to="/Notice">공지사항</Link>
                <Link to="/">챗봇상담</Link>
                <Link to="/allNotice">정책 알림판</Link>
            </nav>
            <div className="user-menu">
                {isLoggedIn ? (
                    <>
                        <span className="user-nickname">{nickname}님</span>
                        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/Login">로그인</Link>
                        <Link to="/signUp">회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;