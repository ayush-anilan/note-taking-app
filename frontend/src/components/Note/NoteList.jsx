import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem('token');

            const response = await api.get(`/notes?page=${page}&pageSize=${pageSize}&userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotes(response.data.notes);
            console.log(response.data.notes);
        };
        fetchNotes();
    }, [page, pageSize, userId]);

    return (
        <div>
            <h2>Notes</h2>
            <Link to="/notes/create">Add Note</Link>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <Link to={`/notes/edit/${note.id}`}>{note.title}</Link>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page === 1}>Next</button>
        </div>
    );
}

export default NoteList;
