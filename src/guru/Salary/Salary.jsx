import React from 'react';
import './Salary.css';

// Ikon-ikon SVG presisi yang disesuaikan dengan gambar contoh
const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fb2be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
    <path d="M21 12h-4a2 2 0 0 0 0 4h4" />
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Salary = () => {
  // Data riwayat pembayaran sesuai baris tabel pada gambar pendukung
  const salaryData = [
    { id: 1, date: '17 April 2026', className: 'Robotic', grade: 'Grade 1', total: 'Rp 750.000', status: 'Paid', paymentDate: '18 April 2026' },
    { id: 2, date: '17 April 2026', className: 'Robotic', grade: 'Grade 1', total: 'Rp 750.000', status: 'Pending', paymentDate: '18 April 2026' },
    { id: 3, date: '17 April 2026', className: 'Robotic', grade: 'Grade 1', total: 'Rp 750.000', status: 'Paid', paymentDate: '18 April 2026' },
    { id: 4, date: '17 April 2026', className: 'Robotic', grade: 'Grade 1', total: 'Rp 750.000', status: 'Paid', paymentDate: '18 April 2026' },
    { id: 5, date: '17 April 2026', className: 'Robotic', grade: 'Grade 1', total: 'Rp 750.000', status: 'Paid', paymentDate: '18 April 2026' }
  ];

  return (
    <div className="salary-page">
      <h2 className="salary-main-title">Salary</h2>

      {/* --- TOP SUMMARY CARDS SECTION --- */}
      <div className="salary-summary-grid">
        {/* Total Salary */}
        <div className="summary-card card-total">
          <div className="card-icon-wrapper icon-total">
            <WalletIcon />
          </div>
          <div className="card-info-content">
            <p className="card-label">Total Salary</p>
            <h3 className="card-amount">Rp 4.500.000</h3>
            <p className="card-subtext">This month</p>
          </div>
          <div className="card-bottom-bar bar-total"></div>
        </div>

        {/* Pending Payment */}
        <div className="summary-card card-pending">
          <div className="card-icon-wrapper icon-pending">
            <ClockIcon />
          </div>
          <div className="card-info-content">
            <p className="card-label">Pending Payment</p>
            <h3 className="card-amount amount-pending">Rp 1.500.000</h3>
            <p className="card-subtext">4 Payments</p>
          </div>
          <div className="card-bottom-bar bar-pending"></div>
        </div>

        {/* Paid Salary */}
        <div className="summary-card card-paid">
          <div className="card-icon-wrapper icon-paid">
            <CheckIcon />
          </div>
          <div className="card-info-content">
            <p className="card-label">Paid Salary</p>
            <h3 className="card-amount amount-paid">Rp 3.000.000</h3>
            <p className="card-subtext">5 Payments</p>
          </div>
          <div className="card-bottom-bar bar-paid"></div>
        </div>
      </div>

      {/* --- MAIN INTERFACE: FILTER BAR & TABLE CONTAINER --- */}
      <div className="salary-main-container">
        
        {/* Filter Controls Row */}
        <div className="salary-filter-row">
          <div className="filter-input-wrapper select-date-box">
            <CalendarIcon />
            <select className="filter-select" defaultValue="April 2026">
              <option value="April 2026">April 2026</option>
            </select>
          </div>

          <div className="filter-input-wrapper select-status-box">
            <FilterIcon />
            <select className="filter-select" defaultValue="All Status">
              <option value="All Status">All Status</option>
            </select>
          </div>

          <div className="filter-input-wrapper search-box-wrapper">
            <SearchIcon />
            <input type="text" className="filter-search-input" placeholder="Search Class..." />
          </div>
        </div>

        {/* Salary Data Table */}
        <div className="salary-table-responsive">
          <table className="salary-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left', paddingLeft: '24px' }}>Date</th>
                <th style={{ textAlign: 'left' }}>Class</th>
                <th style={{ textAlign: 'center' }}>Total</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center', paddingRight: '24px' }}>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.map((row, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left', paddingLeft: '24px', color: '#1e293b' }}>{row.date}</td>
                  <td style={{ textAlign: 'left' }}>
                    <div className="class-cell-group">
                      <span className="class-name-main">{row.className}</span>
                      <span className="class-grade-sub">{row.grade}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: '500', color: '#1e293b' }}>{row.total}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`status-pill pill-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', paddingRight: '24px', color: '#475569' }}>{row.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Salary;