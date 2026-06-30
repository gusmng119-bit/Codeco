import { useEffect } from "react";
import "./StudentAdmin.css";
import { Search, ChevronDown, Calendar as CalendarIcon, Pencil, Trash2 } from "lucide-react";
import useAdminStudentStore from "@/store/adminStudentStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";
import studentAvatar from "@/assets/coki.jpg";

const StudentAdmin = () => {
  const { students, searchTerm, loading, error, setSearchTerm, fetchStudents } = useAdminStudentStore();

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsData = [
    { id: 1, title: "Total Student's",    value: students.length,                                 colorClass: "blue-cyan"   },
    { id: 2, title: "Active Student's",   value: students.filter((s) => s.status === "Active").length, colorClass: "blue-primary" },
    { id: 3, title: "Unactive Student's", value: students.filter((s) => s.status === "Inactive").length, colorClass: "purple"  },
    { id: 4, title: "New Registration",   value: 0,                                               colorClass: "orange"      },
  ];

  return (
    <div className="student-page-container">

      {/* STATS */}
      <div className="student-stats-grid">
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
      <div className="student-filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon-inside" size={18} />
          <input
            type="text"
            placeholder="Cari nama siswa, email..."
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
      {loading && <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}><p>Loading students...</p></div>}
      {!loading && error && <ErrorState title="Unable to load students" message={error} onRetry={fetchStudents} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No Students Found" message={searchTerm ? "No students match your search." : "No students available."} icon="👥" />
      )}

      {/* TABLE */}
      {!loading && !error && filtered.length > 0 && (
        <div className="student-table-responsive">
          <table className="student-data-table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th>Nama Siswa</th>
                <th>Email</th>
                <th>Kelas</th>
                <th>Status</th>
                <th style={{ width: "100px", textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td className="student-name-cell">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.class}</td>
                  <td><span className={`status-badge-${student.status === "Active" ? "active" : "inactive"}`}>{student.status}</span></td>
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

      {/* DETAIL STUDENT */}
      <div className="student-detail-tabs-card">
        <div className="detail-tabs-navigation">
          <button className="tab-nav-btn active">Detail Siswa</button>
        </div>
        <div className="detail-card-content">
          <div className="profile-identity-box">
            <img src={studentAvatar} alt="Student" className="student-avatar-img" />
            <div className="identity-text-details">
              <h3>Budiono Putrosono</h3>
              <span className="label-status-active">Siswa Aktif</span>
              <div className="identity-meta-rows">
                <div className="meta-row-item">📚 <span>Kelas: Robotic</span></div>
                <div className="meta-row-item">📧 <span>Email: budiono@gmail.com</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmin;
