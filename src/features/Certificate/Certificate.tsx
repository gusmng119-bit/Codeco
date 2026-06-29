import { useEffect } from "react";
import "./Certificate.css";
import useCertificateStore from "../../store/certificateStore";
import type { CertificateItem } from "../../api/types/features";

const Certificates = () => {
  const {
    certificates,
    searchTerm,
    selectedCert,
    showModal,
    loading,
    setSearchTerm,
    setSelectedCert,
    setShowModal,
    fetchCertificates,
  } = useCertificateStore();

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCertificate = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  const handleDownload = () => {
    if (!selectedCert) return;
    const link = document.createElement("a");
    link.href = selectedCert.image;
    link.download = `${selectedCert.className}-certificate.png`;
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
        {loading && <p>Loading certificates...</p>}

        {!loading && filteredCertificates.length === 0 ? (
          <p>No certificate yet</p>
        ) : (
          !loading &&
          filteredCertificates.map((cert, index) => (
            <div className="cert-card" key={`${cert.id}-${index}`}>
              <div className="cert-img-wrapper">
                <img src={cert.image} alt="Certificate" />
              </div>

              <div className="cert-info">
                <h3>{cert.className}</h3>
                <p className="instructor">{cert.instructor}</p>

                <div className="cert-date">{cert.date}</div>

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
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

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
