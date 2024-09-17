import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();   // Prevent the default form submission

        try {
            // Send POST request to backend
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/StudentAuth/register`, {
                name,
                email,
                password
            });

            // On successful registration, navigate to student dashboard
            if (response.status === 200) {
                navigate('/studentDashboard', { state: { studentName: name } });
            }
        } catch (error) {
            console.error('Error registering student:', error);
        }
    };

    return (
        <div>
            <h2>Student Registration</h2>
            <form onSubmit={handleRegister}>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default StudentRegister;
