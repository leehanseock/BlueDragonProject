import React, { useState } from 'react';
import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [memberId, setMemberId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = { title, content, member_id: memberId };
            await createPost(newPost);
            navigate('/');
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Post</h1>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Member ID</label>
                <input
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreatePost;
