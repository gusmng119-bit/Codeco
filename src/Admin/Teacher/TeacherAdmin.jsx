import React from "react";
import "./TeacherAdmin.css";
import { 
  Search, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  Pencil, 
  Trash2, 
  BookOpen, 
  Mail, 
  Phone, 
  Users 
} from "lucide-react";

// Menggunakan placeholder avatar atau silakan ganti dengan file path gambar asli Anda
import teacherAvatar from "../../assets/coki.jpg"; 

const TeacherAdmin = () => {
  // Data statistik di bagian atas card
  const statsData = [
    { id: 1, title: "Total Teachers", value: 30, colorClass: "blue-cyan" },
    { id: 2, title: "Active Teachers", value: 28, colorClass: "blue-primary" },
    { id: 3, title: "Unactive Teachers", value: 2, colorClass: "purple" },
    { id: 4, title: "Pending Feedback", value: 24, colorClass: "orange" },
  ];

  // Data baris tabel guru (Sesuai gambar baris 1 unik, baris selanjutnya duplikat)
  const teachersList = [
    { id: 1, name: "Mr. Ilham", email: "Mr.ilham123@gmail.com", phone: "0813-3898-9098", status: "Active", date: "21 Maret 2026" },
    { id: 2, name: "Krisnawan Putrawan", email: "KrisnawanPutrawan@gmail.com", phone: "0813-3898-9098", status: "Active", date: "21 Maret 2026" },
    { id: 3, name: "Krisnawan Putrawan", email: "KrisnawanPutrawan@gmail.com", phone: "0813-3898-9098", status: "Active", date: "21 Maret 2026" },
    { id: 4, name: "Krisnawan Putrawan", email: "KrisnawanPutrawan@gmail.com", phone: "0813-3898-9098", status: "Active", date: "21 Maret 2026" },
    { id: 5, name: "Krisnawan Putrawan", email: "KrisnawanPutrawan@gmail.com", phone: "0813-3898-9098", status: "Active", date: "21 Maret 2026" },
    { id: 6, name: "Krisnawan Putrawan", email: "KrisnawanPutrawan@gmail.com", phone: "0813-3898-9098", status: "Active", date: "21 Maret 2026" },
  ];

  return (
    <div className="teacher-page-container">
      {/* STATS CARD SECTION */}
      <div className="teacher-stats-grid">
        {statsData.map((stat) => (
          <div key={stat.id} className={`stat-card-item ${stat.colorClass}`}>
            <div className="stat-icon-wrapper">
              {/* Ikon dekorasi bawaan sesuai warna lingkaran */}
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
      <div className="teacher-filter-bar">
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

      {/* TEACHER LIST TABLE */}
      <div className="teacher-table-responsive">
        <table className="teacher-data-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th>Nama Guru</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Status</th>
              <th>Tanggal Daftar</th>
              <th style={{ width: "100px", textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {teachersList.map((teacher) => (
              <tr key={teacher.id}>
                {/* Di mockup Anda, seluruh kolom nomor tertulis angka 1 */}
                <td>1</td>
                <td className="teacher-name-cell">{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>
                  <span className="status-badge-active">{teacher.status}</span>
                </td>
                <td>{teacher.date}</td>
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

      {/* PROFILE DETAIL BOTTOM AREA */}
      <div className="teacher-detail-tabs-card">
        <div className="detail-tabs-navigation">
          <button className="tab-nav-btn active">Detail Guru</button>
          <button className="tab-nav-btn">Pembayaran</button>
        </div>
        
        <div className="detail-card-content">
          {/* Sisi Kiri: Profil Utama */}
          <div className="profile-identity-box">
            <img src={teacherAvatar} alt="Mr Ilham" className="teacher-avatar-img" />
            <div className="identity-text-details">
              <h3>Mr ilham</h3>
              <span className="label-status-active">Guru Aktif</span>
              
              <div className="identity-meta-rows">
                <div className="meta-row-item">
                  <BookOpen size={16} /> <span>Kelas: Coding</span>
                </div>
                <div className="meta-row-item">
                  <Mail size={16} /> <span>Email: Krisnawan.123@gmail.com</span>
                </div>
                <div className="meta-row-item">
                  <Phone size={16} /> <span>Telepon: 0823-4321-3332</span>
                </div>
                <div className="meta-row-item">
                  <Users size={16} /> <span>Orang Tua: Karyanto</span>
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
                <span className="supp-value">: 24 Mei 2014</span>
              </div>
              <div className="supp-row">
                <span className="supp-label">Alamat</span>
                <span className="supp-value">: Jalan Batu Kapur no 12</span>
              </div>
              <div className="supp-row">
                <span className="supp-label">Sekolah</span>
                <span className="supp-value">: SD Mitra Kukar</span>
              </div>
              <div className="supp-row">
                <span className="supp-label">Hobi</span>
                <span className="supp-value">: Membaca</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAdmin;