import React, {useEffect, useState} from 'react';
import '../can/Gallery/Gallery.css';
import Header from "../MainResource/Header";
import {fetchPosts} from "../api";
import {Link} from "react-router-dom";


/*function PostRow({ number, title, author, date, views }) {
    return (
        <tr>
            <td>{number}</td>
            <td><a href="#">{title}</a></td>
            <td>{author}</td>
            <td>{date}</td>
            <td>{views}</td>
        </tr>
    );
}*/

const NoticeRow = ({ number, title, author, date, views }) => {
    return (
        <tr className="ABB-notice-row">
            <td>{number}</td>
            <td><Link to={`/posts/${number}`}>{title}</Link></td>
            <td>{author}</td>
            <td>{date}</td>
            <td>{views}</td>
        </tr>
    );
};

const PostList = ({ currentPage, itemsPerPage }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data.posts);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
        loadPosts();
    }, [currentPage, itemsPerPage]);

    return (
        <table className="ABB-post-table">
            <thead>
            <tr className="ABB-post-header">
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>조회수</th>
            </tr>
            </thead>
            <tbody>
            {posts.length === 0 ? (
                <tr className="ABB-no-posts">
                    <td colSpan="5">게시물이 없습니다.</td>
                </tr>
            ) : (
                posts.map((post) => (
                    <NoticeRow
                        key={post.post_id}
                        number={post.post_id}
                        title={post.title}
                        author={post.author}
                        date={post.created_at}
                        views={post.views}
                    />
                ))
            )}
            </tbody>
        </table>
    );
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="ABB-pagination">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#"
               onClick={(e) => {
                   e.preventDefault();
                   if (currentPage > 1) setCurrentPage(currentPage - 1);
               }}
            >
                &laquo; 이전
            </a>
            {pageNumbers.map((number) => (
                <a
                    href="#"
                    key={number}
                    className={number === currentPage ? 'ABB-active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(number);
                    }}
                >
                    {number}
                </a>
            ))}
            <a href="#"
               onClick={(e) => {
                   e.preventDefault();
                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
               }}
            >
                다음 &raquo;
            </a>
        </div>
    );
};

/*

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

*/


function info() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage,totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    return (
        <div>
            <Header />
            <div className="container">
                <h2>정보공유</h2>
                <PostList currentPage={currentPage} itemsPerPage={itemsPerPage} />
                <a href="writing.html" className="write-btn">글쓰기</a>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default info;