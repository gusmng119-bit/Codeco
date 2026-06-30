import { useEffect, useRef, useState } from "react";
import "./HomeAdmin.css";

const HomeAdminContent = () => {

  // State untuk masing-masing modal
  const [isModalOpen, setIsModalOpen] = useState(false);         // Modal Create Class
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false); // Modal Add Teacher
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false); // Modal Add Student
  const [isNotifOpen, setIsNotifOpen] = useState(false);         // Modal Notification (Lonceng)
  const [activeTab, setActiveTab] = useState("class");           // Tab aktif pada Notification
  const notifCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isNotifOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsNotifOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    // Fokus ke tombol close agar lebih accessible
    setTimeout(() => {
      notifCloseBtnRef.current?.focus?.();
    }, 0);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNotifOpen]);

  return (

    <div className="home-container">
      
      {/* Catatan: Di bagian Header Dashboard atas, pastikan tombol ikon lonceng Anda 
          ditambahkan properti onClick={() => setIsNotifOpen(true)} */}

      {/* ================= 1. TOP STATS CARDS ================= */}
        <div className="stats-grid">
      
        {/* NOTE: Agar modal notifikasi muncul saat tombol lonceng ditekan,
            kamu sudah bisa gunakan tombol ini untuk testing (Pending Feedback) */}

        {/* Total Teacher */}
        <div className="stat-card border-teacher">
          <div className="stat-icon-wrapper bg-teacher">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-size">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Teacher</span>
            <h2 className="stat-number">24</h2>
          </div>
        </div>

        {/* Total Student's */}
        <div className="stat-card border-student">
          <div className="stat-icon-wrapper bg-student">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-size">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Student's</span>
            <h2 className="stat-number">320</h2>
          </div>
        </div>

        {/* Total Classes */}
        <div className="stat-card border-classes">
          <div className="stat-icon-wrapper bg-classes">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-size">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18 Im12 0a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Classes</span>
            <h2 className="stat-number">43</h2>
          </div>
        </div>

        {/* Pending Feedback */}
        {/* Disini dipasang tombol pemicu lonceng agar mempermudah testing */}
        <div className="stat-card border-feedback" style={{ cursor: 'pointer' }} onClick={() => setIsNotifOpen(true)}>
          <div className="stat-icon-wrapper bg-feedback">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-size">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending Feedback</span>
            <h2 className="stat-number">24</h2>
          </div>
        </div>
      </div>

      {/* ================= 2. TWO COLUMN DATA TABLES ================= */}
      <div className="tables-row">
        {/* Today's Class Schedule */}
        <div className="data-table-card flex-7">
          <div className="table-header">
            <h3 className="table-title">Today's Class Schedule</h3>
            <a href="#calendar" className="table-link">view calendar</a>
          </div>
          <div className="table-responsive">
            <table className="main-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Class</th>
                  <th>Teacher</th>
                  <th>Session</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10:00 - 11:30</td>
                  <td className="font-bold text-dark">Robotic Basic</td>
                  <td>Ilham</td>
                  <td className="text-gray">Offline</td>
                </tr>
                <tr>
                  <td>12:00 - 1:30</td>
                  <td className="font-bold text-dark">Coding Basic</td>
                  <td>Putri</td>
                  <td className="text-gray">Offline</td>
                </tr>
                <tr>
                  <td>10:00 - 11:30</td>
                  <td className="font-bold text-dark">Programing</td>
                  <td>Alex</td>
                  <td className="text-gray">Online</td>
                </tr>
                <tr>
                  <td>08:00 - 10:00</td>
                  <td className="font-bold text-dark">Sience</td>
                  <td>Ayu</td>
                  <td className="text-gray">Offline</td>
                </tr>
                <tr>
                  <td>08:00 - 10:00</td>
                  <td className="font-bold text-dark">Design</td>
                  <td>Toupik</td>
                  <td className="text-gray">Online</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Salary */}
        <div className="data-table-card flex-5">
          <div className="table-header">
            <h3 className="table-title">Pending Salary</h3>
            <a href="#salary" className="table-link">view all</a>
          </div>
          
          <div className="salary-summary">
            <span className="salary-label">Total Pending Salary</span>
            <h2 className="salary-amount">Rp 12.500.000</h2>
          </div>

          <div className="table-responsive">
            <table className="main-table align-salary">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-center">Total Meeting</th>
                  <th className="text-right">Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ilham</td>
                  <td className="text-center">2</td>
                  <td className="text-right">1.000.000</td>
                </tr>
                <tr>
                  <td>Putri</td>
                  <td className="text-center">5</td>
                  <td className="text-right">2.500.000</td>
                </tr>
                <tr>
                  <td>Ayu</td>
                  <td className="text-center">4</td>
                  <td className="text-right">2.000.000</td>
                </tr>
                <tr>
                  <td>Toupik</td>
                  <td className="text-center">1</td>
                  <td className="text-right">500.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= 3. QUICK ACTION BAR ================= */}
      <div className="quick-action-card">
        <div className="quick-action-title">
          <div className="flash-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="flash-icon">
              <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h3>Quick action</h3>
        </div>

        <div className="actions-grid">
          {/* Create Class */}
          <button className="action-btn" onClick={() => setIsModalOpen(true)}>
            <div className="action-icon-circle bg-action-blue">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#3b82f6" className="icon-size-sm">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div className="action-text">
              <span className="action-name">Create Class</span>
              <span className="action-sub">make a new class</span>
            </div>
          </button>

          {/* Add Teacher */}
          <button className="action-btn" onClick={() => setIsTeacherModalOpen(true)}>
            <div className="action-icon-circle bg-action-green">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#10b981" className="icon-size-sm">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6 6 0 0 1 6-6h1.5a6 6 0 0 1 6 6v.11c0 .35-.07.7-.213 1.018a10.043 10.043 0 0 1-11.574 0 1.026 1.026 0 0 1-.213-1.018Z" />
              </svg>
            </div>
            <div className="action-text">
              <span className="action-name">Add Teacher</span>
              <span className="action-sub">add more teacher</span>
            </div>
          </button>

          {/* Add Student */}
          <button className="action-btn" onClick={() => setIsStudentModalOpen(true)}>
            <div className="action-icon-circle bg-action-purple">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#8b5cf6" className="icon-size-sm">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6 6 0 0 1 6-6h1.5a6 6 0 0 1 6 6v.11c0 .35-.07.7-.213 1.018a10.043 10.043 0 0 1-11.574 0 1.026 1.026 0 0 1-.213-1.018Z" />
              </svg>
            </div>
            <div className="action-text">
              <span className="action-name">Add Student</span>
              <span className="action-sub">add new student</span>
            </div>
          </button>

          {/* Manage Schedule */}
          <button className="action-btn">
            <div className="action-icon-circle bg-action-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#f97316" className="icon-size-sm">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
            </div>
            <div className="action-text">
              <span className="action-name">Manage Schedule</span>
              <span className="action-sub">make a new class</span>
            </div>
          </button>
        </div>
      </div>

      {/* ================= 4. MODAL DIALOG (CLASS INFORMATION) ================= */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <span className="modal-indicator"></span>
                <h3>Class Information</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="modal-form">
              <div className="form-group">
                <label>Class Name</label>
                <input type="text" placeholder="Enter class name" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} placeholder="Enter description"></textarea>
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Date</label>
                  <input type="date" />
                </div>
                <div className="form-group flex-1">
                  <label>Time</label>
                  <input type="time" />
                </div>
              </div>
              <div className="form-group">
                <label>Session type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="sessionType" value="online" defaultChecked />
                    <span className="custom-radio"></span> Online
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="sessionType" value="offline" />
                    <span className="custom-radio"></span> Offline
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Teacher</label>
                <select defaultValue="">
                  <option value="" disabled hidden>Select teacher</option>
                  <option value="ilham">Ilham</option>
                  <option value="putri">Putri</option>
                  <option value="alex">Alex</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-save" onClick={() => setIsModalOpen(false)}>save</button>
                <button type="submit" className="btn-create" onClick={() => setIsModalOpen(false)}>create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 5. MODAL DIALOG (TEACHER INFORMATION) ================= */}
      {isTeacherModalOpen && (
        <div className="modal-overlay" onClick={() => setIsTeacherModalOpen(false)}>
          <div className="modal-card teacher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <span className="modal-indicator teacher-indicator"></span>
                <h3>Teacher Information</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsTeacherModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="modal-form">
              <div className="form-group">
                <label>Teacher Name</label>
                <input type="text" placeholder="Enter teacher name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email address" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={2} placeholder="Enter description"></textarea>
              </div>
              <div className="form-group">
                <label>Collage</label>
                <input type="text" placeholder="Enter collage/university" />
              </div>
              <div className="form-group">
                <label>Teacher of</label>
                <input type="text" placeholder="e.g. Robotic Basic, Coding" />
              </div>
              <div className="modal-actions single-action">
                <button type="button" className="btn-save-custom" onClick={() => setIsTeacherModalOpen(false)}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 6. NEW MODAL DIALOG (STUDENT INFORMATION) ================= */}
      {isStudentModalOpen && (
        <div className="modal-overlay" onClick={() => setIsStudentModalOpen(false)}>
          <div className="modal-card student-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <span className="modal-indicator student-indicator"></span>
                <h3>Student Infomation</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsStudentModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="modal-form">
              <div className="form-group">
                <label>Student Name</label>
                <input type="text" placeholder="Enter student name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email address" />
              </div>

              <div className="form-group">
                <label>Grade</label>
                <input type="text" placeholder="Enter grade" />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="text" placeholder="Enter phone number" />
              </div>

              <div className="form-group">
                <label>Join Date</label>
                <input type="date" className="input-date-custom" />
              </div>

              <div className="modal-actions single-action">
                <button type="button" className="btn-save-custom" onClick={() => setIsStudentModalOpen(false)}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 7. NEW MODAL DIALOG (NOTIFICATION / LONCENG) ================= */}
      {isNotifOpen && (
        <div className="notif-overlay" onClick={() => setIsNotifOpen(false)} role="presentation">
          <div
            className="notif-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Notification"
          >
            <div className="notif-modal-header">
              <h3>Notification</h3>
              <button
                className="notif-close-btn"
                onClick={() => setIsNotifOpen(false)}
                aria-label="Close notification"
                ref={notifCloseBtnRef}
              >

                &times;
              </button>
            </div>


            <div className="notif-tabs">
              {['class', 'teacher', "student's", 'payment'].map((tab) => (
                <button 
                  key={tab}
                  className={`notif-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="notif-list-container">
              {[...Array(8)].map((_, index) => (
                <div className="notif-item-card" key={index}>
                  <div className="notif-icon-pink-box">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="notif-gear-svg">
                      <path fillRule="evenodd" d="M11.078 2.25c-.424 0-.751.344-.751.766v.163c0 .943-.637 1.74-1.545 1.956a2.417 2.417 0 0 1-1.637-.21l-.146-.084a.75.75 0 0 0-.992.21l-.747 1.295a.75.75 0 0 0 .193.996l.145.084c.801.462 1.157 1.455.836 2.333a2.417 2.417 0 0 1-1.342 1.467h-.168a.75.75 0 0 0-.75.75v1.493c0 .414.336.75.75.75h.168a2.417 2.417 0 0 1 1.342 1.467c.321.878-.035 1.871-.836 2.333l-.145.084a.75.75 0 0 0-.193.996l.747 1.295a.75.75 0 0 0 .992.21l.146-.084a2.417 2.417 0 0 1 1.637-.21c.908.216 1.545 1.013 1.545 1.956v.163c0 .422.327.766.751.766h1.494c.424 0 .751-.344.751-.766v-.163c0-.943.637-1.74 1.545-1.956a2.417 2.417 0 0 1 1.637.21l.146.084a.75.75 0 0 0 .992-.21l.747-1.295a.75.75 0 0 0-.193-.996l-.145-.084a2.417 2.417 0 0 1-.836-2.333 2.417 2.417 0 0 1 1.342-1.467h.168a.75.75 0 0 0 .75-.75v-1.493a.75.75 0 0 0-.75-.75h-.168a2.417 2.417 0 0 1-1.342-1.467c-.321-.878.035-1.871.836-2.333l.145-.084a.75.75 0 0 0 .193-.996l-.747-1.295a.75.75 0 0 0-.992-.21l-.146.084a2.417 2.417 0 0 1-1.637.21c-.908-.216-1.545-1.013-1.545-1.956v-.163a.75.75 0 0 0-.751-.766h-1.494ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="notif-text-content">
                    <p className="notif-message">
                      <strong>Robotic Class</strong> by Mr. Ilham has been finished <span className="notif-hour">(09:00-11:00)</span>
                    </p>
                    <span className="notif-time">2h ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomeAdminContent;