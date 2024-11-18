import React, {useState} from 'react';
import './Gallery.css';
import Header from "../MainResource/Header"; // Ensure to create and import the corresponding CSS file.


function PostRow({ thumbnail, number, title, author, date, views }) {
    return (
        <tr>
            <td><img src={thumbnail} alt="썸네일" className="thumbnail" /></td>
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
        { thumbnail: 'https://via.placeholder.com/80x60', number: 813, title: '오늘 날씨가 정말 좋네요!', author: '행복한회원', date: '2024-11-05', views: 343 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 812, title: '새로운 취미를 시작했어요!', author: '열심회원', date: '2024-11-05', views: 24 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 811, title: '가을 여행 계획을 세워보세요!', author: '여행자', date: '2024-10-30', views: 100 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 810, title: '가을 운동 추천!', author: '건강회원', date: '2024-10-28', views: 75 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 809, title: '오늘의 레시피 공유', author: '요리왕', date: '2024-10-20', views: 50 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 808, title: '운동 루틴 공유', author: '헬스마니아', date: '2024-10-15', views: 150 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 807, title: '내일 날씨 예보', author: '기상청', date: '2024-10-10', views: 220 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 806, title: '오늘의 음악 추천', author: '음악매니아', date: '2024-09-30', views: 300 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 805, title: '주말 여행 추천지', author: '여행자', date: '2024-09-28', views: 175 },
        { thumbnail: 'https://via.placeholder.com/80x60', number: 804, title: '맛집 소개', author: '맛집탐방', date: '2024-09-25', views: 130 },
        // Add more posts as needed
    ];//나중에 이 부분을 JSON으로 바꿔주면 된다.

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex); // Slice the posts based on the current page

    return (
        <table>
            <thead>
            <tr>
                <th>썸네일</th>
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
    const totalPages = Math.ceil(totalPosts / itemsPerPage); // Calculate the total number of pages
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1); // Generate an array of page numbers

    // Function to change the page number
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle "previous" and "next" navigation
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

function Gallery() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const totalPosts = 10; // Total number of posts, you can adjust as necessary

    return (
        <div>
            <Header />
            <div className="container">
                <h2>갤러리</h2>
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

export default Gallery;
