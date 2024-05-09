import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const response = await api.get(`/notes/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
        };
        fetchNote();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await api.put(`/notes/${id}`, { title, content });
            navigate('/notes');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/notes/${id}`);
            navigate('/notes');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h2>Edit Note</h2>
            <form >
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
                <button type="button" onClick={handleUpdate}>Update</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    );
}

export default EditNote