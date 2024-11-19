import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 로드
import './writing.css'; // 별도로 분리된 CSS 파일

const WritingPage = () => {
    const [content, setContent] = useState('');

    return (
        <React.Fragment>
            {/* 상단 헤더 */}
            <header className="header">
                <div className="logo" onClick={() => (window.location.href = 'ysProject.html')}>
                    청룡인
                </div>
                <nav className="nav-menu">
                    <a href="AllBulletinBoards.html">게시판</a>
                    <a href="notice.html">공지사항</a>
                    <a href="#blog">챗봇상담</a>
                    <a href="#mail">정신건강 사업정보</a>
                </nav>
                <div className="user-menu">
                    <a href="login.html">로그인</a>
                    <a href="../signUp/signUp.jsx">회원가입</a>
                </div>
            </header>

            {/* 메인 컨테이너 */}
            <div className="container">
                {/* 글쓰기 폼 */}
                <div className="write-form">
                    {/* 게시판 선택 드롭다운 */}
                    <select className="dropdown">
                        <option value="자유게시판">자유게시판</option>
                        <option value="질문과답변">질문과답변</option>
                        <option value="갤러리">갤러리</option>
                        <option value="정보공유">정보공유</option>
                        <option value="동영상">동영상</option>
                    </select>

                    {/* 제목 입력 */}
                    <input type="text" placeholder="제목을 입력해 주세요." />

                    {/* 경고 문구 */}
                    <p>※ 음란물, 차별, 비하, 명예훼손 등 저작권 침해 게시물은 민 형사상의 책임을 질 수 있습니다.</p>

                    {/* Quill 에디터 */}
                    <ReactQuill theme="snow" value={content} onChange={setContent} />

                    {/* 버튼 그룹 */}
                    <div className="button-group">
                        <button type="button" className="cancel">
                            취소
                        </button>
                        <button type="submit" className="submit">
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default WritingPage;
