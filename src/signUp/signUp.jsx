import React, { useState } from "react";
import './signUp.css';
import Logo from "../MainResource/NgHook";
import Header from "../MainResource/Header";
import { register } from '../api';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        mailingAgree: false
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 유효성 검사
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (formData.email !== formData.emailConfirm) {
            alert('이메일이 일치하지 않습니다.');
            return;
        }
        try {
            // api.post 대신 register 함수 사용
            const response = await register({
                email: formData.email,
                password: formData.password,
                nickname: formData.nickname
            });

            alert('회원가입이 완료되었습니다.');
            window.location.href = '/login';
        } catch (error) {
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else {
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="signup-container">
                <h2>
                    <img src="https://img.icons8.com/ios/50/000000/add-user-male.png" alt="signup-icon" width="20"/>
                    회원 가입
                </h2>

                <div className="section-title">기본 정보</div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">이메일 주소</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일 주소를 입력하세요."
                            required
                        />y
                        <p className="description">메일 주소만 가입 가능합니다.</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="emailConfirm">이메일 주소 확인</label>
                        <input
                            type="email"
                            id="emailConfirm"
                            value={formData.emailConfirm}
                            onChange={handleChange}
                            placeholder="이메일 주소를 다시 입력하세요."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호는 8~60자로 입력하세요."
                            required
                            minLength={8}
                            maxLength={60}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirm">비밀번호 확인</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            placeholder="비밀번호를 다시 입력하세요."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            type="text"
                            id="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="닉네임은 2~8자 이내여야 합니다."
                            required
                            minLength={2}
                            maxLength={8}
                        />
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="mailingAgree"
                            checked={formData.mailingAgree}
                            onChange={handleChange}
                        />
                        <label htmlFor="mailingAgree">메일링 가입</label>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="signUp-button">등록</button>
                        <Logo name={"취소"} className={"signUp-btn cancel"} loc={"/"}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;