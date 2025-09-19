// Alumni Dashboard JavaScript

// Data from the provided JSON
const dashboardData = {
  summary_stats: {
    total_alumni: 2235,
    total_batches: 15,
    batch_range: "Batch 1 to 16",
    active_professionals: 1263,
    mentoring_willing: 1763,
    placement_supporters: 1792
  },
  big_bet_distribution: {
    "ABC": 350,
    "THC": 207,
    "DBC": 191,
    "ADC": 144,
    "ADC - Education": 142,
    "PLDP": 137,
    "DTP": 121,
    "PSL - SoE": 100,
    "PSL": 99,
    "SOESC": 93,
    "STP": 62,
    "SOH": 37,
    "SLDP": 36,
    "Gandhi Fellowship": 22,
    "PSL - SoH": 16
  },
  work_status_distribution: {
    "Intrapreneur": 1263,
    "Not working presently": 302,
    "Entrepreneur": 104,
    "Higher Studies": 59,
    "Freelancer/Consultant": 40
  },
  state_distribution: {
    "Uttar Pradesh ": 283,
    "Bihar": 269,
    "Maharashtra ": 265,
    "Madhya Pradesh": 123,
    "Jharkhand": 121,
    "New Delhi ": 96,
    "West Bengal": 87,
    "Rajasthan": 75,
    "Assam": 60,
    "Chhattisgarh": 53,
    "Gujarat": 49,
    "Haryana": 42,
    "Tamil Nadu": 39,
    "Himachal Pradesh": 38,
    "Andhra Pradesh": 35
  },
  batch_distribution: {
    "1": 2,
    "2": 26,
    "3": 77,
    "4": 134,
    "5": 162,
    "6": 188,
    "7": 192,
    "8": 212,
    "9": 205,
    "10": 219,
    "11": 207,
    "12": 179,
    "14": 170,
    "15": 145,
    "16": 117
  },
  mentoring_analysis: {
    "Yes": 1253,
    "No. Won't be able to give time": 450,
    "Yes, for 10 hours in 6 months": 311,
    "Yes, for 20 hours in 12 months": 178,
    "yes": 21,
    "Depend on satuation": 4,
    "10 hours & 6 months": 2,
    "weekly 2 hours": 1,
    "weekly 6 hours": 1,
    "monthly 10 hours": 1
  },
  placement_support_analysis: {
    "Yes": 1786,
    "No": 442,
    "yes": 6,
    "May be": 1
  }
};

// Chart colors as specified in instructions
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart instances
let charts = {};

// Mock alumni data for directory (since we only have aggregated data)
let mockAlumniData = [];
let filteredAlumniData = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    mockAlumniData = generateMockAlumniData();
    filteredAlumniData = [...mockAlumniData];
    
    initializeTabs();
    initializeCharts();
    initializeDirectory();
    animateStatNumbers();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Refresh charts when tab is activated
            setTimeout(() => {
                Object.values(charts).forEach(chart => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                    }
                });
            }, 100);
        });
    });
}

// Initialize all charts
function initializeCharts() {
    createBigBetChart();
    createWorkStatusChart();
    createBatchChart();
    createStateChart();
    createWorkStatusDetailChart();
    createBigBetPieChart();
    createMentoringChart();
    createPlacementChart();
}

// Big Bet Distribution Chart (Overview)
function createBigBetChart() {
    const ctx = document.getElementById('bigBetChart').getContext('2d');
    const labels = Object.keys(dashboardData.big_bet_distribution);
    const data = Object.values(dashboardData.big_bet_distribution);
    
    charts.bigBet = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Work Status Chart (Overview)
function createWorkStatusChart() {
    const ctx = document.getElementById('workStatusChart').getContext('2d');
    const labels = Object.keys(dashboardData.work_status_distribution);
    const data = Object.values(dashboardData.work_status_distribution);
    
    charts.workStatus = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 8,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Batch Distribution Chart
function createBatchChart() {
    const ctx = document.getElementById('batchChart').getContext('2d');
    const labels = Object.keys(dashboardData.batch_distribution).map(batch => `Batch ${batch}`);
    const data = Object.values(dashboardData.batch_distribution);
    
    charts.batch = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Alumni Count',
                data: data,
                backgroundColor: chartColors[0],
                borderColor: chartColors[4],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Alumni'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Batch Number'
                    }
                }
            }
        }
    });
}

// State Distribution Chart
function createStateChart() {
    const ctx = document.getElementById('stateChart').getContext('2d');
    const sortedStates = Object.entries(dashboardData.state_distribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15);
    
    const labels = sortedStates.map(([state]) => state.trim());
    const data = sortedStates.map(([,count]) => count);
    
    charts.state = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Alumni Count',
                data: data,
                backgroundColor: chartColors[1],
                borderColor: chartColors[2],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Alumni'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'States'
                    }
                }
            }
        }
    });
}

