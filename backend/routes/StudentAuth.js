const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const router = express.Router();

// Student Registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if student already exists
        let student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({ msg: 'Student already exists' });
        }

        // Create new student
        student = new Student({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);

        // Save student in DB
        await student.save();

        // Generate JWT token
        const payload = { student: { id: student.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Student Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if student exists
        let student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ msg: 'Student not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        // Generate JWT token
        const payload = { student: { id: student.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            const name = student.name;
            res.json({ token, name });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
