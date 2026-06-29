import { useEffect } from "react";
import "./Material.css";
import logo2 from "../../assets/logo2.jpg";
import driveLogo from "../../assets/drive.png";
import useMaterialStore from "../../store/materialStore";

const ClassMaterial = () => {
  const {
    materials,
    selectedMaterial,
    loading,
    setSelectedMaterial,
    fetchMaterials,
  } = useMaterialStore();

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  /* ================= DETAIL MATERIAL ================= */
  if (selectedMaterial !== null) {
    return (
      <div className="material-page">
        <div className="material-detail-card">
          {/* CLOSE BUTTON */}
          <button
            className="close-btn"
            onClick={() => setSelectedMaterial(null)}
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="detail-header">
            <div className="icon-circle">📄</div>

            <div>
              <h2>{selectedMaterial.title}</h2>
              <p>
                {selectedMaterial.instructor} • {selectedMaterial.date}
              </p>
            </div>
          </div>

          <hr />

          <p className="material-desc">Please study this material</p>

          {/* GOOGLE DRIVE CARD */}
          <a
            href={selectedMaterial.link}
            target="_blank"
            rel="noreferrer"
            className="drive-box"
          >
            <div>
              <h3>File Drive</h3>
              <p>{selectedMaterial.link}</p>
            </div>

            <img src={driveLogo} alt="Drive" />
          </a>
        </div>
      </div>
    );
  }

  /* ================= LIST MATERIAL ================= */
  return (
    <div className="material-page">
      {/* HEADER */}
      <div className="material-header-banner">
        <div className="header-content">
          <h1>Robotic Class</h1>
          <p>Mr. Ilham</p>
        </div>

        <div className="header-robot-img">
          <img src={logo2} alt="Robot Mascot" />
        </div>
      </div>

      <h2 className="section-title">Materials</h2>

      {/* CARD LIST */}
      <div className="material-list">
        {loading && <p>Loading materials...</p>}

        {!loading &&
          materials.map((item) => (
            <div
              key={item.id}
              className="material-item-card clickable"
              onClick={() => setSelectedMaterial(item)}
            >
              <div className="icon-wrapper">📖</div>

              <div className="material-info">
                <h3>
                  {item.title} ({item.progress})
                </h3>
                <p>{item.date}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClassMaterial;
