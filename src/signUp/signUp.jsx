import React, { useState } from "react";
import './signUp.css';
import Logo from "../MainResource/NgHook";
import Header from "../MainResource/Header";

function SignUp() {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        email: '',
        emailConfirm: '',
        mailingAgree: false
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = (event) => {
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

        alert(`
            아이디: ${formData.userid}
            닉네임: ${formData.nickname}
            이메일: ${formData.email}
            메일링 동의: ${formData.mailingAgree}
        `);
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
                    <label htmlFor="userid">아이디</label>
                    <input
                        type="text"
                        id="userid"
                        value={formData.userid}
                        onChange={handleChange}
                        placeholder="사용자 ID는 영문+숫자로 이루어져야 합니다."
                    />
                    <p className="description">아이디가 중복될 경우 사용이 중지됩니다.</p>
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호는 8~60자로 입력하세요."
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
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">이메일 주소</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일 주소를 입력하세요."
                    />
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