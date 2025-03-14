import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../NavBar';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ScoreCompanyPage from '../../pages/ScoreCompanyPage';
import axios from '../../axiosConfig';
import ScoredCompanyListPage from '../../pages/ScoredCompanyList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check authentication status on mount
    useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/is_authenticated/');
            setIsAuthenticated(response.data.isAuthenticated);
            if (response.data.isAuthenticated) {
                localStorage.setItem('isAuthenticated', 'true');
            } else {
                localStorage.removeItem('isAuthenticated');
            }
        } catch (error) {
            console.error("Error fetching authentication status:", error);
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
        } finally {
            setLoading(false);
        }
    };

    // Check localStorage first
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
        setIsAuthenticated(true);
        setLoading(false);
    } else {
        checkAuthStatus();
    }
}, []);

    if (loading) {
        return <div>Loading...</div>; // Display a loading spinner or message while checking authentication
    }

    return (
        <Router>
            <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/score-company"
                    element={
                        isAuthenticated ? <ScoreCompanyPage /> : <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/view-scored-companies"
                    element={
                        isAuthenticated ? <ScoredCompanyListPage /> : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
