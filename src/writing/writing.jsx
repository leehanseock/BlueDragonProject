import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 로드
import './writing.css';
import Header from "../MainResource/Header"; // 별도로 분리된 CSS 파일

const WritingPage = () => {
    const [content, setContent] = useState('');

    return (
        <React.Fragment>
            <Header/>
            <div className="writing-container">
                <div className="writing-write-form">
                    <select className="writing-dropdown">
                        <option value="자유게시판">자유게시판</option>
                        <option value="질문과답변">질문과답변</option>
                        <option value="갤러리">갤러리</option>
                        <option value="정보공유">정보공유</option>
                        <option value="동영상">동영상</option>
                    </select>

                    <input type="text" placeholder="제목을 입력해 주세요." />
                    <p>※ 음란물, 차별, 비하, 명예훼손 등 저작권 침해 게시물은 민 형사상의 책임을 질 수 있습니다.</p>
                    <ReactQuill theme="snow" value={content} onChange={setContent} />

                    <div className="writing-button-group">
                        <button type="button" className="writing-cancel">
                            취소
                        </button>
                        <button type="submit" className="writing-submit">
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default WritingPage;
