import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/TeacherAuth/login`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.token); // Store JWT token
            navigate('/teacherDashboard',{ state: { teacherName: response.data.name } });
        } catch (error) {
            console.error('Error logging in teacher:', error);
            alert('Error logging in teacher: ' + error.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Teacher Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default TeacherLogin;
