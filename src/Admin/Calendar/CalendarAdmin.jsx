import React from "react";
import "./CalendarAdmin.css";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";

const CalendarAdmin = () => {
  // Rentang waktu di sisi kiri (7 AM sampai 5 PM)
  const timeSlots = [
    "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", 
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"
  ];

  // Data hari & tanggal horizontal sesuai gambar mockup
  const daysHeader = [
    { day: "SUN", date: 21 },
    { day: "MON", date: 22 },
    { day: "TUE", date: 23 },
    { day: "WED", date: 24 },
    { day: "THU", date: 25 },
    { day: "FRI", date: 26 },
    { day: "SAT", date: 27 },
  ];

  return (
    <div className="calendar-page-container">
      {/* KONTROL NAVIGASI BULAN & TAHUN */}
      <div className="calendar-filters-top">
        <div className="dropdown-selectors">
          <select className="cal-select" defaultValue="April">
            <option value="April">April</option>
          </select>
          <select className="cal-select" defaultValue="2026">
            <option value="2026">2026</option>
          </select>
        </div>

        <div className="calendar-navigation-title">
          <span className="current-month-text">April 2026</span>
          <div className="nav-arrow-buttons">
            <button className="arrow-btn"><ChevronLeft size={16} /></button>
            <button className="arrow-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* BLOK KALENDER UTAMA */}
      <div className="calendar-grid-card">
        
        {/* Row 1: Header Nama Hari & Tanggal (Horizontal Grid) */}
        <div className="calendar-grid-header">
          <div className="time-column-header"></div> {/* Sel pojok kiri kosong */}
          {daysHeader.map((item, idx) => (
            <div key={idx} className="day-header-cell">
              <span className="day-name">{item.day}</span>
              <span className="day-date">{item.date}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Grid Waktu & Isi Event */}
        <div className="calendar-grid-body">
          {timeSlots.map((time, timeIdx) => (
            <div key={timeIdx} className="calendar-time-row">
              
              {/* Kolom Petunjuk Jam */}
              <div className="time-label-cell">{time}</div>

              {/* Grid 7 Hari untuk Jam Terkait */}
              <div className="days-slots-row">
                {daysHeader.map((_, dayIdx) => {
                  
                  // 1. SUN, 10:00 AM -> Robotic
                  if (time === "10 AM" && dayIdx === 0) {
                    return (
                      <div key={dayIdx} className="event-slot-cell text-left-accent">
                        <div className="event-card-item blue-schedule-card">
                          <div className="event-card-time-row">
                            <span>10:00 AM</span>
                            <Video size={12} className="video-icon-style" />
                          </div>
                          <span className="event-subject-only">Robotic</span>
                        </div>
                      </div>
                    );
                  }

                  // 2. MON, 08:00 AM -> Mr Ilham Robotic
                  if (time === "8 AM" && dayIdx === 1) {
                    return (
                      <div key={dayIdx} className="event-slot-cell text-left-accent">
                        <div className="event-card-item blue-schedule-card">
                          <div className="event-card-time-row">
                            <span>08:00 AM</span>
                            <Video size={12} className="video-icon-style" />
                          </div>
                          <span className="event-teacher">Mr Ilham</span>
                          <span className="event-subject">Robotic</span>
                        </div>
                      </div>
                    );
                  }

                  // 3. TUE, 11:00 AM -> Mr Ilham Robotic
                  if (time === "11 AM" && dayIdx === 2) {
                    return (
                      <div key={dayIdx} className="event-slot-cell text-left-accent">
                        <div className="event-card-item blue-schedule-card">
                          <div className="event-card-time-row">
                            <span>11:00 AM</span>
                            <Video size={12} className="video-icon-style" />
                          </div>
                          <span className="event-teacher">Mr Ilham</span>
                          <span className="event-subject">Robotic</span>
                        </div>
                      </div>
                    );
                  }

                  // 4. FRI, 11:00 AM -> Mr Rio Desain
                  if (time === "11 AM" && dayIdx === 5) {
                    return (
                      <div key={dayIdx} className="event-slot-cell text-left-accent">
                        <div className="event-card-item purple-schedule-card">
                          <div className="event-card-time-row">
                            <span>11:00 AM</span>
                            <Video size={12} className="video-icon-style" />
                          </div>
                          <span className="event-teacher">Mr Rio</span>
                          <span className="event-subject">Desain</span>
                        </div>
                      </div>
                    );
                  }

                  // 5. FRI, 1:00 PM -> Mr Ilham Programing
                  if (time === "1 PM" && dayIdx === 5) {
                    return (
                      <div key={dayIdx} className="event-slot-cell text-left-accent">
                        <div className="event-card-item red-schedule-card">
                          <div className="event-card-time-row">
                            <span>1:00 PM</span>
                            <Video size={12} className="video-icon-style" />
                          </div>
                          <span className="event-teacher">Mr Ilham</span>
                          <span className="event-subject">Programing</span>
                        </div>
                      </div>
                    );
                  }

                  // 6. FRI, 3:00 PM -> Mr Faisal Science
                  if (time === "3 PM" && dayIdx === 5) {
                    return (
                      <div key={dayIdx} className="event-slot-cell text-left-accent">
                        <div className="event-card-item orange-schedule-card">
                          <div className="event-card-time-row">
                            <span>3:00 PM</span>
                            <Video size={12} className="video-icon-style" />
                          </div>
                          <span className="event-teacher">Mr Faisal</span>
                          <span className="event-subject">Science</span>
                        </div>
                      </div>
                    );
                  }

                  // Box kosong default dengan border grid tipis
                  return <div key={dayIdx} className="event-slot-cell"></div>;
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CalendarAdmin;