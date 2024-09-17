const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const teacherAuthRoutes = require('./routes/TeacherAuth');
const studentAuthRoutes = require('./routes/StudentAuth');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Routes for teacher authentication (register and login)
app.use('/api/TeacherAuth', teacherAuthRoutes);

// Routes for student authentication (register and login)
app.use('/api/StudentAuth', studentAuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
