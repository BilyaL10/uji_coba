const express = require('express');
const router = express.Router();
const { isAuthenticated, isTreasurer } = require('../middlewares/auth');

// Dashboard bendahara
router.get('/', isAuthenticated, isTreasurer, (req, res) => {
    // Data sampel untuk dashboard bendahara
    const treasurerData = {
        financialSummary: {
            cashOnHand: 350000,
            accountsReceivable: 450000,
            accountsPayable: 275000,
            totalRevenue: 1250000
        },
        recentTransactions: [
            { id: 1, date: '2023-04-20', patientName: 'John Doe', description: 'Konsultasi Rawat Jalan', amount: 15000, status: 'Dibayar' },
            { id: 2, date: '2023-04-19', patientName: 'Jane Smith', description: 'Tes Laboratorium', amount: 25000, status: 'Tertunda' },
            { id: 3, date: '2023-04-18', patientName: 'Robert Johnson', description: 'Operasi', amount: 150000, status: 'Dibayar Sebagian' },
            { id: 4, date: '2023-04-17', patientName: 'Maria Garcia', description: 'Ruang Gawat Darurat', amount: 35000, status: 'Dibayar' },
            { id: 5, date: '2023-04-16', patientName: 'James Wilson', description: 'Obat-obatan', amount: 12000, status: 'Tertunda' }
        ],
        pendingBills: [
            { id: 1, vendor: 'Medical Supplies Inc.', description: 'Persediaan Bulanan', amount: 45000, dueDate: '2023-05-01' },
            { id: 2, vendor: 'Pharma Distribution', description: 'Stok Obat', amount: 75000, dueDate: '2023-05-05' },
            { id: 3, vendor: 'Equipment Maintenance Co.', description: 'Pemeliharaan Kuartalan', amount: 35000, dueDate: '2023-05-10' }
        ],
        cashFlowSummary: {
            lastMonth: 320000,
            currentMonth: 400000,
            projection: 450000,
            trend: 'Meningkat'
        }
    };
    
    res.render('treasurer/index', { 
        title: 'Dashboard Bendahara',
        user: req.session.user,
        data: treasurerData
    });
});

// Kelola tagihan dan pembayaran
router.get('/bills', isAuthenticated, isTreasurer, (req, res) => {
    // Data tagihan contoh
    const billsData = {
        pending: [
            { id: 1, vendor: 'Medical Supplies Inc.', description: 'Persediaan Bulanan', amount: 45000, dueDate: '2023-05-01', status: 'Tertunda' },
            { id: 2, vendor: 'Pharma Distribution', description: 'Stok Obat', amount: 75000, dueDate: '2023-05-05', status: 'Tertunda' },
            { id: 3, vendor: 'Equipment Maintenance Co.', description: 'Pemeliharaan Kuartalan', amount: 35000, dueDate: '2023-05-10', status: 'Tertunda' }
        ],
        paid: [
            { id: 4, vendor: 'Cleaning Services Ltd.', description: 'Pembersihan Bulanan', amount: 15000, paidDate: '2023-04-15', status: 'Dibayar' },
            { id: 5, vendor: 'Utilities Inc.', description: 'Tagihan Listrik', amount: 25000, paidDate: '2023-04-10', status: 'Dibayar' },
            { id: 6, vendor: 'Internet Provider', description: 'Langganan Bulanan', amount: 5000, paidDate: '2023-04-05', status: 'Dibayar' }
        ]
    };
    
    res.render('treasurer/bills', { 
        title: 'Kelola Tagihan',
        user: req.session.user,
        data: billsData
    });
});

// Pembayaran pasien
router.get('/payments', isAuthenticated, isTreasurer, (req, res) => {
    // Data pembayaran contoh
    const paymentsData = {
        recent: [
            { id: 1, patientId: 'P001', patientName: 'John Doe', date: '2023-04-20', amount: 15000, method: 'Tunai', description: 'Konsultasi Rawat Jalan' },
            { id: 2, patientId: 'P002', patientName: 'Maria Garcia', date: '2023-04-17', amount: 35000, method: 'Kartu Kredit', description: 'Ruang Gawat Darurat' },
            { id: 3, patientId: 'P003', patientName: 'James Wilson', date: '2023-04-15', amount: 8000, method: 'Transfer Bank', description: 'Obat-obatan (Sebagian)' }
        ],
        pending: [
            { id: 4, patientId: 'P004', patientName: 'Jane Smith', date: '2023-04-19', amount: 25000, description: 'Tes Laboratorium' },
            { id: 5, patientId: 'P003', patientName: 'James Wilson', date: '2023-04-16', amount: 4000, description: 'Obat-obatan (Sisa)' },
            { id: 6, patientId: 'P005', patientName: 'Robert Johnson', date: '2023-04-18', amount: 100000, description: 'Operasi (Sisa)' }
        ]
    };
    
    res.render('treasurer/payments', { 
        title: 'Pembayaran Pasien',
        user: req.session.user,
        data: paymentsData
    });
});

// Manajemen arus kas
router.get('/cash-flow', isAuthenticated, isTreasurer, (req, res) => {
    // Data arus kas contoh
    const cashFlowData = {
        monthly: [
            { month: 'Januari', income: 1100000, expense: 850000, net: 250000 },
            { month: 'Februari', income: 1150000, expense: 870000, net: 280000 },
            { month: 'Maret', income: 1200000, expense: 880000, net: 320000 },
            { month: 'April', income: 1250000, expense: 850000, net: 400000 }
        ],
        forecast: [
            { month: 'Mei', income: 1300000, expense: 850000, net: 450000 },
            { month: 'Juni', income: 1350000, expense: 870000, net: 480000 }
        ],
        cashOnHand: 350000,
        pendingIncome: 450000,
        pendingExpenses: 275000
    };
    
    res.render('treasurer/cash-flow', { 
        title: 'Manajemen Arus Kas',
        user: req.session.user,
        data: cashFlowData
    });
});

// Membuat laporan
router.get('/reports', isAuthenticated, isTreasurer, (req, res) => {
    res.render('treasurer/reports', { 
        title: 'Laporan Bendahara',
        user: req.session.user
    });
});

module.exports = router; 