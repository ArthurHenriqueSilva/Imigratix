import React from 'react';
import Dashboard from '../components/Dashboard';
import AppSummary from '../components/AppSummary';
import logo from '../assets/logo.png';

const Home = () => {
    return(
        <div>
            <header>
                <img className="logo" src={logo} alt="Logo"></img>
            </header>
            <div className="content">
                <AppSummary />
                <div className="dashboard">
                    <Dashboard />
                </div>
            </div>
        </div>
    )
}

export default Home;