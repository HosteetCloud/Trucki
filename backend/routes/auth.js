const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Super Admin Model
const SuperAdmin = require('../models/SuperAdmin');


// Super Admin Signup Route
router.post('/superadmin/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingSuperAdmin = await SuperAdmin.findOne({ email });
        if (existingSuperAdmin) {
        return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new super admin
        const superAdmin = new SuperAdmin({
        email,
        password: hashedPassword,
        });

        await superAdmin.save();

        res.status(201).json({ message: 'Super admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});


// Super Admin Login Route
router.post('/superadmin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists in the database
        const superAdmin = await SuperAdmin.findOne({ email });
        if (!superAdmin) {
            return res.status(404).json({ message: 'Super admin not found' });
        }

        // Check if the password matches
        const isPasswordCorrect = await bcrypt.compare(password, superAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
        { userId: superAdmin._id, role: 'superadmin' },
        'secret',
        { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;