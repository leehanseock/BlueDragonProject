import React, { useState, useEffect } from 'react';
import './ABB.css';
import Header from "../MainResource/Header";
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

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

const AllBulletinBoards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadTotalPages = async () => {
            try {
                const data = await fetchPosts(1, itemsPerPage);
                setTotalPages(data.total_pages);
            } catch (err) {
                console.error('Error fetching total pages:', err);
            }
        };
        loadTotalPages();
    }, [itemsPerPage]);

    return (
        <div>
            <Header />
            <div className="ABB-container">
                <h2 className="ABB-title">전체게시판</h2>
                <PostList
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
                <Link to="/write" className="ABB-write-btn">글쓰기</Link>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default AllBulletinBoards;
