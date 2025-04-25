// Authentication middleware

// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.flash('error_msg', 'Silakan login untuk melihat halaman ini');
    res.redirect('/auth/login');
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error_msg', 'Akses ditolak. Hanya admin yang dapat mengakses halaman ini');
    res.redirect('/');
};

// Check if user is treasurer
exports.isTreasurer = (req, res, next) => {
    if (req.session.user && (req.session.user.role === 'treasurer' || req.session.user.role === 'admin')) {
        return next();
    }
    req.flash('error_msg', 'Akses ditolak. Hanya bendahara yang dapat mengakses halaman ini');
    res.redirect('/');
};

// Check if user is accountant
exports.isAccountant = (req, res, next) => {
    if (req.session.user && (req.session.user.role === 'accountant' || req.session.user.role === 'admin')) {
        return next();
    }
    req.flash('error_msg', 'Akses ditolak. Hanya akuntan yang dapat mengakses halaman ini');
    res.redirect('/');
}; 