const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User model (mock data for now)
const users = [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@hospital.com',
        password: 'admin123', // Plain password for testing
        role: 'admin'
    },
    {
        id: 2,
        name: 'Bendahara',
        email: 'treasurer@hospital.com',
        password: 'admin123', // Plain password for testing
        role: 'treasurer'
    },
    {
        id: 3,
        name: 'Akuntan',
        email: 'accountant@hospital.com',
        password: 'admin123', // Plain password for testing
        role: 'accountant'
    }
];

// Login page
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Register page
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// Register handle
router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;
    
    // Simple validation
    if (!name || !email || !password || !role) {
        req.flash('error_msg', 'Mohon isi semua kolom');
        return res.redirect('/auth/register');
    }
    
    // Check if user exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        req.flash('error_msg', 'Email sudah terdaftar');
        return res.redirect('/auth/register');
    }
    
    // Create new user (using plain text password for testing)
    users.push({
        id: users.length + 1,
        name,
        email,
        password, // Store plain password for testing
        role
    });
    
    req.flash('success_msg', 'Anda berhasil terdaftar dan bisa login');
    res.redirect('/auth/login');
});

// Login handle
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Simple validation
    if (!email || !password) {
        req.flash('error_msg', 'Mohon isi semua kolom');
        return res.redirect('/auth/login');
    }
    
    // Check if user exists
    const user = users.find(user => user.email === email);
    
    if (!user) {
        req.flash('error_msg', 'Email tidak terdaftar');
        return res.redirect('/auth/login');
    }
    
    // Match password - using plain text comparison for testing
    if (password === user.password) {
        // Store user in session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        
        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/dashboard');
        } else if (user.role === 'treasurer') {
            res.redirect('/treasurer');
        } else if (user.role === 'accountant') {
            res.redirect('/accounting');
        } else {
            res.redirect('/');
        }
    } else {
        req.flash('error_msg', 'Password salah');
        res.redirect('/auth/login');
    }
});

// Logout handle
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/auth/login');
    });
});

module.exports = router; 