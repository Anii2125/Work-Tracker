import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/StudentAuth/login`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.token); // Store JWT token
            navigate('/studentDashboard', { state: { studentName: response.data.name } });
        } catch (error) {
            console.error('Error logging in student:', error);
            alert('Error logging in student: ' + error.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Student Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default StudentLogin;
