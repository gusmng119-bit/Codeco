import React, { useEffect } from "react";
import "./CalendarTeacher.css";
import useTeacherCalendarStore from "@/store/teacherCalendarStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";

const ChevronLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const VideoIcon    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>;

const days = [
  { name: "SUN", number: 21, isHighlighted: false },
  { name: "MON", number: 22, isHighlighted: false },
  { name: "TUE", number: 23, isHighlighted: false },
  { name: "WED", number: 24, isHighlighted: false },
  { name: "THU", number: 25, isHighlighted: true },
  { name: "FRI", number: 26, isHighlighted: false },
  { name: "SAT", number: 27, isHighlighted: false },
];

const timeSlots = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

const CalendarTeacher = () => {
  const { events, loading, error, fetchEvents } = useTeacherCalendarStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="calendar-page">
      {/* HEADER CONTROLS */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <select className="calendar-dropdown" defaultValue="April"><option value="April">April</option></select>
        <select className="calendar-dropdown" defaultValue="2026"><option value="2026">2026</option></select>
        <div style={{ display: "flex", gap: "6px", marginLeft: "8px" }}>
          <button className="nav-btn"><ChevronLeft /></button>
          <button className="nav-btn"><ChevronRight /></button>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "24px" }}>
        April 2026
      </div>

      {/* STATES */}
      {loading && (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          <p>Loading calendar...</p>
        </div>
      )}

      {!loading && error && (
        <ErrorState title="Unable to load calendar" message={error} onRetry={fetchEvents} />
      )}

      {!loading && !error && events.length === 0 && (
        <EmptyState title="No Events" message="Belum ada jadwal di minggu ini." icon="📅" />
      )}

      {/* GRID */}
      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "70px repeat(7, 1fr)", borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
          <div style={{ borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", height: "70px" }}></div>

          {days.map((day, index) => (
            <div
              key={index}
              style={{ padding: "12px 16px", borderRight: index === 6 ? "none" : "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", backgroundColor: day.isHighlighted ? "#f0f7ff" : "#ffffff", minHeight: "70px", boxSizing: "border-box" }}
            >
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", marginBottom: "4px" }}>{day.name}</div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", lineHeight: "1" }}>{day.number}</div>
            </div>
          ))}

          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              <div style={{ fontSize: "11px", fontWeight: "600", color: "#94a3b8", textAlign: "right", paddingRight: "12px", height: "85px", boxSizing: "border-box", position: "relative", top: "-6px" }}>
                {time}
              </div>
              {days.map((day, dayIdx) => {
                const found = events.find((e) => e.time === time && e.dayIndex === dayIdx);
                return (
                  <div
                    key={dayIdx}
                    style={{ height: "85px", borderRight: dayIdx === 6 ? "none" : "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", backgroundColor: day.isHighlighted ? "#f0f7ff" : "transparent", position: "relative", boxSizing: "border-box" }}
                  >
                    {found && (
                      <div className={`event-card event-${found.type}`}>
                        <div className="event-time-row">
                          <span>{found.displayTime}</span>
                          <VideoIcon />
                        </div>
                        <div className="event-teacher">{found.teacher}</div>
                        <div className="event-subject">{found.subject}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarTeacher;
