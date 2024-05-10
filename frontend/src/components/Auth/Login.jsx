import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            navigate('/notes');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };
    return (
        <div>
            <Navbar />
            <div className='  relative container mx-auto flex flex-col gap-5 py-40'>
                <div className='text-5xl font-medium text-center'>
                    <h2>Login</h2>
                </div>
                <div className=' flex flex-col items-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input
                                className='border w-72 rounded-lg p-2 border-black hover:border-[#D1510A] outline-[#D1510A]'
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required

                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <input
                                className='border w-72 rounded-lg p-2 border-black hover:border-[#D1510A] outline-[#D1510A]'
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className='w-full  rounded-3xl p-2 bg-[#D1510A]  text-white font-semibold'>Login</button>
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;
