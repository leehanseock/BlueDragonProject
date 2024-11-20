import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts(currentPage, 10);
                setPosts(data.posts);
                setTotalPages(data.total_pages);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
        loadPosts();
    }, [currentPage]);

    return (
        <div>
            <h1>Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.post_id}>
                            <Link to={`/posts/${post.post_id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </button>
                <span>
          Page {currentPage} of {totalPages}
        </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostList;
