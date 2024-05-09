import React, { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import api from '../../services/api';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', { email, password });
            setMessage('Verification email has been sent. Please verify your email.');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response.data.error);
        }
    };
    return (
        <div>
            <h2>Register</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
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
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Register