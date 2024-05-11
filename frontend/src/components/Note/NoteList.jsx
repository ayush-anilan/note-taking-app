import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../Navbar';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const userId = localStorage.getItem('userId');
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const fetchNotes = async (currentPageParam) => {
        const token = localStorage.getItem('token');
        const params = new URLSearchParams(location.search);
        const currentPage = parseInt(params.get('page')) || 1;
        const searchQuery = params.get('search') || '';
        const response = await api.get(`/notes?page=${currentPageParam}&pageSize=${pageSize}&userId=${userId}&search=${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setNotes(response.data.notes);
        setTotalPages(response.data.totalPages);
        setPage(currentPageParam)
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const currentPage = parseInt(params.get('page')) || 1;
        fetchNotes(currentPage);
    }, [location.search, pageSize, userId]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            alert("Note Deleted Successfully")
            const params = new URLSearchParams(location.search);
            const currentPage = parseInt(params.get('page')) || 1;
            fetchNotes(currentPage);
        } catch (err) {
            setError(err.response.data.error)
        }
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        navigate(`/notes?page=${nextPage}`);
        fetchNotes(nextPage);
    };

    const handlePreviousPage = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        navigate(`/notes?page=${prevPage}`);
        fetchNotes(prevPage);
    };

    return (
        <div>
            <Navbar />
            <div className='  relative container mx-auto flex flex-col  gap-5 py-5'>
                <div className='flex items-center justify-between'>
                    <div className='text-5xl font-medium '>
                        <h2>Notes</h2>
                    </div>
                    <div>
                        <Link to="/notes/create" className='w-full  rounded-3xl px-5 py-3 bg-[#D1510A]  text-white font-semibold'>Add Note</Link>
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {notes.length === 0 ? (
                    <div className=" text-gray-500  text-3xl flex justify-center items-center  h-96">No notes found.</div>
                ) : (
                    <ul className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:p-5 gap-5'>
                        {notes.map((note) => (
                            <li key={note.id} className=' border p-10 flex flex-col gap-5 rounded-lg border-[#D1510A]'>
                                <Link to={`/notes/edit/${note.id}?page=${page}`} className='font-semibold text-2xl'>{note.title}</Link>
                                <p className='h-20 overflow-ellipsis'>{note.content}</p>
                                <div className='flex gap-5'>
                                    <Link to={`/notes/edit/${note.id}?page=${page}`} className='w-full  rounded-3xl p-2 bg-green-600 text-center  text-white font-semibold'>Edit</Link>
                                    <button onClick={() => handleDelete(note.id)} className='w-full  rounded-3xl p-2 bg-red-600  text-white font-semibold'>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {totalPages > 1 && (
                    <div className='flex gap-5 justify-center'>
                        <button onClick={handlePreviousPage} disabled={page === 1} className=' rounded-3xl px-5 py-2 flex bg-gray-500 text-white gap-2 font-semibold text-lg items-center'><CircleChevronLeft />
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={page === totalPages} className=' rounded-3xl px-5 py-2 flex bg-green-500 text-white gap-2 font-semibold text-lg items-center'>Next<CircleChevronRight /></button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NoteList;
