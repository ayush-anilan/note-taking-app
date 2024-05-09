import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await api.get(`/verify/${token}`);
                setMessage('Email verified successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (err) {
                setMessage('Invalid verification token');
            }
        };
        verifyEmail();
    }, [token, history]);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
}

export default VerifyEmail;
