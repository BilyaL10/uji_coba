// filepath: C:\Users\Ferry\Desktop\akutan\server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// Initialize Express app
const app = express();

// Port configuration
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up express-ejs-layouts
require('./config/express-layouts')(app);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'hospital-finance-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true in production with HTTPS
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
    res.render('index', { title: 'Hospital Finance Management System' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Error',
        message: 'Something went wrong!',
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