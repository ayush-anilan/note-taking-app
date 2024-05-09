import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

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
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
