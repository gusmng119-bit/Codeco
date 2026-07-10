import { useEffect, useState } from "react";
import "./TeacherAdmin.css";
import { Search, ChevronDown, Calendar as CalendarIcon, Pencil, Trash2 } from "lucide-react";
import useTeacherStore from "@/store/teacherStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";
import teacherAvatar from "@/assets/coki.jpg";

const TeacherAdmin = () => {
  const { teachers, searchTerm, loading, error, setSearchTerm, fetchTeachers } = useTeacherStore();
  const [activeDetailTab, setActiveDetailTab] = useState("detail"); // "detail" | "pembayaran"

  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsData = [
    { id: 1, title: "Total Teachers",    value: teachers.length, colorClass: "blue-cyan"    },
    { id: 2, title: "Active Teachers",   value: teachers.length, colorClass: "blue-primary"  },
    { id: 3, title: "Unactive Teachers", value: 0,               colorClass: "purple"        },
    { id: 4, title: "Pending Feedback",  value: 0,               colorClass: "orange"        },
  ];

  return (
    <div className="teacher-page-container">

      {/* STATS */}
      <div className="teacher-stats-grid">
        {statsData.map((stat) => (
          <div key={stat.id} className={`stat-card-item ${stat.colorClass}`}>
            <div className="stat-icon-wrapper"><div className="circle-inner-icon"></div></div>
            <div className="stat-text-info">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="teacher-filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon-inside" size={18} />
          <input
            type="text"
            placeholder="Cari nama guru, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdown-group">
          <button className="filter-select-btn">Semua Kelas <ChevronDown size={16} /></button>
          <button className="filter-select-btn">Semua Status <ChevronDown size={16} /></button>
          <button className="filter-select-btn"><CalendarIcon size={16} /> Semua Tanggal</button>
        </div>
      </div>

      {/* STATES */}
      {loading && <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}><p>Loading teachers...</p></div>}
      {!loading && error && <ErrorState title="Unable to load teachers" message={error} onRetry={fetchTeachers} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No Teachers Found" message={searchTerm ? "No teachers match your search." : "No teachers available."} icon="🎓" />
      )}

      {/* TABLE */}
      {!loading && !error && filtered.length > 0 && (
        <div className="teacher-table-responsive">
          <table className="teacher-data-table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th>Nama Guru</th>
                <th>Mata Pelajaran</th>
                <th>Status</th>
                <th style={{ width: "100px", textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((teacher, index) => (
                <tr key={teacher.id}>
                  <td>{index + 1}</td>
                  <td className="teacher-name-cell">{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td><span className="status-badge-active">Active</span></td>
                  <td className="action-buttons-cell">
                    <button className="btn-action-edit"><Pencil size={16} /></button>
                    <button className="btn-action-delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PROFILE DETAIL */}
      <div className="teacher-detail-tabs-card">
        <div className="detail-tabs-navigation">
          <button
            type="button"
            className={`tab-nav-btn ${activeDetailTab === "detail" ? "active" : ""}`}
            onClick={() => setActiveDetailTab("detail")}
          >
            Detail Guru
          </button>
          <button
            type="button"
            className={`tab-nav-btn ${activeDetailTab === "pembayaran" ? "active" : ""}`}
            onClick={() => setActiveDetailTab("pembayaran")}
          >
            Pembayaran
          </button>
        </div>

        {/* --- TAB: DETAIL GURU --- */}
        {activeDetailTab === "detail" && (
          <div className="detail-card-content">
            <div className="profile-identity-box">
              <img src={teacherAvatar} alt="Mr Ilham" className="teacher-avatar-img" />
              <div className="identity-text-details">
                <h3>Mr Ilham</h3>
                <span className="label-status-active">Guru Aktif</span>
                <div className="identity-meta-rows">
                  <div className="meta-row-item">📚 <span>Kelas: Coding</span></div>
                  <div className="meta-row-item">📧 <span>Email: ilham@codeco.com</span></div>
                  <div className="meta-row-item">📱 <span>Telepon: 0823-4321-3332</span></div>
                </div>
              </div>
            </div>
            <div className="profile-supplementary-box">
              <h4>Informasi Tambahan</h4>
              <div className="supplementary-rows-list">
                <div className="supp-row"><span className="supp-label">Tanggal Lahir</span><span className="supp-value">: 24 Mei 1990</span></div>
                <div className="supp-row"><span className="supp-label">Alamat</span><span className="supp-value">: Jl. Tukad Balian No.45</span></div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: PEMBAYARAN --- */}
        {activeDetailTab === "pembayaran" && (
          <div className="payment-tab-content">
            <div className="payment-rincian-gaji-box">
              <h4 className="payment-block-title">Rincian gaji</h4>
              <div className="payment-rows-list">
                <div className="payment-row-item">
                  <span className="payment-row-label">Total Kelas Diajar</span>
                  <span className="payment-row-value">: 3 Kelas</span>
                </div>
                <div className="payment-row-item">
                  <span className="payment-row-label">Tarif per kelas</span>
                  <span className="payment-row-value">: Rp 500.000</span>
                </div>
                <div className="payment-row-item">
                  <span className="payment-row-label">Feedback Pending</span>
                  <span className="payment-row-value">: 1</span>
                </div>
                <div className="payment-divider-line"></div>
                <div className="payment-row-item payment-total-row">
                  <span className="payment-row-label total">Total Gaji</span>
                  <span className="payment-row-value total">: Rp 1.000.000</span>
                </div>
              </div>
            </div>

            <div className="payment-informasi-box">
              <h4 className="payment-block-title">Informasi Pembayaran</h4>
              <div className="payment-rows-list">
                <div className="payment-row-item">
                  <span className="payment-row-label">Status Pembayaran</span>
                  <span className="payment-row-value">: Paid</span>
                </div>
                <div className="payment-row-item">
                  <span className="payment-row-label">Tanggal Bayar</span>
                  <span className="payment-row-value">: 25 April 2026</span>
                </div>
                <div className="payment-row-item">
                  <span className="payment-row-label">Metode Pembayaran</span>
                  <span className="payment-row-value">: Transfer Bank</span>
                </div>
                <div className="payment-row-item">
                  <span className="payment-row-label">Bank Tujuan</span>
                  <span className="payment-row-value">: Bank BCA</span>
                </div>
                <div className="payment-row-item">
                  <span className="payment-row-label">Catatan</span>
                  <span className="payment-row-value">: Pembayaran Gaji April 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAdmin;