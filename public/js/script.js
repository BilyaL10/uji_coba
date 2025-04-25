// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Initialize charts if they exist
    initializeCharts();
    
    // Add active class to current menu item
    setActiveMenuItem();
});

// Set active menu item based on current URL
function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.sidebar ul li a');
    
    menuItems.forEach(item => {
        if (currentPath === item.getAttribute('href')) {
            item.parentElement.classList.add('active');
        }
    });
}

// Initialize charts
function initializeCharts() {
    // Financial Summary Chart
    const financialSummaryChart = document.getElementById('financialSummaryChart');
    if (financialSummaryChart) {
        new Chart(financialSummaryChart, {
            type: 'bar',
            data: {
                labels: ['Revenue', 'Expenses', 'Net Profit'],
                datasets: [{
                    label: 'Financial Summary (Rp)',
                    data: [
                        financialSummaryChart.getAttribute('data-revenue') || 0,
                        financialSummaryChart.getAttribute('data-expenses') || 0,
                        financialSummaryChart.getAttribute('data-profit') || 0
                    ],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(23, 162, 184, 0.7)'
                    ],
                    borderColor: [
                        'rgba(40, 167, 69, 1)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(23, 162, 184, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rp ' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Rp ' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Cash Flow Chart
    const cashFlowChart = document.getElementById('cashFlowChart');
    if (cashFlowChart) {
        const months = JSON.parse(cashFlowChart.getAttribute('data-months') || '[]');
        const income = JSON.parse(cashFlowChart.getAttribute('data-income') || '[]');
        const expense = JSON.parse(cashFlowChart.getAttribute('data-expense') || '[]');
        const net = JSON.parse(cashFlowChart.getAttribute('data-net') || '[]');
        
        new Chart(cashFlowChart, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Income',
                        data: income,
                        borderColor: 'rgba(40, 167, 69, 1)',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Expense',
                        data: expense,
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Net',
                        data: net,
                        borderColor: 'rgba(23, 162, 184, 1)',
                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rp ' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': Rp ' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Balance Sheet Chart
    const balanceSheetChart = document.getElementById('balanceSheetChart');
    if (balanceSheetChart) {
        new Chart(balanceSheetChart, {
            type: 'pie',
            data: {
                labels: ['Current Assets', 'Fixed Assets', 'Current Liabilities', 'Long-term Liabilities', 'Equity'],
                datasets: [{
                    data: [
                        balanceSheetChart.getAttribute('data-current-assets') || 0,
                        balanceSheetChart.getAttribute('data-fixed-assets') || 0,
                        balanceSheetChart.getAttribute('data-current-liabilities') || 0,
                        balanceSheetChart.getAttribute('data-long-term-liabilities') || 0,
                        balanceSheetChart.getAttribute('data-equity') || 0
                    ],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.7)',
                        'rgba(23, 162, 184, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(111, 66, 193, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': Rp ' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
} 