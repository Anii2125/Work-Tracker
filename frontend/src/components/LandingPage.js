import React from 'react';
import { Link } from 'react-router-dom';
import MyNavbar from './navbar/navbar';

const LandingPage = () => {
    return (
        <div>
            {/* <MyNavbar/> */}
            <h1>Welcome to Work Tracker</h1>
            <div>
                <h2>Login or Register</h2>
                <div>
                    <h3>As a Teacher</h3>
                    <Link to="/teacherLogin">Login</Link> | <Link to="/teacherRegister">Register</Link>
                </div>
                <div>
                    <h3>As a Student</h3>
                    <Link to="/studentLogin">Login</Link> | <Link to="/studentRegister">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
