import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/apiService';

const RegisterPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Client-side validation
        if (password !== retypePassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true); // Start loading
        try {
            const data = await registerUser(firstname, lastname, username, password, retypePassword, isAdmin);
            console.log(data.message);

            // Reset fields
            setFirstname('');
            setLastname('');
            setUsername('');
            setPassword('');
            setRetypePassword('');
            setIsAdmin(false);

            // Redirect to login page
            navigate('/login');
        } catch (err) {
            setError(err.error || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>BOLD CAPITAL</h1>
            <h2>Scorecard Application</h2>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Retype Password</label>
                    <input
                        type="password"
                        placeholder="Retype Password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />{' '}
                        Admin User
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button
                    type="submit"
                    disabled={loading} // Disable during loading
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: loading ? '#ccc' : '#555',
                        color: 'white',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
