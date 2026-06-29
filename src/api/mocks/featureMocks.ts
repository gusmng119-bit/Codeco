import MockAdapter from "axios-mock-adapter";
import axiosClient from "../core/axiosClient";
import imagecoki from "../../assets/coki.jpg";
import imagesari from "../../assets/Mrs. Sari.jpeg";
import certificateImg from "../../assets/certificate.png";
import type { ClassItem, TeacherItem, CertificateItem, FeedbackItem, MaterialItem, ProfileData } from "../types/features";
import appConfig from "../../config/appConfig";

if (appConfig.USE_LOCAL_FALLBACK) {
  const mock = new MockAdapter(axiosClient, { delayResponse: 300, onNoMatch: "passthrough" });

  const initialClasses: ClassItem[] = [
    {
      id: 1,
      title: "Coding for Kids",
      instructor: "Mr. Samsoro",
      material: "Basic HTML tags and structure",
      date: "2024-10-20",
      time: "13:00 - 15:00",
      type: "yesterday",
    },
    {
      id: 2,
      title: "Lego Class",
      instructor: "Mr. Ilham",
      material: "Robot assembly basics",
      date: "2024-10-21",
      time: "09:00 - 11:00",
      type: "today",
    },
    {
      id: 3,
      title: "Robotic Class",
      instructor: "Mr. Ilham",
      material: "Robotic logic intro",
      date: "2024-10-22",
      time: "10:00 - 12:00",
      type: "upcoming",
    },
    {
      id: 4,
      title: "AI Basics",
      instructor: "Mr. Budi",
      material: "AI fundamentals",
      date: "2024-10-23",
      time: "14:00 - 16:00",
      type: "upcoming",
    },
    {
      id: 5,
      title: "Robotic Class Advance",
      instructor: "Mr. Ilham",
      material: "Advanced robotic logic",
      date: "2024-10-24",
      time: "10:00 - 12:00",
      type: "today",
    },
    {
      id: 6,
      title: "AI Practice",
      instructor: "Mr. Budi",
      material: "Machine learning intro",
      date: "2024-10-25",
      time: "14:00 - 16:00",
      type: "today",
    },
  ];

  const initialTeachers: TeacherItem[] = [
    {
      id: 1,
      name: "Mr. Ilham",
      subject: "Robotic",
      img: imagecoki,
      education: "S1 Teknik Informatika",
      teaching: "Robotic",
      about: "Pak Ilham adalah pengajar Robotic dengan pengalaman pembelajaran berbasis praktik.",
      ig: "IlhamGanteng11",
      yt: "IlhamRobotic",
      linkedin: "linkedin.com/in/ilham",
      tiktok: "@ilhamsirobot",
    },
    {
      id: 2,
      name: "Mrs. Sari",
      subject: "Coding",
      img: imagesari,
      education: "S1 Sistem Informasi",
      teaching: "Programming",
      about: "Ibu Sari fokus pada pembelajaran coding interaktif.",
      ig: "sari_coding",
      yt: "SariCodes",
      linkedin: "linkedin.com/in/sari",
      tiktok: "@saricode",
    },
  ];

  const initialCertificates: CertificateItem[] = [
    {
      id: 1,
      className: "Robotic Class",
      instructor: "Mr. Ilham",
      date: "2024-10-22",
      image: certificateImg,
    },
  ];

  const initialFeedback: FeedbackItem[] = [
    {
      id: 1,
      title: "Introduction to robot components, assembly, and basic programming",
      date: "April 17, 2024",
      progress: "1/5",
      instructor: "Mr. Ilham",
      link: "https://drive.google.com/",
      feedback: "You're doing a great job understanding the basics of robotics. Keep connecting concepts to real-life applications!",
    },
    {
      id: 2,
      title: "Basic Programming for Robots (Sensors and Actuators)",
      date: "April 19, 2024",
      progress: "2/5",
      instructor: "Mr. Ilham",
      link: "https://drive.google.com/",
      feedback: "Nice progress on sensors and actuators. Practice more programs to build confidence.",
    },
    {
      id: 3,
      title: "Robot Movement and Control Systems",
      date: "April 26, 2024",
      progress: "3/5",
      instructor: "Mr. Ilham",
      link: "https://drive.google.com/",
      feedback: "Great work implementing PID controller and movement logic!",
    },
  ];

  const driveLink = "https://drive.google.com/drive/folders/1IfJRHWldYcFOalWyduftC4_mg-Vq7UTF?usp=drive_link";
  const initialMaterials: MaterialItem[] = [
    { id: 1, title: "Introduction to robot components, assembly, and basic programming", date: "April 19, 2026", progress: "1/5", instructor: "Mr. Ilham", link: driveLink },
    { id: 2, title: "Basic Programming for Robots (Using Sensors and Actuators)", date: "April 22, 2026", progress: "2/5", instructor: "Mr. Ilham", link: driveLink },
    { id: 3, title: "Robot Movement and Control Systems", date: "April 26, 2026", progress: "3/5", instructor: "Mr. Ilham", link: driveLink },
    { id: 4, title: "Design and Building Simple Robots", date: "April 30, 2026", progress: "4/5", instructor: "Mr. Ilham", link: driveLink },
    { id: 5, title: "Artificial Intelligence in Robotics", date: "May 4, 2026", progress: "5/5", instructor: "Mr. Ilham", link: driveLink },
  ];

  let currentProfile: ProfileData = {
    firstName: "Budiono",
    lastName: "Putrosono",
    email: "BudionoPutrosono@gmail.com",
    phone: "+628132567999",
    bio: "STIKOM BALI!! \"Always The First\"",
    country: "Indonesia",
    city: "Denpasar",
    streetAddress: "Jl. Tukad Balian No.45",
  };

  // UI FEATURE ENDPOINTS
  mock.onGet("/classes").reply(200, initialClasses);
  mock.onPost("/classes/join").reply(200, { success: true, message: "Successfully joined class!" });
  mock.onGet("/teachers").reply(200, initialTeachers);
  mock.onPost("/teachers/request").reply(200, { success: true, message: "Request sent successfully!" });
  mock.onGet("/certificates").reply(200, initialCertificates);
  mock.onPost("/certificates").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    const newCert: CertificateItem = { id: Date.now(), ...payload };
    initialCertificates.push(newCert);
    return [200, newCert];
  });
  mock.onGet("/feedback").reply(200, initialFeedback);
  mock.onGet("/materials").reply(200, initialMaterials);
  mock.onGet("/profile").reply(200, currentProfile);
  mock.onPut("/profile").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    currentProfile = { ...currentProfile, ...payload };
    return [200, currentProfile];
  });

  // OFFICIAL DOCUMENTED API ENDPOINTS
  mock.onGet("/api/users").reply(200, [
    { id: 1, name: "Student one", email: "studentone@test.com", role: "student", updated_at: "2026-05-14", created_at: "2026-05-14" },
  ]);
  mock.onPost("/api/users").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    if (!payload.email) {
      return [400, { message: "The email has already been taken.", errors: { email: ["The email has already been taken."] } }];
    }
    return [
      200,
      {
        message: "User created successfully",
        data: {
          id: Date.now(),
          name: payload.name || "Student three",
          email: payload.email || "studentthree@test.com",
          role: payload.role || "student",
          updated_at: "2026-05-14",
          created_at: "2026-05-14",
        },
      },
    ];
  });
  mock.onPut("/api/users").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    return [200, { message: "User updated successfully", data: { id: 1, name: "Updated User", email: "updated@test.com", role: "student", updated_at: "2026-05-14", created_at: "2026-05-14", ...payload } }];
  });
  mock.onDelete("/api/users").reply(200, { message: "User deleted successfully" });

  mock.onGet("/api/classes").reply(200, [
    { id: 1, name: "STEAM", total_sessions: 2, price: 500000 },
  ]);
  mock.onPost("/api/classes").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    if (!payload.price) {
      return [400, { message: "The price field is required.", errors: { price: ["The price field is required."] } }];
    }
    return [
      200,
      {
        message: "Class created successfully",
        data: {
          id: Date.now(),
          name: payload.name || "STEAM",
          total_sessions: payload.total_sessions || 2,
          price: payload.price || 500000,
          updated_at: "2026-05-14 ",
          created_at: "2026-05-14",
        },
      },
    ];
  });
  mock.onPut("/api/classes").reply(200, { message: "Class updated successfully", data: { id: 1, name: "Updated Class", total_sessions: 3, price: 600000 } });
  mock.onDelete("/api/classes").reply(200, { message: "Class deleted successfully" });

  mock.onGet("/api/sessions").reply(200, [
    {
      id: 1,
      class_id: 6,
      teacher_id: 1,
      start_time: "2026-05-10 10:00:00",
      end_time: "2026-05-10 12:00:00",
      status: "scheduled",
      created_at: "2026-05-14T05:40:00.000000Z",
      updated_at: "2026-05-14T05:40:00.000000Z",
    },
  ]);
  mock.onPut("/api/sessions").reply(200, {
    id: 1,
    class_id: 6,
    teacher_id: 1,
    start_time: "2026-05-15 10:00:00",
    end_time: "2026-05-15 12:00:00",
    status: "scheduled",
    created_at: "2026-05-14T05:40:00.000000Z",
    updated_at: "2026-05-14T05:40:00.000000Z",
  });
  mock.onDelete("/api/sessions").reply(200, { message: "Session deleted successfully" });
  mock.onPost("/api/generate-sessions").reply(200, { message: "Session generated", class_id: 6 });
  mock.onPost("/api/sessions/complete").reply(200, { message: "Session completed successfully" });

  mock.onGet("/api/feedback").reply(200, [
    {
      id: 1,
      class_session_id: 1,
      student_id: 1,
      teacher_id: 1,
      rating: 5,
      comment: "The session was very helpful.",
      submitted_at: "2026-05-14T05:50:00.000000Z",
    },
  ]);
  mock.onPost("/api/feedback").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    return [
      200,
      {
        message: "Feedback submitted successfully",
        data: {
          id: Date.now(),
          class_session_id: payload.class_session_id || 1,
          student_id: payload.student_id || 1,
          teacher_id: payload.teacher_id || 1,
          rating: payload.rating || 5,
          comment: payload.comment || "The session was very helpful.",
          submitted_at: "2026-05-14T05:50:00.000000Z",
        },
      },
    ];
  });

  mock.onPost("/api/attendance").reply((config) => {
    const payload = JSON.parse(config.data || "{}");
    return [
      200,
      {
        message: "Attendance marked successfully",
        data: {
          id: Date.now(),
          class_session_id: payload.class_session_id || 1,
          student_id: payload.student_id || 1,
          status: payload.status || "present",
          created_at: "2026-05-14T06:00:00.000000Z",
          updated_at: "2026-05-14T06:00:00.000000Z",
        },
      },
    ];
  });
}
