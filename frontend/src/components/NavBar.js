import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAuthenticated'); // Ensure it's removed from storage
    
        // Force state update
        setIsAuthenticated(false);
    
        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/login'); 
        }, 100);  // Small delay ensures state updates
    };
    

    return isAuthenticated ? (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">BOLD</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/score-company">Score a Company</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-scored-companies">View Scored Companies</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/company-analyses">View Company-Specific Analyses</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <button
                        className="nav-link logout-button"
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#555',
                            transition: 'transform 0.2s ease', // Smooth transition
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.01)')} // Slightly expand
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset on hover out
                    >
                        Logout
                    </button>
                    </li>
                </ul>
            </div>
        </nav>
    ) : null;
};

export default NavBar;


