import React, { useState, useEffect } from 'react';
import './ABB.css';
import Header from "../MainResource/Header";
import api,{ fetchPosts } from '../api';
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

const PostList = ({ posts = [], loading }) => {  // 기본값 설정
    if (loading) {
        return <div className="ABB-loading">로딩 중...</div>;
    }

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
            {(!posts || posts.length === 0) ? (  // null 체크 추가
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
    const [searchQuery, setSearchQuery] = useState('');
    const [searchScope, setSearchScope] = useState('title');
    const itemsPerPage = 10;

    // PostList 컴포넌트로 전달할 검색 상태
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await api.get('/posts', {
                params: {
                    query: searchQuery,
                    scope: searchScope
                }
            });
console.log(response)
            if (response.data && response.data.posts) {  // 응답 구조 수정
                setPosts(response.data.posts);
                setTotalPages(response.data.total_pages || 1);
            } else {
                setPosts([]);
                setTotalPages(1);
            }
        } catch (err) {
            setError('검색 중 오류가 발생했습니다.');
            console.error('Search error:', err);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // 검색어 입력 핸들러
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 검색 범위 변경 핸들러
    const handleScopeChange = (e) => {
        setSearchScope(e.target.value);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    // 초기 데이터 로딩
    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const data = await fetchPosts(currentPage, itemsPerPage);
                setPosts(data.posts);
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                setError('게시글을 불러오는 중 오류가 발생했습니다.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        if (!searchQuery) {
            loadPosts();
        }
    }, [currentPage, itemsPerPage]);

    return (
        <div>
            <Header/>
            <div className="ABB-container">
                <h2 className="ABB-title">전체게시판</h2>


                {error && <div className="ABB-error">{error}</div>}

                <PostList
                    posts={posts}
                    loading={loading}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <Link to="/write" className="ABB-write-btn">글쓰기</Link>
                <div className="ABB-search">
                    <form onSubmit={handleSearchSubmit}>
                        <select
                            className="ABB-search-category"
                            value={searchScope}
                            onChange={handleScopeChange}
                        >
                            <option value="title_content">제목+내용</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="nickname">닉네임</option>
                        </select>
                        <input
                            type="text"
                            className="ABB-search-input"
                            placeholder="검색어를 입력하세요"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <button
                            type="submit"
                            className="ABB-search-button"
                            disabled={loading}
                        >
                            {loading ? '검색 중...' : '검색'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AllBulletinBoards;
