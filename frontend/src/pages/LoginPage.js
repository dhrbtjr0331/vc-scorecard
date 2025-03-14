import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import '../styles/LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        setError(''); // Clear previous errors
        setLoading(true); // Show loading state

        try {
            await loginUser(username, password); // Call the login function
            setIsAuthenticated(true); // Set authentication status
            navigate('/'); // Redirect to the home page
        } catch (err) {
            // Handle errors gracefully
            setError(err.response?.data?.error || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="login-page">
            {/* Left Side */}
            <div className="login-text">
                <h1>Welcome to BOLD</h1>
                <p>Connect with the business world and analyze company performance with ease.</p>
            </div>

            {/* Right Side */}
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                marginBottom: '10px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: loading ? '#ccc' : '#444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.3s ease, transform 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.01)')} // Smaller scale
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset on hover out
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
                {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
                <p style={{ marginTop: '20px' }}>
                    <a href="/register" style={{ color: 'green', textDecoration: 'none' }}>
                        Create New Account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
