import { useState, useEffect } from "react";
import "./Dashboard.css";

import { AiOutlineHome } from "react-icons/ai"; // home
import { BiBook } from "react-icons/bi";       // classroom
import { GiGraduateCap } from "react-icons/gi"; // teacher
import { FaTrophy } from "react-icons/fa";     // certificate

import logo1 from "../../assets/logo1.png";

import Home from "../Home/Home";
import Classroom from "@/features/Classroom/Classroom";
import Teacher from "../Teacher/Teacher";
import Certificate from "../Certificate/Certificate";
import Profile from "../Profile/Profile";
import ClassMaterial from "../Material/Material";
import FeedbackClass from "../Feedback/Feedback";

const Dashboard = ({ setIsLoggedIn }) => {

  /* ================================================= */
  /* ================= DEFAULT CLASS ================= */
  /* ================================================= */

  const defaultClass = {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
    time: "09:00 - 11:00",
    material: "Robot Introduction",
  };

  /* ================================================= */
  /* ================= PAGE ========================== */
  /* ================================================= */

  const [page, setPage] = useState("home");

  /* ================================================= */
  /* ================= FILTER ======================== */
  /* ================================================= */

  const [filter, setFilter] = useState("all");

  const [searchClass, setSearchClass] =
    useState("");

  /* ================================================= */
  /* ================= SELECTED CLASS ================ */
  /* ================================================= */

  const [selectedClass, setSelectedClass] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem("lastClass")
        ) || defaultClass
      );
    });

  /* ================================================= */
  /* ================= JOIN STATE ==================== */
  /* ================================================= */

  const [joined, setJoined] = useState(() => {

    const savedJoin =
      JSON.parse(
        localStorage.getItem("joinedClass")
      ) || {};

    return (
      savedJoin[
        selectedClass?.title
      ] || false
    );
  });

  /* ================================================= */
  /* ================= UPDATE JOIN =================== */
  /* ================================================= */

  useEffect(() => {

    if (!selectedClass) return;

    const savedJoin =
      JSON.parse(
        localStorage.getItem("joinedClass")
      ) || {};

    savedJoin[selectedClass.title] = joined;

    localStorage.setItem(
      "joinedClass",
      JSON.stringify(savedJoin)
    );

  }, [joined, selectedClass]);

  /* ================================================= */
  /* ================= CERTIFICATES ================== */
  /* ================================================= */

  const [certificates, setCertificates] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem("certificates")
        ) || []
      );
    });

  /* ================================================= */
  /* ================= SELECT CLASS ================== */
  /* ================================================= */

  const handleSelectClass = (
    cls,
    targetPage = "home"
  ) => {

    if (!cls) return;

    /* save selected class */
    localStorage.setItem(
      "lastClass",
      JSON.stringify(cls)
    );

    setSelectedClass(cls);

    /* restore join state */
    const savedJoin =
      JSON.parse(
        localStorage.getItem("joinedClass")
      ) || {};

    setJoined(
      savedJoin[cls.title] || false
    );

    setPage(targetPage);
  };

  /* ================================================= */
  /* ================= SAVE CERTIFICATE ============== */
  /* ================================================= */

  const _saveCertificate =  (course) => {

    const oldCertificates =
      JSON.parse(
        localStorage.getItem("certificates")
      ) || [];

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

  /* ================================================= */
  /* ================= LOGOUT ======================== */
  /* ================================================= */

 const _handleLogout =  () => {

    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
  };

  /* ================================================= */
  /* ================= RENDER PAGE =================== */
  /* ================================================= */

  const renderPage = () => {

    switch (page) {

      /* ================= HOME ================= */

      case "home":

        return (

          <Home
            setPage={setPage}

            filter={filter}

            searchClass={searchClass}

            selectedClass={selectedClass}

            joined={joined}

            setJoined={setJoined}

            certificates={certificates}

            setCertificates={setCertificates}
          />
        );

      /* ================= CLASSROOM ================= */

      case "classroom":

        return (

          <Classroom
            filter={filter}

            searchClass={searchClass}

            onFilterChange={setFilter}

            onSearchChange={setSearchClass}

            setPage={setPage}

            setSelectedClass={handleSelectClass}
          />
        );

      /* ================= TEACHER ================= */

      case "teacher":

        return <Teacher />;

      /* ================= CERTIFICATE ================= */

      case "certificate":

        return (

          <Certificate
            certificates={certificates}
          />
        );

      /* ================= PROFILE ================= */

      case "profile":

        return (

          <Profile
            setPage={setPage}
            selectedClass={selectedClass}
          />
        );

      /* ================= MATERIAL ================= */

      case "material":

        return (

          <ClassMaterial
            setPage={setPage}
            selectedClass={selectedClass}
          />
        );

      /* ================= FEEDBACK ================= */

      case "feedback":

        return (

          <FeedbackClass
            setPage={setPage}
            selectedClass={selectedClass}
          />
        );

      /* ================= DEFAULT ================= */

      default:

        return (

          <Home
            setPage={setPage}
            selectedClass={selectedClass}
          />
        );
    }
  };

  /* ================================================= */
  /* ================= UI ============================ */
  /* ================================================= */

  return (

    <div className="dashboard-wrapper">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        {/* ================= LOGO ================= */}

        <div className="logo-section">

          <img
            src={logo1}
            alt="logo"
            className="brand-logo-img-standalone"
          />

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="nav-menu">

  <div
    className={`nav-item ${page === "home" ? "active" : ""}`}
    onClick={() => setPage("home")}
  >
    <AiOutlineHome size={28} className="nav-icon" />
    <span>Home</span>
  </div>

  <div
    className={`nav-item ${page === "classroom" ? "active" : ""}`}
    onClick={() => setPage("classroom")}
  >
    <BiBook size={28} className="nav-icon" />
    <span>Classroom</span>
  </div>

  <div
    className={`nav-item ${page === "teacher" ? "active" : ""}`}
    onClick={() => setPage("teacher")}
  >
    <GiGraduateCap size={28} className="nav-icon" />
    <span>Teacher</span>
  </div>

  <div
    className={`nav-item ${page === "certificate" ? "active" : ""}`}
    onClick={() => setPage("certificate")}
  >
    <FaTrophy size={28} className="nav-icon" />
    <span>Certificate</span>
  </div>

</nav>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="main-area">

        <main className="content-container">

          {renderPage()}

        </main>

      </div>

    </div>
  );
};

export default Dashboard;