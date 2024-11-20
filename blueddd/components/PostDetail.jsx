import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../api';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchPostById(postId);
                setPost(data);
            } catch (err) {
                console.error('Error fetching post:', err);
            }
        };
        loadPost();
    }, [postId]);

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>
                <strong>Author:</strong> {post.author}
            </p>
            <p>
                <strong>Created At:</strong> {post.created_at}
            </p>
        </div>
    );
};

export default PostDetail;
