const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const router = express.Router();

// Teacher Registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if teacher already exists
        let teacher = await Teacher.findOne({ email });
        if (teacher) {
            return res.status(400).json({ msg: 'Teacher already exists'});
        }

        // Create new teacher
        teacher = new Teacher({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(password, salt);

        // Save teacher in DB
        await teacher.save();

        // Generate JWT token
        const payload = { teacher: { id: teacher.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Teacher Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if teacher exists
        let teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ msg: 'Teacher not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        // Generate JWT token
        const payload = { teacher: { id: teacher.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            const name = teacher.name;
            res.json({ token,name });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
