const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

// Import routes
const dashboardRoutes = require('../routes/dashboard');
const treasurerRoutes = require('../routes/treasurer');
const accountingRoutes = require('../routes/accounting');
const authRoutes = require('../routes/auth');

// Create Express app
const app = express();

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Session
app.use(session({
    secret: 'hospital-finance-secret',
    resave: true,
    saveUninitialized: true
}));

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/treasurer', treasurerRoutes);
app.use('/accounting', accountingRoutes);

// Index route
app.get('/', (req, res) => {
    // Generate mock data for demonstration
    const data = {};
    res.render('index', { title: 'Beranda', data });
});

// Export the Express app wrapped with serverless
module.exports.handler = serverless(app); 