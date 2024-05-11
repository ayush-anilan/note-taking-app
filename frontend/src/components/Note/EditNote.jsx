import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../Navbar';

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const response = await api.get(`/notes/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
            const urlParams = new URLSearchParams(window.location.search);
            const currentPage = parseInt(urlParams.get('page')) || 1;
            setPage(currentPage);
            console.log(response.data);
            console.log(currentPage);
        };
        fetchNote();
    }, [id]);




    const handleUpdate = async () => {
        try {
            await api.put(`/notes/${id}`, { title, content });
            navigate(`/notes?page=${page}`)

        } catch (err) {
            setError(err.response.data.error)
        }
    };


    return (
        <div>
            <Navbar />
            <div className='  relative container mx-auto flex flex-col gap-5 py-40'>
                <div className='text-5xl font-medium text-center'>
                    <h2>Edit Note</h2>
                </div>
                <div className=' flex flex-col items-center'>
                    <form className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="title" className='font-semibold'>Title</label>
                            <input
                                className='border w-72 rounded-lg p-2 border-black hover:border-[#D1510A] outline-[#D1510A]'
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div className='flex flex-col'>
                            <label htmlFor="content" className='font-semibold'>Content</label>
                            <textarea
                                className='border w-72 rounded-lg p-2 border-black hover:border-[#D1510A] outline-[#D1510A]'
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <br />
                        <div>
                            <button type="button" onClick={handleUpdate} className='w-full  rounded-3xl p-2 bg-[#D1510A]  text-white font-semibold'>Update</button>
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>

        </div>
    );
}

export default EditNote