import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            await api.post('/notes/create', { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/notes")
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Create Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default CreateNote