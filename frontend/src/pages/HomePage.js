import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">What Brings You Here?</h1>
            <div className="home-box-container">
                <div className="home-box" onClick={() => navigate('/score-company')}>
                    Score a Company
                </div>
                <div className="home-box" onClick={() => navigate('/view-scored-companies')}>
                    View All Scored Companies
                </div>
                <div className="home-box" onClick={() => navigate('/view-analysis')}>
                    View Company-Specific Analyses
                </div>
            </div>
        </div>
    );
};

export default HomePage;
