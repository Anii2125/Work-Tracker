import React from 'react';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
    const location = useLocation();
    const { studentName } = location.state || { studentName: 'Student' };

    return (
        <div>
            <h2>Hello , {studentName}</h2>
            <p>Welcome to your dashboard.</p>
        </div>
    );
};

export default StudentDashboard;
