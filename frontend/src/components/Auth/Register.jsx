import React, { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../Navbar';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post('/register', { email, password });
            setMessage('Verification email has been sent. Please verify your email.');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response.data.error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Navbar />
            <div className='  relative container mx-auto flex flex-col gap-5 py-40'>
                <div className='text-5xl font-medium text-center'>
                    <h2>Register</h2>
                </div>
                <div className=' flex flex-col items-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input
                                className='border w-72 rounded-lg p-2 border-black hover:border-[#D1510A] outline-[#D1510A]'
                                type="email"
                                placeholder="Email"
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className='w-full  rounded-3xl p-2 bg-[#D1510A]  text-white font-semibold'>Register</button>
                        </div>
                    </form>
                    {loading && <p>Sending Verification Email...</p>}
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register