import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TeacherLogin from './components/login/TeacherLogin';
import StudentLogin from './components/login/StudentLogin';
import TeacherRegister from './components/register/TeacherRegister';
import StudentRegister from './components/register/StudentRegister';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';

// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/teacherLogin" element={<TeacherLogin />} />
                    <Route path="/studentLogin" element={<StudentLogin />} />
                    <Route path="/teacherRegister" element={<TeacherRegister />} />
                    <Route path="/studentRegister" element={<StudentRegister />} />
                    <Route path="/teacherDashboard" element={<TeacherDashboard />} />
                    <Route path="/studentDashboard" element={<StudentDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
