import { useState, useMemo } from "react";
import "./Material.css";

import logo2 from "@/assets/logo2.jpg";
import driveLogo from "@/assets/drive.png";
import useClassroomStore from "../../store/classroomStore";

type MaterialItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  progress: string;
  instructor: string;
  duration: string;
  materialType: string;
  link: string;
};

const BookIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    <path d="M8 6h8" />
    <path d="M8 10h8" />
  </svg>
);

const ClassMaterial = () => {
  const { selectedClass } = useClassroomStore();
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);

  const currentClass = selectedClass || {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  const driveLink =
    "https://drive.google.com/drive/folders/1IfJRHWldYcFOalWyduftC4_mg-Vq7UTF?usp=drive_link";

  const materialData = useMemo<Record<string, MaterialItem[]>>(
    () => ({
      "Robotic Class": [
        {
          id: 1,
          title: "Introduction to Robot Components",
          description:
            "Learn robot hardware, sensors, motors, and controller basics. Siswa akan mengenal komponen dasar robot mulai dari microcontroller, motor DC, hingga sensor ultrasonik.",
          date: "April 19, 2026",
          progress: "1/5",
          instructor: "Mr. Ilham",
          duration: "90 menit",
          materialType: "Video + PDF",
          link: driveLink,
        },
        {
          id: 2,
          title: "Basic Programming for Robots",
          description:
            "Understanding robot logic, movement commands, and automation. Membahas dasar pemrograman Arduino IDE untuk mengontrol pergerakan motor robot.",
          date: "April 22, 2026",
          progress: "2/5",
          instructor: "Mr. Ilham",
          duration: "120 menit",
          materialType: "PPT + Kode Program",
          link: driveLink,
        },
        {
          id: 3,
          title: "Robot Movement and Control Systems",
          description:
            "Learn robot movement calibration and control systems. Praktik kalibrasi roda, sensor gyro, dan sistem kendali PID sederhana.",
          date: "April 25, 2026",
          progress: "3/5",
          instructor: "Mr. Ilham",
          duration: "100 menit",
          materialType: "Video + Modul",
          link: driveLink,
        },
        {
          id: 4,
          title: "Robot Design and Construction",
          description:
            "Calibrating and designing robot chassis and frame mechanisms. Siswa merancang bentuk chassis menggunakan software CAD sederhana.",
          date: "April 28, 2026",
          progress: "4/5",
          instructor: "Mr. Ilham",
          duration: "110 menit",
          materialType: "PDF + File CAD",
          link: driveLink,
        },
        {
          id: 5,
          title: "Robotics Project Presentation",
          description:
            "Showcasing and testing your completed robotics automation projects. Sesi presentasi hasil akhir proyek robot otomatis.",
          date: "May 2, 2026",
          progress: "5/5",
          instructor: "Mr. Ilham",
          duration: "150 menit",
          materialType: "Video Presentasi",
          link: driveLink,
        },
      ],
      "Coding Class": [
        {
          id: 1,
          title: "Pengenalan Dasar Pemrograman",
          description:
            "Mengenal konsep variabel, tipe data, dan struktur kontrol dasar dalam pemrograman menggunakan Python.",
          date: "April 20, 2026",
          progress: "1/6",
          instructor: "Ms. Sarah",
          duration: "90 menit",
          materialType: "Video + PDF",
          link: driveLink,
        },
        {
          id: 2,
          title: "Fungsi dan Looping",
          description:
            "Mempelajari cara membuat fungsi, perulangan for & while, serta studi kasus sederhana.",
          date: "April 23, 2026",
          progress: "2/6",
          instructor: "Ms. Sarah",
          duration: "100 menit",
          materialType: "PPT + Kode Program",
          link: driveLink,
        },
        {
          id: 3,
          title: "Struktur Data Dasar",
          description:
            "List, dictionary, dan tuple — bagaimana menyimpan dan mengolah data secara efisien.",
          date: "April 26, 2026",
          progress: "3/6",
          instructor: "Ms. Sarah",
          duration: "95 menit",
          materialType: "PDF + Modul",
          link: driveLink,
        },
        {
          id: 4,
          title: "Membangun Mini Project",
          description:
            "Siswa membangun aplikasi sederhana (kalkulator/to-do list) menggunakan konsep yang sudah dipelajari.",
          date: "April 29, 2026",
          progress: "4/6",
          instructor: "Ms. Sarah",
          duration: "130 menit",
          materialType: "Video + Source Code",
          link: driveLink,
        },
      ],
      "Design Class": [
        {
          id: 1,
          title: "Prinsip Dasar Desain Grafis",
          description:
            "Memahami elemen desain: warna, tipografi, layout, dan komposisi visual yang efektif.",
          date: "April 21, 2026",
          progress: "1/4",
          instructor: "Mr. Budi",
          duration: "80 menit",
          materialType: "PDF + Video",
          link: driveLink,
        },
        {
          id: 2,
          title: "Pengenalan Figma untuk UI/UX",
          description:
            "Praktik langsung membuat wireframe dan prototipe sederhana menggunakan Figma.",
          date: "April 24, 2026",
          progress: "2/4",
          instructor: "Mr. Budi",
          duration: "120 menit",
          materialType: "Video Tutorial",
          link: driveLink,
        },
      ],
    }),
    []
  );

  const materials = materialData[currentClass.title] || [];

  return (
    <div className="material-page">
      <div className="material-header-banner">
        <div className="header-content">
          <h1>{currentClass.title}</h1>
          <p>{currentClass.instructor}</p>
        </div>
        <div className="header-robot-img">
          <img src={logo2} alt="Robot" />
        </div>
      </div>

      <h2 className="section-title">Materi Pembelajaran</h2>

      <div className="material-list">
        {materials.map((m) => (
          <div
            key={m.id}
            className={`material-item-card clickable ${
              selectedMaterial?.id === m.id ? "selected-topic" : ""
            }`}
            onClick={() => setSelectedMaterial(m)}
          >
            <div className="icon-wrapper">
              <BookIcon />
            </div>

            <div className="material-info">
              <div className="feedback-card-header">
                <h3>{m.title}</h3>
                <span className="feedback-date">{m.date}</span>
              </div>
              <p>
                Instructor: {m.instructor} • {m.progress} • {m.duration}
              </p>
            </div>
          </div>
        ))}

        {materials.length === 0 && (
          <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>
            Belum ada materi untuk kelas ini.
          </p>
        )}
      </div>

      {selectedMaterial && (
        <div className="material-detail-card">
          <button className="close-btn" onClick={() => setSelectedMaterial(null)} type="button">
            ✕
          </button>

          <div className="detail-header">
            <div className="icon-circle">
              <BookIcon />
            </div>
            <div>
              <h3>{selectedMaterial.title}</h3>
              <p>
                {selectedMaterial.date} • {selectedMaterial.progress} •{" "}
                {selectedMaterial.materialType}
              </p>
            </div>
          </div>

          <div className="material-desc">
            <h4>Description:</h4>
            <p>{selectedMaterial.description}</p>
          </div>

          <a
            href={selectedMaterial.link}
            target="_blank"
            rel="noopener noreferrer"
            className="drive-box clickable"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img src={driveLogo} alt="Google Drive" />
              <div>
                <h4>Google Drive</h4>
                <p>PDF, PPT, VIDEO & DOCX</p>
              </div>
            </div>
            <span style={{ fontWeight: "600", color: "#4285f4" }}>Download →</span>
          </a>
        </div>
      )}

      {!selectedMaterial && (
        <div
          className="select-prompt-box"
          style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}
        >
          <p>Pilih salah satu topik di sebelah kiri untuk melihat detail materi.</p>
        </div>
      )}
    </div>
  );
};

export default ClassMaterial;