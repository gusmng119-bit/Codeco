import "./Certificate.css";
import certificateImg from "../../assets/certificate.png";


const Certificates = () => {
  const certificates = [
    { className: "Robotic Beginner", instructor: "Mr. Ilham", date: "2024-10-01", image:  certificateImg},
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image:  certificateImg },
    { className: "Robotic Beginner", instructor: "Mr. Ilham", date: "2024-10-01", image:  certificateImg},
    { className: "Robotic Beginner", instructor: "Mr. Ilham", date: "2024-10-01", image:  certificateImg},
  ];

  return (
    <div className="cert-page">
      <header className="cert-header">
        <div className="cert-title-area">
          <h2>My Certificates</h2>
          <p>All achievements you've earned</p>
          <div className="cert-count-badge">10</div>
        </div>
        <div className="search-box-cert">
          <input type="text" placeholder="search" />
          <span className="search-icon">🔍</span>
        </div>
      </header>
      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <div className="cert-card" key={index}>
            <div className="cert-img-wrapper">
              <img src={cert.image} alt="Certificate" />
            </div>
            <div className="cert-info">
              <h3>{cert.className}</h3>
              <p className="instructor">{cert.instructor}</p>
              <div className="cert-date">
               
                {cert.date}
              </div>
              <button className="view-cert-btn">
                <span>View Certificate</span>
                <span className="arrow-icon">❯</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
