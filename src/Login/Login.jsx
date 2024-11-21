import React from 'react';
import "./Login.css"
import Header from "../MainResource/Header";
import Logo from "../MainResource/NgHook";

function LoginForm() {
    return (
        <div className={"body2"}>
            <h2><img src="https://img.icons8.com/ios/50/000000/login-rounded-right.png" alt="login-icon" width="20" />로그인</h2>

            {/* 아이디 입력 */}
            <div className="form-group">
                <label htmlFor="userid">아이디</label>
                <input type="text" id="userid" placeholder="아이디를 입력하세요" />
            </div>

            {/* 비밀번호 입력 */}
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
            </div>

            {/* 로그인 유지 체크박스 */}
            <div className="checkbox-group">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">브라우저를 닫더라도 로그인이 계속 유지될 수 있습니다.</label>
            </div>

            {/* 설명 텍스트 */}
            <p className="description">
                로그인 유지 기능을 사용할 경우 다음 접속부터는 로그인을 하실 필요가 없습니다. 단, PC방, 도서관 등 공용 PC에서는 꼭 로그아웃을 해주세요.
            </p>

            {/* 버튼 그룹 */}
            <div className="button-group">
                <button type="submit">로그인</button>
                <Logo name={"회원가입"} className={"button"} loc={"/signup"}/>
            </div>
        </div>
    );
}



function EasyLogin() {
    return (
        <div className="easy-login">
            <p>간편 로그인</p>
            <div className="social-icons">
                {/* 카카오톡 아이콘 */}
                <img src="https://img.icons8.com/color/48/000000/kakaotalk.png" alt="카카오톡 로그인" />

                {/* 네이버 아이콘 */}
                <img src="https://img.icons8.com/color/48/000000/naver.png" alt="네이버 로그인" />
            </div>
        </div>
    );
}


function Login() {
    return (
        <>
        <Header/>
        <div className="login-container">
            <LoginForm />
        </div>
        </>
    );
}

export default Login;