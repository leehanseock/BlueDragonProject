import React, { useState } from 'react';
import '../Gallery/Gallery.css';
import Header from "../MainResource/Header";


function PostRow({ number, title, author, date, views }) {
    return (
        <tr>
            <td>{number}</td>
            <td><a href="#">{title}</a></td>
            <td>{author}</td>
            <td>{date}</td>
            <td>{views}</td>
        </tr>
    );
}

function PostList({ currentPage, itemsPerPage }) {
    const posts = [
        { number: '공지', title: '2024년 최신 IT 트렌드 공유', author: '운영자', date: '2024-11-05', views: 462 },
        { number: '813', title: 'JavaScript에서 이벤트 리스너를 어떻게 추가하나요?', author: '효율회원', date: '2024-11-05', views: 343 },
        { number: '812', title: 'CSS Flexbox로 레이아웃을 어떻게 중앙에 배치하나요?', author: '개발자회원', date: '2024-11-05', views: 24 },
        { number: '811', title: 'CSS Flexbox로 레이아웃을 어떻게 중앙에 배치하나요?', author: '마케팅회원', date: '2024-11-05', views: 30 },
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <table>
            <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>조회수</th>
            </tr>
            </thead>
            <tbody>
            {currentPosts.map((post, index) => (
                <PostRow key={index} {...post} />
            ))}
            </tbody>
        </table>
    );
}

const Pagination = ({ totalPosts, itemsPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalPosts / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <a href="#" onClick={handlePrevPage}>&laquo; 이전</a>
            {pageNumbers.map((number) => (
                <a
                    href="#"
                    key={number}
                    className={number === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </a>
            ))}
            <a href="#" onClick={handleNextPage}>다음 &raquo;</a>
        </div>
    );
};



function QnA() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const totalPosts = 10; // Total number of posts

    return (
        <div>
            <Header />
            <div className="container">
                <h2>자유게시판</h2>
                <PostList currentPage={currentPage} itemsPerPage={itemsPerPage} />
                <a href="writing.html" className="write-btn">글쓰기</a>
                <Pagination
                    totalPosts={totalPosts}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default QnA;