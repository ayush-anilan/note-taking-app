import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to Note Taking App</h2>
            <p>
                <Link to="/login">Login</Link> or <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

export default Home