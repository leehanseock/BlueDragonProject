import React, { useState } from 'react';
import "./Login.css"
import Header from "../MainResource/Header";
import Logo from "../MainResource/NgHook";
import { login } from '../api';  // API 설정 파일 import

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', response.token);

            // 로그인 유지 체크시 이메일 저장
            if (rememberMe) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }

            // 로그인 성공 후 메인 페이지로 이동
            window.location.href = '/';
        } catch (error) {
            alert(error.response?.data?.error || '로그인에 실패했습니다.');
        }
    };


    return (
        <div className={"body2"}>
            <h2><img src="https://img.icons8.com/ios/50/000000/login-rounded-right.png" alt="login-icon" width="20" />로그인</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me">브라우저를 닫더라도 로그인이 계속 유지될 수 있습니다.</label>
                </div>

                <p className="description">
                    로그인 유지 기능을 사용할 경우 다음 접속부터는 로그인을 하실 필요가 없습니다. 단, PC방, 도서관 등 공용 PC에서는 꼭 로그아웃을 해주세요.
                </p>

                <div className="button-group">
                    <button type="submit">로그인</button>
                    <Logo name={"회원가입"} className={"button"} loc={"/signup"}/>
                </div>
            </form>
        </div>
    );
}

// EasyLogin 컴포넌트는 그대로 유지

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