import React from "react";
import "./signUp.css";

const SignUp = () => {
    return (
        <div className="signup-container">
            {/* 회원가입 제목 */}
            <h2>
                <img
                    src="https://img.icons8.com/ios/50/000000/add-user-male.png"
                    alt="signup-icon"
                    width="20"
                />
                회원 가입
            </h2>

            {/* 기본 정보 섹션 */}
            <div className="section-title">기본정보</div>

            {/* 아이디 입력 */}
            <div className="form-group">
                <label htmlFor="userid">아이디</label>
                <input
                    type="text"
                    id="userid"
                    placeholder="사용자 ID는 영문+숫자로 이루어져야 합니다."
                />
                <p className="description">아이디가 중복될 경우 사용이 중지됩니다.</p>
            </div>

            {/* 비밀번호 입력 */}
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호는 8~60자로 입력하세요."
                />
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="form-group">
                <label htmlFor="password-confirm">비밀번호 확인</label>
                <input
                    type="password"
                    id="password-confirm"
                    placeholder="비밀번호를 다시 입력하세요."
                />
            </div>

            {/* 닉네임 입력 */}
            <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    placeholder="닉네임은 2~8자 이내여야 합니다."
                />
            </div>

            {/* 이메일 주소 입력 */}
            <div className="form-group">
                <label htmlFor="email">이메일 주소</label>
                <input type="email" id="email" placeholder="이메일 주소를 입력하세요." />
                <p className="description">메일 주소만 가입 가능합니다.</p>
            </div>

            {/* 이메일 주소 확인 */}
            <div className="form-group">
                <label htmlFor="email-confirm">이메일 주소 확인</label>
                <input
                    type="email"
                    id="email-confirm"
                    placeholder="이메일 주소를 다시 입력하세요."
                />
            </div>

            {/* 메일링 가입 체크박스 */}
            <div className="checkbox-group">
                <input type="checkbox" id="mailing-agree" />
                <label htmlFor="mailing-agree">메일링 가입</label>
            </div>

            {/* 버튼 그룹 */}
            <div className="button-group">
                <button type="submit">등록</button>
                <button type="button" className="cancel">
                    취소
                </button>
            </div>
        </div>
    );
};

export default SignUp;

