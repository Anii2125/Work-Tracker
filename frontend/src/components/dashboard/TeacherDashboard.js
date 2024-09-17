import React from 'react';
import { useLocation } from 'react-router-dom';

const TeacherDashboard = () => {
    const location = useLocation();
    const { teacherName } = location.state || { teacherName: 'Teacher' };

    return (
        <div>
            <h2>Hello , {teacherName}</h2>
            <p>Welcome to your dashboard.</p>
        </div>
    );
};

export default TeacherDashboard;