// Work Status Detail Chart (Professional Tab)
function createWorkStatusDetailChart() {
    const ctx = document.getElementById('workStatusDetailChart').getContext('2d');
    const labels = Object.keys(dashboardData.work_status_distribution);
    const data = Object.values(dashboardData.work_status_distribution);
    
    charts.workStatusDetail = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Alumni Count',
                data: data,
                backgroundColor: chartColors.slice(0, labels.length),
                borderColor: chartColors[4],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Alumni'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Work Status'
                    }
                }
            }
        }
    });
}

// Big Bet Pie Chart (Professional Tab)
function createBigBetPieChart() {
    const ctx = document.getElementById('bigBetPieChart').getContext('2d');
    
    // Get top 8 categories for better readability
    const sortedBigBets = Object.entries(dashboardData.big_bet_distribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8);
    
    const labels = sortedBigBets.map(([category]) => category);
    const data = sortedBigBets.map(([,count]) => count);
    
    charts.bigBetPie = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 8,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Mentoring Chart
function createMentoringChart() {
    const ctx = document.getElementById('mentoringChart').getContext('2d');
    
    // Simplify mentoring data for better visualization
    const mentoringData = {
        "Willing to Mentor": dashboardData.mentoring_analysis["Yes"] + dashboardData.mentoring_analysis["yes"],
        "Not Available": dashboardData.mentoring_analysis["No. Won't be able to give time"],
        "10 hrs/6 months": dashboardData.mentoring_analysis["Yes, for 10 hours in 6 months"],
        "20 hrs/12 months": dashboardData.mentoring_analysis["Yes, for 20 hours in 12 months"],
        "Other": Object.values(dashboardData.mentoring_analysis).reduce((sum, val) => sum + val, 0) - 
                dashboardData.mentoring_analysis["Yes"] - dashboardData.mentoring_analysis["yes"] - 
                dashboardData.mentoring_analysis["No. Won't be able to give time"] - 
                dashboardData.mentoring_analysis["Yes, for 10 hours in 6 months"] - 
                dashboardData.mentoring_analysis["Yes, for 20 hours in 12 months"]
    };
    
    const labels = Object.keys(mentoringData);
    const data = Object.values(mentoringData);
    
    charts.mentoring = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 8,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Placement Support Chart
function createPlacementChart() {
    const ctx = document.getElementById('placementChart').getContext('2d');
    
    const placementData = {
        "Yes": dashboardData.placement_support_analysis["Yes"] + dashboardData.placement_support_analysis["yes"],
        "No": dashboardData.placement_support_analysis["No"],
        "Maybe": dashboardData.placement_support_analysis["May be"]
    };
    
    const labels = Object.keys(placementData);
    const data = Object.values(placementData);
    
    charts.placement = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [chartColors[0], chartColors[2], chartColors[1]],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Initialize Directory
function initializeDirectory() {
    populateFilters();
    renderDirectory(filteredAlumniData);
    setupDirectoryEvents();
}

// Populate filter dropdowns
function populateFilters() {
    const batchFilter = document.getElementById('batchFilter');
    const stateFilter = document.getElementById('stateFilter');
    const workStatusFilter = document.getElementById('workStatusFilter');
    
    // Populate batch filter
    Object.keys(dashboardData.batch_distribution).forEach(batch => {
        const option = document.createElement('option');
        option.value = batch;
        option.textContent = `Batch ${batch}`;
        batchFilter.appendChild(option);
    });
    
    // Populate state filter
    Object.keys(dashboardData.state_distribution).forEach(state => {
        const option = document.createElement('option');
        option.value = state.trim();
        option.textContent = state.trim();
        stateFilter.appendChild(option);
    });
    
    // Populate work status filter
    Object.keys(dashboardData.work_status_distribution).forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        workStatusFilter.appendChild(option);
    });
}

// Setup directory event listeners
function setupDirectoryEvents() {
    const searchInput = document.getElementById('searchInput');
    const batchFilter = document.getElementById('batchFilter');
    const stateFilter = document.getElementById('stateFilter');
    const workStatusFilter = document.getElementById('workStatusFilter');
    
    [searchInput, batchFilter, stateFilter, workStatusFilter].forEach(element => {
        element.addEventListener('input', filterDirectory);
        element.addEventListener('change', filterDirectory);
    });
}

// Filter directory based on inputs - FIXED VERSION
function filterDirectory() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const batchFilter = document.getElementById('batchFilter').value.trim();
    const stateFilter = document.getElementById('stateFilter').value.trim();
    const workStatusFilter = document.getElementById('workStatusFilter').value.trim();
    
    console.log('Filtering with:', { searchTerm, batchFilter, stateFilter, workStatusFilter }); // Debug log
    
    filteredAlumniData = mockAlumniData.filter(alumni => {
        // Search filter
        const matchesSearch = !searchTerm || 
            alumni.name.toLowerCase().includes(searchTerm) ||
            alumni.batch.toString().includes(searchTerm) ||
            alumni.state.toLowerCase().includes(searchTerm) ||
            alumni.bigBet.toLowerCase().includes(searchTerm);
        
        // Batch filter
        const matchesBatch = !batchFilter || alumni.batch.toString() === batchFilter;
        
        // State filter
        const matchesState = !stateFilter || alumni.state.trim() === stateFilter;
        
        // Work status filter - exact match
        const matchesWorkStatus = !workStatusFilter || alumni.workStatus === workStatusFilter;
        
        return matchesSearch && matchesBatch && matchesState && matchesWorkStatus;
    });
    
    console.log('Filtered results count:', filteredAlumniData.length); // Debug log
    renderDirectory(filteredAlumniData);
}

// Render directory table
function renderDirectory(data) {
    const tableBody = document.getElementById('directoryTableBody');
    
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="loading-cell">No alumni found matching your criteria</td></tr>';
        return;
    }
    
    tableBody.innerHTML = data.map(alumni => `
        <tr>
            <td><strong>${alumni.name}</strong></td>
            <td>Batch ${alumni.batch}</td>
            <td>${alumni.bigBet}</td>
            <td>${alumni.state}</td>
            <td><span class="status-badge ${getWorkStatusClass(alumni.workStatus)}">${alumni.workStatus}</span></td>
            <td><span class="status-badge ${alumni.mentoring === 'Yes' ? 'status-badge--yes' : 'status-badge--no'}">${alumni.mentoring}</span></td>
            <td><span class="status-badge ${alumni.placementSupport === 'Yes' ? 'status-badge--yes' : 'status-badge--no'}">${alumni.placementSupport}</span></td>
        </tr>
    `).join('');
}

// Get work status CSS class
function getWorkStatusClass(status) {
    switch(status) {
        case 'Intrapreneur':
            return 'status-badge--working';
        case 'Not working presently':
            return 'status-badge--not-working';
        case 'Entrepreneur':
            return 'status-badge--entrepreneur';
        case 'Higher Studies':
        case 'Freelancer/Consultant':
            return 'status-badge--studies';
        default:
            return '';
    }
}

// Generate mock alumni data based on the aggregated statistics - IMPROVED VERSION
function generateMockAlumniData() {
    const mockData = [];
    const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Anvit', 'Aadhya', 'Ananya', 'Anika', 'Diya', 'Ira', 'Jiya', 'Kavya', 'Kiara', 'Myra', 'Navya', 'Pihu', 'Saanvi', 'Sara', 'Shanvi', 'Siya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Kumar', 'Singh', 'Yadav', 'Mishra', 'Pandey', 'Agarwal', 'Jain', 'Bansal', 'Agrawal', 'Goyal', 'Arora', 'Malhotra', 'Khanna', 'Chopra', 'Kapoor', 'Mehta', 'Shah'];
    
    const bigBets = Object.keys(dashboardData.big_bet_distribution);
    const states = Object.keys(dashboardData.state_distribution).map(state => state.trim());
    const workStatuses = Object.keys(dashboardData.work_status_distribution);
    const batches = Object.keys(dashboardData.batch_distribution);
    
    // Generate more realistic distribution based on actual data
    for (let i = 0; i < 300; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        // Create weighted distribution for work status to match actual data
        let workStatus;
        const workStatusRand = Math.random();
        if (workStatusRand < 0.565) {
            workStatus = 'Intrapreneur';
        } else if (workStatusRand < 0.7) {
            workStatus = 'Not working presently';
        } else if (workStatusRand < 0.747) {
            workStatus = 'Entrepreneur';
        } else if (workStatusRand < 0.773) {
            workStatus = 'Higher Studies';
        } else {
            workStatus = 'Freelancer/Consultant';
        }
        
        mockData.push({
            name: `${firstName} ${lastName}`,
            batch: batches[Math.floor(Math.random() * batches.length)],
            bigBet: bigBets[Math.floor(Math.random() * bigBets.length)],
            state: states[Math.floor(Math.random() * states.length)],
            workStatus: workStatus,
            mentoring: Math.random() > 0.2 ? 'Yes' : 'No',
            placementSupport: Math.random() > 0.2 ? 'Yes' : 'No'
        });
    }
    
    return mockData;
}

// Animate statistics numbers on page load
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((element, index) => {
        const targetValue = parseInt(element.textContent.replace(/,/g, ''));
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue).toLocaleString();
        }, 16);
        
        // Stagger the animation start
        setTimeout(() => {
            // Animation will start when timeout completes
        }, index * 200);
    });
}