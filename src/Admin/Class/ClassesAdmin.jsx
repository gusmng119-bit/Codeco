import React from "react";
import "./ClassesAdmin.css";
import { Search, ChevronDown, Plus, Pencil, BookOpen, Mail, Phone, Users } from "lucide-react";

// Impor asset avatar guru (sesuaikan dengan lokasi file gambar Anda)
import teacherAvatar from "../../assets/coki.jpg"; 

const ClassesAdmin = () => {
  // Data tabel disesuaikan dengan gambar mockup Anda
  const classesData = [
    { id: 1, name: "Robotics Fundamentals", teacher: "Mr. Ilham", topic: "Robotics", schedule: "Monday \n 09:00 - 11:00", status: "Active" },
    { id: 2, name: "Programing Class", teacher: "Mrs. Dayu", topic: "Programing", schedule: "Tuesday \n 01:00 - 03:00", status: "Active" },
    { id: 3, name: "AI & Machine Learning", teacher: "Mr. budi", topic: "Artificial", schedule: "Saturday \n 09:00 - 11:00", status: "Active" },
    { id: 4, name: "3D Design & Printing", teacher: "Mrs. Sari", topic: "3D Design", schedule: "Friday \n 17:00 - 18:30", status: "Active" },
    { id: 5, name: "Iot For Beginners", teacher: "Mr. Ilham", topic: "Internet of Think", schedule: "Monday \n 09:00 - 11:00", status: "Active" },
  ];

  return (
    <div className="classes-page-container">
      {/* FILTER BAR SECTION */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search teacher name, class..." />
        </div>
        
        <div className="filter-dropdowns">
          <button className="dropdown-btn">
            Semua Kelas <ChevronDown size={16} />
          </button>
          <button className="dropdown-btn">
            Semua Status <ChevronDown size={16} />
          </button>
        </div>

        <button className="btn-create-class">
          <Plus size={18} /> Create Class
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="table-responsive">
        <table className="classes-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>No</th>
              <th>Class Name</th>
              <th>Teacher</th>
              <th>Topic</th>
              <th>Schedule</th>
              <th>Status</th>
              <th style={{ width: "80px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {classesData.map((item) => (
              <tr key={item.id}>
                {/* Di mockup Anda, semua kolom nomor tertulis angka 1 */}
                <td>1</td> 
                <td className="font-semibold text-slate-800">{item.name}</td>
                <td>{item.teacher}</td>
                <td>{item.topic}</td>
                <td className="schedule-cell">{item.schedule}</td>
                <td>
                  <span className="status-badge">{item.status}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button className="btn-edit-action">
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL GURU SECTION */}
      <div className="teacher-detail-card">
        <div className="tabs-container">
          <button className="tab-item active">Detail Guru</button>
        </div>
        
        <div className="card-content">
          <div className="profile-main-info">
            <img src={teacherAvatar} alt="Mr Ilham" className="teacher-large-avatar" />
            <div className="profile-text-group">
              <h3>Mr ilham</h3>
              <span className="badge-guru-aktif">Guru Aktif</span>
              
              <div className="meta-list">
                <div className="meta-item">
                  <BookOpen size={16} /> <span>Kelas: Coding</span>
                </div>
                <div className="meta-item">
                  <Mail size={16} /> <span>Email: Krisnawan.123@gmail.com</span>
                </div>
                <div className="meta-item">
                  <Phone size={16} /> <span>Telepon: 0823-4321-3332</span>
                </div>
                <div className="meta-item">
                  <Users size={16} /> <span>Orang Tua: Karyanto</span>
                </div>
              </div>
            </div>
          </div>

          <div className="additional-info-box">
            <h4>Informasi Tambahan</h4>
            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">Tanggal Lahir</span>
                <span className="info-value">: 24 Mei 2014</span>
              </div>
              <div className="info-row">
                <span className="info-label">Alamat</span>
                <span className="info-value">: Jalan Batu Kapur no 12</span>
              </div>
              <div className="info-row">
                <span className="info-label">Sekolah</span>
                <span className="info-value">: SD Mitra Kukar</span>
              </div>
              <div className="info-row">
                <span className="info-label">Hobi</span>
                <span className="info-value">: Membaca</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesAdmin;