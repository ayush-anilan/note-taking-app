import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../Navbar';

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
            <Navbar />
            <div className='  relative container mx-auto flex flex-col gap-5 py-40'>
                <div className='text-5xl font-medium text-center'>
                    <h2>Create Note</h2>
                </div>
                <div className=' flex flex-col items-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
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
                        <div>
                            <button type="submit" className='w-full  rounded-3xl p-2 bg-[#D1510A]  text-white font-semibold'>Save</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default CreateNote