import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 로드
import './writing.css';

const WritingPage = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [alertShown, setAlertShown] = useState(false); // alert 표시 여부 상태 추가

    const handleContentChange = (value) => {
        // <img> 태그를 포함한 내용을 제거
        const filteredValue = value.replace(/<img[^>]*>/g, '');

        // 이미지가 포함되어 있는지 확인
        if (value !== filteredValue && !alertShown) {
            alert("이미지 삽입은 불가능합니다.");
            setAlertShown(true); // alert 표시 상태 변경
        } else if (value === filteredValue) {
            setAlertShown(false); // 이미지가 없으면 alert 상태 초기화
        }

        setContent(filteredValue); // 상태 업데이트
        console.log(filteredValue); // Quill의 내용
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        console.log(event.target.value); // 입력한 제목
    };

    return (
        <React.Fragment>
            <div className="writing-container">
                <div className="writing-write-form">
                    <select className="writing-dropdown">
                        <option value="자유게시판">자유게시판</option>
                        <option value="질문과답변">질문과답변</option>
                        <option value="갤러리">갤러리</option>
                        <option value="정보공유">정보공유</option>
                        <option value="동영상">동영상</option>
                    </select>

                    <input
                        type="text"
                        placeholder="제목을 입력해 주세요."
                        value={title} // 상태를 value로 연결
                        onChange={handleTitleChange} // 제목 변경 핸들러 연결
                    />
                    <p>※ 음란물, 차별, 비하, 명예훼손 등 저작권 침해 게시물은 민 형사상의 책임을 질 수 있습니다.</p>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContentChange} // Quill 변경 핸들러
                    />

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
