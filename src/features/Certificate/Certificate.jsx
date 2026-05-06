import { useState } from "react";
import "./Certificate.css";

const Certificates = () => {

  /* ================= LOAD DATA ================= */
  const [certificates] = useState(() => {
    return JSON.parse(localStorage.getItem("certificates")) || [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  /* MODAL STATE */
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* ================= SEARCH ================= */
  const filteredCertificates = certificates.filter((cert) =>
    cert.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* OPEN MODAL */
  const handleViewCertificate = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  /* CLOSE MODAL */
  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  /* DOWNLOAD */
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedCert.image;
    link.download = "certificate.png";
    link.click();
  };

  return (
    <div className="cert-page">

      {/* HEADER */}
      <header className="cert-header">

        <div className="cert-title-area">
          <h2>My Certificates</h2>
          <p>All achievements you've earned</p>

          <div className="cert-count-badge">
            {filteredCertificates.length}
          </div>
        </div>

        <div className="search-box-cert">
          <input
            type="text"
            placeholder="search certificate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

      </header>

      {/* GRID */}
      <div className="cert-grid">
        {filteredCertificates.length === 0 ? (
          <p>No certificate yet</p>
        ) : (
          filteredCertificates.map((cert, index) => (
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

                <button
                  className="view-cert-btn"
                  onClick={() => handleViewCertificate(cert)}
                >
                  <span>View Certificate</span>
                  <span className="arrow-icon">❯</span>
                </button>

              </div>

            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && selectedCert && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div
            className="cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>✕</button>

            <img
              src={selectedCert.image}
              alt="Certificate Preview"
              className="modal-cert-img"
            />

            <div className="modal-cert-info">
              <h3>{selectedCert.className}</h3>
              <p>{selectedCert.date}</p>
            </div>

            <button className="download-btn" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Certificates;