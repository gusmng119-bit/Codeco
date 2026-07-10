import { useEffect } from "react";
import "./ClassesAdmin.css";
import { Search, ChevronDown, Plus, Pencil } from "lucide-react";
import useAdminClassStore from "@/store/adminClassStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";
import teacherAvatar from "@/assets/coki.jpg";

const ClassesAdmin = () => {
  const { classes, searchTerm, loading, error, setSearchTerm, fetchClasses } = useAdminClassStore();

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const filtered = classes.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classes-page-container">

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search teacher name, class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdowns">
          <button className="dropdown-btn">Semua Kelas <ChevronDown size={16} /></button>
          <button className="dropdown-btn">Semua Status <ChevronDown size={16} /></button>
        </div>
        <button className="btn-create-class"><Plus size={18} /> Create Class</button>
      </div>

      {/* STATES */}
      {loading && <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}><p>Loading classes...</p></div>}
      {!loading && error && <ErrorState title="Unable to load classes" message={error} onRetry={fetchClasses} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No Classes Found" message={searchTerm ? "No classes match your search." : "No classes available."} icon="📚" />
      )}

      {/* TABLE */}
      {!loading && !error && filtered.length > 0 && (
        <div className="table-responsive">
          <table className="classes-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>No</th>
                <th>Class Name</th>
                <th>Teacher</th>
                <th>Students</th>
                <th>Schedule</th>
                <th>Status</th>
                <th style={{ width: "80px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold text-slate-800">{item.name}</td>
                  <td>{item.teacher}</td>
                  <td>{item.totalStudents}</td>
                  <td className="schedule-cell">{item.schedule}</td>
                  <td><span className="status-badge">{item.status}</span></td>
                  <td style={{ textAlign: "center" }}>
                    <button className="btn-edit-action"><Pencil size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAIL GURU SECTION */}
      <div className="teacher-detail-card">
        <div className="tabs-container">
          <button className="tab-item active">Detail Guru</button>
        </div>
        <div className="card-content">
          <div className="profile-main-info">
            <img src={teacherAvatar} alt="Mr Ilham" className="teacher-large-avatar" />
            <div className="profile-text-group">
              <h3>Mr Ilham</h3>
              <span className="badge-guru-aktif">Guru Aktif</span>
              <div className="meta-list">
                <div className="meta-item">📚 <span>Kelas: Coding</span></div>
                <div className="meta-item">📧 <span>Email: ilham@codeco.com</span></div>
                <div className="meta-item">📱 <span>Telepon: 0823-4321-3332</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesAdmin;
