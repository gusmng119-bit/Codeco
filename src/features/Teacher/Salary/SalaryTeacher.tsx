import { useEffect } from "react";
import "./SalaryTeacher.css";
import useSalaryStore from "@/store/salaryStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#19b3c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5b21f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#19c98c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const SalaryTeacher = () => {
  const { salaryData, summary, loading, error, fetchSalary } = useSalaryStore();

  useEffect(() => {
    fetchSalary();
  }, [fetchSalary]);

  return (
    <div className="salary-page">
      <h2 className="salary-main-title">Salary</h2>

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="salary-summary-grid">
          <div className="summary-card">
            <div className="card-icon-wrapper icon-total">
              <WalletIcon />
            </div>
            <div className="card-info-content">
              <p className="card-label">Total Salary</p>
              <h3 className="card-amount">{summary.totalSalary}</h3>
              <p className="card-subtext">This month</p>
            </div>
            <div className="card-bottom-bar bar-total"></div>
          </div>

          <div className="summary-card">
            <div className="card-icon-wrapper icon-pending">
              <ClockIcon />
            </div>
            <div className="card-info-content">
              <p className="card-label">Pending Payment</p>
              <h3 className="card-amount amount-pending">{summary.pendingAmount}</h3>
              <p className="card-subtext">{summary.pendingCount} Payments</p>
            </div>
            <div className="card-bottom-bar bar-pending"></div>
          </div>

          <div className="summary-card">
            <div className="card-icon-wrapper icon-paid">
              <CheckIcon />
            </div>
            <div className="card-info-content">
              <p className="card-label">Paid Salary</p>
              <h3 className="card-amount amount-paid">{summary.paidAmount}</h3>
              <p className="card-subtext">{summary.paidCount} Payments</p>
            </div>
            <div className="card-bottom-bar bar-paid"></div>
          </div>
        </div>
      )}

      <div className="salary-main-container">

        {/* STATES */}
        {loading && (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            <p>Loading salary data...</p>
          </div>
        )}

        {!loading && error && (
          <ErrorState title="Unable to load salary" message={error} onRetry={fetchSalary} />
        )}

        {!loading && !error && salaryData.length === 0 && (
          <EmptyState title="No Salary Records" message="Belum ada riwayat pembayaran." icon="💰" />
        )}

        {!loading && !error && salaryData.length > 0 && (
          <>
            {/* FILTER ROW */}
            <div className="salary-filter-row">
              <div className="filter-input-wrapper">
                <select className="filter-select" defaultValue="April 2026">
                  <option value="April 2026">April 2026</option>
                </select>
              </div>
              <div className="filter-input-wrapper">
                <select className="filter-select" defaultValue="All Status">
                  <option value="All Status">All Status</option>
                </select>
              </div>
              <div className="filter-input-wrapper">
                <SearchIcon />
                <input type="text" className="filter-search-input" placeholder="Search Class..." />
              </div>
            </div>

            {/* TABLE */}
            <div className="salary-table-responsive">
              <table className="salary-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Class</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.date}</td>
                      <td>
                        <div className="class-cell-group">
                          <span className="class-name-main">{row.className}</span>
                          <span className="class-grade-sub">{row.grade}</span>
                        </div>
                      </td>
                      <td>{row.total}</td>
                      <td>
                        <span className={`status-pill pill-${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                      <td>{row.paymentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalaryTeacher;