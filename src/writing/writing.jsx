import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 snow 테마 CSS를 로드
import './writing.css';
import Header from "../MainResource/Header";

const WritingPage = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const quillRef = useRef(null); // Quill 인스턴스를 위한 ref
    let alertShown = false; // alert 표시 여부를 관리하는 플래그 변수


    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor(); // Quill 인스턴스 가져오기
            const Delta = ReactQuill.Quill.import('delta'); // Delta 가져오기

            // img 태그 삽입 방지
            quill.clipboard.addMatcher('img', () => {
                if (!alertShown) {
                    alert("이미지 삽입은 허용되지 않습니다."); // 경고 메시지
                    alertShown = true; // alert 표시 상태 변경
                    setTimeout(() => {
                        alertShown = false; // 플래그 초기화
                    }, 500); // 플래그 초기화 딜레이 설정 (0.5초)
                }
                return new Delta(); // 빈 Delta 객체 반환
            });

            // HTML 삽입 시 이미지 포함 여부 검사
            quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
                if (node.tagName === 'IMG') {
                    if (!alertShown) {
                        alert("이미지 삽입은 허용되지 않습니다."); // 경고 메시지
                        alertShown = true; // alert 표시 상태 변경
                        setTimeout(() => {
                            alertShown = false; // 플래그 초기화
                        }, 500); // 플래그 초기화 딜레이 설정 (0.5초)
                    }
                    return new Delta(); // 빈 Delta 객체 반환
                }
                return delta; // 다른 경우는 기본 동작 허용
            });
        }
    }, []);

    const handleContentChange = (value) => {
        setContent(value); // 입력된 내용 상태 업데이트
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = () => {
        // <img> 태그가 포함되어 있는지 확인
        if (content.includes('<img')) {
            alert("이미지 삽입은 불가능합니다.");
            return; // 이미지가 포함된 경우 제출 차단
        }

        console.log("제출됨:", { title, content });
        // 추가적인 제출 로직 구현 (예: API 호출 등)
    };

    return (
        <div><Header/>
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
                        value={title}
                        onChange={handleTitleChange} // 제목 변경 핸들러 연결
                    />
                    <p>※ 음란물, 차별, 비하, 명예훼손 등 저작권 침해 게시물은 민 형사상의 책임을 질 수 있습니다.</p>
                    <ReactQuill
                        ref={quillRef} // Quill 인스턴스를 위한 ref
                        theme="snow"
                        value={content}
                        onChange={handleContentChange} // Quill 변경 핸들러
                    />

                    <div className="writing-button-group">
                        <button type="button" className="writing-cancel">
                            취소
                        </button>
                        <button type="button" className="writing-submit" onClick={handleSubmit}>
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
        </div>
    );
};

export default WritingPage;
