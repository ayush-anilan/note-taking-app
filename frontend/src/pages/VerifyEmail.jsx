import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState('Verification process ongoing');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await api.get(`/verify/${token}`);
                setTimeout(() => {
                    setMessage('Email verified successfully redirecting to login page in 5 seconds');
                    setTimeout(() => {
                        navigate("/login")
                    }, 5000)
                }, 3000);
            } catch (err) {
                setMessage('Verification process ongoing');
            }
        };
        verifyEmail();
    }, [token, navigate]);

    return (
        <div>
            <Navbar />
            <div className='  relative container mx-auto flex flex-col gap-5'>
                <div className='text-5xl font-medium text-center'>
                    <h2>Email Verification</h2>
                </div>
                <div className='text-center font-medium'>
                    <p>{message}</p>
                </div>

            </div>

        </div>
    );
}

export default VerifyEmail;
