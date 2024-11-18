import React, { useState } from 'react';
import './ABB.css';
import Header from "../MainResource/Header"; // 필요한 CSS를 별도 파일로 관리하거나 스타일을 inline으로 작성할 수 있습니다.

const NoticeRow = ({ number, title, author, date, views }) => {
    return (
        <tr className="notice-row">
            <td>{number}</td>
            <td><a href="#">{title}</a></td>
            <td>{author}</td>
            <td>{date}</td>
            <td>{views}</td>
        </tr>
    );
};

const PostList = ({ currentPage, itemsPerPage }) => {
    const allPosts = [
        { number: '공지', title: '2024년 하반기 운영 계획 안내', author: '운영자', date: '2024-11-05', views: '462' },
        { number: '공지', title: '커뮤니티 이용 수칙 변경 안내', author: '운영자', date: '2024-10-25', views: '345' },
        { number: '공지', title: '청룡인 커뮤니티 서버 점검 안내 (11/10)', author: '운영자', date: '2024-10-15', views: '298' },
        { number: '813', title: '오늘 날씨가 정말 좋네요!', author: '행복한회원', date: '2024-11-05', views: '343' },
        { number: '812', title: '새로운 취미를 시작했어요!', author: '열심회원', date: '2024-11-05', views: '24' },
        // 추가적인 게시물 항목을 여기에 작성
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = allPosts.slice(startIndex, endIndex);

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
                <NoticeRow
                    key={index}
                    number={post.number}
                    title={post.title}
                    author={post.author}
                    date={post.date}
                    views={post.views}
                />
            ))}
            </tbody>
        </table>
    );
};

const Pagination = ({ totalPosts, itemsPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalPosts / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <a href="#" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>&laquo; 이전</a>
            {pageNumbers.map((number) => (
                <a
                    href="#"
                    key={number}
                    className={number === currentPage ? 'active' : ''}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </a>
            ))}
            <a href="#" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>다음 &raquo;</a>
        </div>
    );
};

const AllBulletinBoards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPosts = 15; // 예시로 총 게시물 수를 15개로 설정

    return (
        <div>
            <Header />
            <div className="container">
                <h2>전체게시판</h2>
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
};

export default AllBulletinBoards;
