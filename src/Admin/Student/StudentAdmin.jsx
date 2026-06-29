import React from "react";
import "./StudentAdmin.css";
import { 
  Search, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  Pencil, 
  Trash2, 
  BookOpen, 
  Mail, 
  Phone, 
  User 
} from "lucide-react";

// Impor avatar placeholder untuk detail siswa di bagian bawah
import studentAvatar from "../../assets/coki.jpg"; 

const StudentAdmin = () => {
  // Data statistik bagian atas card siswa
  const statsData = [
    { id: 1, title: "Total Student's", value: 320, colorClass: "blue-cyan" },
    { id: 2, title: "Active Student's", value: 315, colorClass: "blue-primary" },
    { id: 3, title: "Unactive Student's", value: 5, colorClass: "purple" },
    { id: 4, title: "New Registration", value: 12, colorClass: "orange" },
  ];

  // Data list siswa untuk tabel
  const studentsList = [
    { id: 1, name: "Gede Arya", email: "gede.arya@gmail.com", phone: "0812-3456-7890", status: "Active", date: "12 April 2026" },
    { id: 2, name: "Made Satria", email: "madesatria@gmail.com", phone: "0812-9876-5432", status: "Active", date: "12 April 2026" },
    { id: 3, name: "Nyoman Putra", email: "nyomanputra@gmail.com", phone: "0813-4455-6677", status: "Active", date: "14 April 2026" },
    { id: 4, name: "Ketut Lestari", email: "ketut.lestari@gmail.com", phone: "0819-2233-4455", status: "Active", date: "15 April 2026" },
    { id: 5, name: "Wayan Indah", email: "wayan.indah@gmail.com", phone: "0878-5566-7788", status: "Active", date: "15 April 2026" },
    { id: 6, name: "Putu Bagus", email: "putubagus@gmail.com", phone: "0857-1122-3344", status: "Active", date: "16 April 2026" },
  ];

  return (
    <div className="student-page-container">
      
      {/* STATS CARD SECTION */}
      <div className="student-stats-grid">
        {statsData.map((stat) => (
          <div key={stat.id} className={`stat-card-item ${stat.colorClass}`}>
            <div className="stat-icon-wrapper">
              <div className="circle-inner-icon"></div>
            </div>
            <div className="stat-text-info">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER BAR SECTION */}
      <div className="student-filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon-inside" size={18} />
          <input type="text" placeholder="Cari nama siswa, email, atau telepon..." />
        </div>
        
        <div className="filter-dropdown-group">
          <button className="filter-select-btn">
            Semua Kelas <ChevronDown size={16} />
          </button>
          <button className="filter-select-btn">
            Semua Status <ChevronDown size={16} />
          </button>
          <button className="filter-select-btn">
            <CalendarIcon size={16} /> Semua Tanggal
          </button>
        </div>
      </div>

      {/* STUDENT DATA TABLE */}
      <div className="student-table-responsive">
        <table className="student-data-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th>Nama Siswa</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Status</th>
              <th>Tanggal Daftar</th>
              <th style={{ width: "100px", textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td className="student-name-cell">{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <span className="status-badge-active">{student.status}</span>
                </td>
                <td>{student.date}</td>
                <td className="action-buttons-cell">
                  <button className="btn-action-edit">
                    <Pencil size={16} />
                  </button>
                  <button className="btn-action-delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STUDENT DETAIL BOTTOM AREA */}
      <div className="student-detail-tabs-card">
        <div className="detail-tabs-navigation">
          <button className="tab-nav-btn active">Detail Siswa</button>
          <button className="tab-nav-btn">Riwayat Kelas</button>
        </div>
        
        <div className="detail-card-content">
          {/* Sisi Kiri: Profil Utama Siswa */}
          <div className="profile-identity-box">
            <img src={studentAvatar} alt="Gede Arya" className="student-avatar-img" />
            <div className="identity-text-details">
              <h3>Gede Arya</h3>
              <span className="label-status-active">Siswa Aktif</span>
              
              <div className="identity-meta-rows">
                <div className="meta-row-item">
                  <BookOpen size={16} /> <span>Kelas Saat Ini: Robotic Basic</span>
                </div>
                <div className="meta-row-item">
                  <Mail size={16} /> <span>Email: gede.arya@gmail.com</span>
                </div>
                <div className="meta-row-item">
                  <Phone size={16} /> <span>Telepon: 0812-3456-7890</span>
                </div>
                <div className="meta-row-item">
                  <User size={16} /> <span>Orang Tua: I Wayan Utama</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Informasi Tambahan */}
          <div className="profile-supplementary-box">
            <h4>Informasi Tambahan</h4>
            <div className="supplementary-rows-list">
              <div className="supp-row">
                <span className="supp-label">Tanggal Lahir</span>
                <span className="supp-value">: 14 Agustus 2015</span>
              </div>
              <div className="supp-row">
                <span className="supp-label">Alamat</span>
                <span className="supp-value">: Jalan Gatsu Barat No. 45, Denpasar</span>
              </div>
              <div className="supp-row">
                <span className="supp-label">Sekolah</span>
                <span className="supp-value">: SD No. 3 Denpasar</span>
              </div>
              <div className="supp-row">
                <span className="supp-label">Hobi</span>
                <span className="supp-value">: Merakit Lego, Coding</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentAdmin;