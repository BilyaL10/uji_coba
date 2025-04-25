const express = require('express');
const router = express.Router();
const { isAuthenticated, isAccountant } = require('../middlewares/auth');

// Dashboard akuntansi
router.get('/', isAuthenticated, isAccountant, (req, res) => {
    // Data sampel untuk dashboard akuntansi
    const accountingData = {
        financialSummary: {
            assets: 3500000,
            liabilities: 1200000,
            equity: 2300000,
            revenue: 1250000,
            expenses: 850000
        },
        balanceSheetSummary: {
            currentAssets: 1200000,
            fixedAssets: 2300000,
            currentLiabilities: 500000,
            longTermLiabilities: 700000,
            equity: 2300000
        },
        incomeStatementSummary: {
            revenue: 1250000,
            costOfServices: 650000,
            grossProfit: 600000,
            operatingExpenses: 200000,
            netProfit: 400000
        },
        recentJournalEntries: [
            { id: 1, date: '2023-04-20', description: 'Pendapatan Pasien', debit: 'Piutang', credit: 'Pendapatan', amount: 150000 },
            { id: 2, date: '2023-04-19', description: 'Pembelian Persediaan Medis', debit: 'Persediaan Medis', credit: 'Hutang', amount: 75000 },
            { id: 3, date: '2023-04-18', description: 'Pembayaran Gaji', debit: 'Beban Gaji', credit: 'Kas', amount: 350000 },
            { id: 4, date: '2023-04-17', description: 'Pembelian Peralatan', debit: 'Peralatan Medis', credit: 'Kas', amount: 120000 },
            { id: 5, date: '2023-04-16', description: 'Pembayaran Utilitas', debit: 'Beban Utilitas', credit: 'Kas', amount: 25000 }
        ]
    };
    
    res.render('accounting/index', { 
        title: 'Dashboard Akuntansi',
        user: req.session.user,
        data: accountingData
    });
});

// Buku besar
router.get('/ledger', isAuthenticated, isAccountant, (req, res) => {
    // Data buku besar contoh
    const ledgerData = {
        accounts: [
            { id: 1, code: '1000', name: 'Kas', type: 'Aset', balance: 350000 },
            { id: 2, code: '1100', name: 'Piutang', type: 'Aset', balance: 450000 },
            { id: 3, code: '1200', name: 'Persediaan Medis', type: 'Aset', balance: 250000 },
            { id: 4, code: '1300', name: 'Peralatan', type: 'Aset', balance: 2450000 },
            { id: 5, code: '2000', name: 'Hutang', type: 'Kewajiban', balance: 275000 },
            { id: 6, code: '2100', name: 'Pinjaman', type: 'Kewajiban', balance: 925000 },
            { id: 7, code: '3000', name: 'Modal', type: 'Ekuitas', balance: 2300000 },
            { id: 8, code: '4000', name: 'Pendapatan Pasien', type: 'Pendapatan', balance: 1250000 },
            { id: 9, code: '5000', name: 'Beban Gaji', type: 'Beban', balance: 650000 },
            { id: 10, code: '5100', name: 'Beban Persediaan Medis', type: 'Beban', balance: 150000 },
            { id: 11, code: '5200', name: 'Beban Utilitas', type: 'Beban', balance: 50000 }
        ]
    };
    
    res.render('accounting/ledger', { 
        title: 'Buku Besar',
        user: req.session.user,
        data: ledgerData
    });
});

// Entri jurnal
router.get('/journal', isAuthenticated, isAccountant, (req, res) => {
    // Data jurnal contoh
    const journalData = {
        entries: [
            { id: 1, date: '2023-04-20', reference: 'JE001', description: 'Pendapatan Pasien', debit: 'Piutang', credit: 'Pendapatan', amount: 150000 },
            { id: 2, date: '2023-04-19', reference: 'JE002', description: 'Pembelian Persediaan Medis', debit: 'Persediaan Medis', credit: 'Hutang', amount: 75000 },
            { id: 3, date: '2023-04-18', reference: 'JE003', description: 'Pembayaran Gaji', debit: 'Beban Gaji', credit: 'Kas', amount: 350000 },
            { id: 4, date: '2023-04-17', reference: 'JE004', description: 'Pembelian Peralatan', debit: 'Peralatan Medis', credit: 'Kas', amount: 120000 },
            { id: 5, date: '2023-04-16', reference: 'JE005', description: 'Pembayaran Utilitas', debit: 'Beban Utilitas', credit: 'Kas', amount: 25000 },
            { id: 6, date: '2023-04-15', reference: 'JE006', description: 'Pembayaran Pinjaman', debit: 'Pinjaman', credit: 'Kas', amount: 50000 },
            { id: 7, date: '2023-04-14', reference: 'JE007', description: 'Pembayaran Asuransi', debit: 'Beban Asuransi', credit: 'Kas', amount: 30000 },
            { id: 8, date: '2023-04-13', reference: 'JE008', description: 'Pendapatan Pasien', debit: 'Piutang', credit: 'Pendapatan', amount: 120000 },
            { id: 9, date: '2023-04-12', reference: 'JE009', description: 'Pembelian Perlengkapan Lab', debit: 'Perlengkapan Lab', credit: 'Hutang', amount: 45000 },
            { id: 10, date: '2023-04-11', reference: 'JE010', description: 'Beban Pemeliharaan', debit: 'Beban Pemeliharaan', credit: 'Kas', amount: 15000 }
        ]
    };
    
    res.render('accounting/journal', { 
        title: 'Entri Jurnal',
        user: req.session.user,
        data: journalData
    });
});

// Laporan keuangan
router.get('/statements', isAuthenticated, isAccountant, (req, res) => {
    // Data laporan contoh
    const statementsData = {
        balanceSheet: {
            assets: {
                current: [
                    { name: 'Kas', amount: 350000 },
                    { name: 'Piutang', amount: 450000 },
                    { name: 'Persediaan Medis', amount: 250000 },
                    { name: 'Biaya Dibayar Dimuka', amount: 150000 }
                ],
                fixed: [
                    { name: 'Peralatan', amount: 1750000 },
                    { name: 'Gedung', amount: 400000 },
                    { name: 'Tanah', amount: 150000 }
                ]
            },
            liabilities: {
                current: [
                    { name: 'Hutang', amount: 275000 },
                    { name: 'Hutang Gaji', amount: 125000 },
                    { name: 'Pinjaman Jangka Pendek', amount: 100000 }
                ],
                longTerm: [
                    { name: 'Pinjaman Jangka Panjang', amount: 700000 }
                ]
            },
            equity: {
                items: [
                    { name: 'Modal', amount: 1900000 },
                    { name: 'Laba Ditahan', amount: 400000 }
                ]
            }
        },
        incomeStatement: {
            revenue: [
                { name: 'Layanan Pasien', amount: 950000 },
                { name: 'Layanan Laboratorium', amount: 200000 },
                { name: 'Penjualan Farmasi', amount: 100000 }
            ],
            expenses: [
                { name: 'Gaji dan Upah', amount: 650000 },
                { name: 'Persediaan Medis', amount: 150000 },
                { name: 'Utilitas', amount: 50000 }
            ]
        }
    };
    
    res.render('accounting/statements', { 
        title: 'Laporan Keuangan',
        user: req.session.user,
        data: statementsData
    });
});

// Laporan
router.get('/reports', isAuthenticated, isAccountant, (req, res) => {
    res.render('accounting/reports', { 
        title: 'Laporan Akuntansi',
        user: req.session.user
    });
});

module.exports = router; 