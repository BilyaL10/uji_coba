// filepath: C:\Users\Ferry\Desktop\akutan\server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

// Initialize Express app
const app = express();

// Port configuration
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Session configuration
app.use(session({
    secret: 'hospital-finance-secret',
    resave: true,
    saveUninitialized: true
}));

// Flash messages
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const accountingRoutes = require('./routes/accounting');
const treasurerRoutes = require('./routes/treasurer');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/accounting', accountingRoutes);
app.use('/treasurer', treasurerRoutes);

// Home route
app.get('/', (req, res) => {
    // Generate mock data for demonstration
    const data = {};
    res.render('index', { title: 'Beranda', data });
});

// API status endpoint
app.get('/api', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'Hospital Finance Management API',
        timestamp: new Date(),
        endpoints: [
            "/auth/login - Authentication",
            "/dashboard - Main Dashboard",
            "/treasurer - Treasury Management",
            "/accounting - Accounting System"
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Error',
        message: 'Terjadi kesalahan pada server',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 handling
app.use((req, res) => {
    res.status(404).render('error', { 
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});