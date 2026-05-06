import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

import logo1 from "../../assets/logo1.png";

const Dashboard = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState("");

  // ✅ CLASS YANG DIPILIH
  const [selectedClass] = useState(null);
=======

  /* PAGE CONTROL */
  const [page, setPage] = useState("home");

  /* CLASS FILTER */
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState("");

  /* GLOBAL SELECTED CLASS */
  const [selectedClass, setSelectedClass] = useState(null);
>>>>>>> 94c6236 (fix: resolve husky eslint issues)

  /* GLOBAL JOIN STATUS */
  const [joined, setJoined] = useState(false);

<<<<<<< HEAD
  const currentPage = useMemo(() => {
    const route = location.pathname.replace(/^\/dashboard\/?/, "");
    return route === "" ? "home" : route;
  }, [location.pathname]);

  const setPage = (page) => {
    const path = page === "home" ? "/dashboard" : `/dashboard/${page}`;
    navigate(path);
  };

  const outletContext = {
    setPage,
    selectedClass,
    joined,
    setJoined,
    filter,
    searchClass,
    setFilter,
    setSearchClass,
=======
  /* GLOBAL CERTIFICATE (LOAD FROM LOCAL STORAGE) */
  const [certificates, setCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem("certificates")) || [];
  });

  /* SAVE CERTIFICATE GLOBAL */
  const saveCertificate = (course) => {

    const oldCertificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    const exist = oldCertificates.find(
      (c) => c.className === course.title
    );

    if (exist) {
      alert("Certificate already saved!");
      return;
    }

    const newCertificate = {
      id: Date.now(),
      className: course.title,
      instructor: course.instructor,
      date: new Date().toLocaleDateString(),
      image: course.certificateImg,
    };

    const updatedCertificates = [
      ...oldCertificates,
      newCertificate,
    ];

    localStorage.setItem(
      "certificates",
      JSON.stringify(updatedCertificates)
    );

    setCertificates(updatedCertificates);
  };

  /* PAGE ROUTER */
  const renderPage = () => {
    switch (page) {

      case "home":
        return (
          <Home
            setPage={setPage}
            selectedClass={selectedClass}
            joined={joined}
            setJoined={setJoined}
            saveCertificate={saveCertificate}
          />
        );

      case "classroom":
        return (
          <Classroom
            filter={filter}
            searchClass={searchClass}
            onFilterChange={setFilter}
            onSearchChange={setSearchClass}
            setPage={setPage}
            setSelectedClass={setSelectedClass}
          />
        );

      case "teacher":
        return <Teacher />;

      case "certificate":
        return <Certificate certificates={certificates} />;

      case "profile":
        return <Profile setPage={setPage} />;

      case "material":
        return <ClassMaterial setPage={setPage} />;

      case "feedback":
        return <FeedbackClass setPage={setPage} />;

      default:
        return <Home setPage={setPage} />;
    }
>>>>>>> 94c6236 (fix: resolve husky eslint issues)
  };

  return (
    <div className="dashboard-wrapper">

      <aside className="sidebar">

        <div className="logo-section">
          <img
            src={logo1}
            alt="logo"
            className="brand-logo-img-standalone"
          />
        </div>

        <nav className="nav-menu">

          <div
            className={`nav-item ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            🏠 Home
          </div>

          <div
            className={`nav-item ${currentPage === "classroom" ? "active" : ""}`}
            onClick={() => setPage("classroom")}
          >
            📖 Classroom
          </div>

          <div
            className={`nav-item ${currentPage === "teacher" ? "active" : ""}`}
            onClick={() => setPage("teacher")}
          >
            🎓 Teacher
          </div>

          <div
            className={`nav-item ${currentPage === "certificate" ? "active" : ""}`}
            onClick={() => setPage("certificate")}
          >
            🏆 Certificate
          </div>

        </nav>

      </aside>

      <div className="main-area">
        <main className="content-container">
          <Outlet context={outletContext} />
        </main>
      </div>

    </div>
  );
};

export default Dashboard;