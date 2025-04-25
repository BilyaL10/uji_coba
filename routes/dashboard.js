const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Halaman dashboard utama (hanya bisa diakses oleh admin)
router.get('/', isAuthenticated, isAdmin, (req, res) => {
    // Data sampel untuk dashboard
    const dashboardData = {
        financialSummary: {
            totalRevenue: 1250000,
            totalExpenses: 850000,
            netProfit: 400000,
            pendingPayments: 125000
        },
        recentTransactions: [
            { id: 1, date: '2023-04-20', description: 'Pembayaran Pasien', amount: 15000, type: 'income' },
            { id: 2, date: '2023-04-19', description: 'Persediaan Medis', amount: 25000, type: 'expense' },
            { id: 3, date: '2023-04-18', description: 'Klaim Asuransi', amount: 35000, type: 'income' },
            { id: 4, date: '2023-04-17', description: 'Gaji Karyawan', amount: 75000, type: 'expense' },
            { id: 5, date: '2023-04-16', description: 'Pemeliharaan Peralatan', amount: 12000, type: 'expense' }
        ],
        accountingHighlights: {
            assetsTotal: 3500000,
            liabilitiesTotal: 1200000,
            equityTotal: 2300000,
            currentRatio: 2.5
        },
        treasuryHighlights: {
            cashOnHand: 350000,
            accountsReceivable: 450000,
            accountsPayable: 275000,
            cashFlowStatus: 'Positif'
        }
    };
    
    res.render('dashboard/index', { 
        title: 'Dashboard Utama',
        user: req.session.user,
        data: dashboardData
    });
});

// Halaman laporan keuangan
router.get('/reports', isAuthenticated, isAdmin, (req, res) => {
    res.render('dashboard/reports', { 
        title: 'Laporan Keuangan',
        user: req.session.user
    });
});

// Halaman manajemen pengguna
router.get('/users', isAuthenticated, isAdmin, (req, res) => {
    // Data pengguna contoh
    const users = [
        { id: 1, name: 'Admin', email: 'admin@hospital.com', role: 'admin' },
        { id: 2, name: 'Bendahara', email: 'treasurer@hospital.com', role: 'treasurer' },
        { id: 3, name: 'Akuntan', email: 'accountant@hospital.com', role: 'accountant' }
    ];
    
    res.render('dashboard/users', { 
        title: 'Manajemen Pengguna',
        user: req.session.user,
        users
    });
});

// Halaman pengaturan
router.get('/settings', isAuthenticated, isAdmin, (req, res) => {
    res.render('dashboard/settings', { 
        title: 'Pengaturan Sistem',
        user: req.session.user
    });
});

module.exports = router; 