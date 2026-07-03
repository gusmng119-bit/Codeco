import React, { useEffect, useMemo, useState } from "react";
import "./CalendarTeacher.css";
import useTeacherCalendarStore from "@/store/teacherCalendarStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";

type EventType = "robotic" | "desain" | "programing" | "science" | string;
type ClassMode = "online" | "offline";

interface CalendarEvent {
  time: string;
  dayIndex: number;
  displayTime: string;
  teacher: string;
  subject: string;
  type: EventType;
  className?: string;
  description?: string;
  date?: string;
  timeRange?: string;
  mode?: ClassMode;
  locked?: boolean;
}

interface DayInfo {
  name: string;
  number: number;
  isHighlighted: boolean;
}

interface SelectedSlot {
  day: DayInfo;
  time: string;
}

interface TeacherCalendarStore {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => void;
}

const ChevronLeft: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const VideoIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </svg>
);

const days: DayInfo[] = [
  { name: "SUN", number: 21, isHighlighted: false },
  { name: "MON", number: 22, isHighlighted: false },
  { name: "TUE", number: 23, isHighlighted: false },
  { name: "WED", number: 24, isHighlighted: false },
  { name: "THU", number: 25, isHighlighted: true },
  { name: "FRI", number: 26, isHighlighted: false },
  { name: "SAT", number: 27, isHighlighted: false },
];

const timeSlots: string[] = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const yearOptions = [2025, 2026, 2027];

const getLastDay = (month: number, year: number): number => new Date(year, month, 0).getDate();

const formatDate = (day: number, month: number, year: number): string =>
  `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;

const slotKey = (dayIndex: number, time: string): string => `${dayIndex}-${time}`;

const CalendarTeacher: React.FC = () => {
  const { events, loading, error, fetchEvents } = useTeacherCalendarStore() as TeacherCalendarStore;

  // Edits made locally to events that came from the server (keyed by dayIndex-time)
  const [localEdits, setLocalEdits] = useState<Record<string, CalendarEvent>>({});
  // Brand new events created via the "availability" modal, not yet part of `events`
  const [localNewEvents, setLocalNewEvents] = useState<CalendarEvent[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [slotMode, setSlotMode] = useState<ClassMode>("offline");

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | "">("");
  const [selectedMonth, setSelectedMonth] = useState(4);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedTime, setSelectedTime] = useState("");

  const [editTeacherName, setEditTeacherName] = useState("");
  const [editClassName, setEditClassName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editMode, setEditMode] = useState<ClassMode>("offline");

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Merge server events + local edits + local new events, purely derived (no setState-in-effect).
  const visibleEvents = useMemo(() => {
    const merged = events.map((e) => {
      const override = localEdits[slotKey(e.dayIndex, e.time)];
      return override || e;
    });
    return [...merged, ...localNewEvents];
  }, [events, localEdits, localNewEvents]);

  const handleEventClick = (event: CalendarEvent): void => {
    setSelectedEvent(event);
    setEditTeacherName(event.teacher && event.teacher !== "-" ? event.teacher : "");
    setEditClassName(event.className || event.subject || "");
    setEditDescription(event.description || "");
    setEditMode(event.mode || "offline");
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveClassInfo = (): void => {
    if (!selectedEvent) return;

    const updatedEvent: CalendarEvent = {
      ...selectedEvent,
      teacher: editTeacherName || "-",
      className: editClassName,
      subject: editClassName || selectedEvent.subject,
      description: editDescription,
      mode: editMode,
      locked: true,
    };

    const key = slotKey(selectedEvent.dayIndex, selectedEvent.time);
    const isNewEvent = localNewEvents.some((e) => slotKey(e.dayIndex, e.time) === key);

    if (isNewEvent) {
      setLocalNewEvents((prev) =>
        prev.map((e) => (slotKey(e.dayIndex, e.time) === key ? updatedEvent : e))
      );
    } else {
      setLocalEdits((prev) => ({ ...prev, [key]: updatedEvent }));
    }

    setSelectedEvent(updatedEvent);
  };

  const handleEmptySlotClick = (day: DayInfo, time: string): void => {
    setSelectedSlot({ day, time });
    setTeacherName("");
    setClassName("");
    setDescription("");
    setSlotMode("offline");
    setSelectedDay(day.number);
    setSelectedMonth(4);
    setSelectedYear(2026);
    setSelectedTime("");
    setDatePickerOpen(false);
    setIsAvailabilityModalOpen(true);
  };

  const handleCloseAvailabilityModal = (): void => {
    setIsAvailabilityModalOpen(false);
    setSelectedSlot(null);
    setSelectedDay("");
    setSelectedTime("");
    setDatePickerOpen(false);
  };

  const handleSubmitAvailability = (): void => {
    if (!selectedSlot || !selectedDay || !selectedTime) return;

    const newEvent: CalendarEvent = {
      time: selectedSlot.time,
      dayIndex: days.findIndex((d) => d.number === selectedDay),
      displayTime: selectedTime,
      teacher: teacherName || "-",
      subject: className || "-",
      type: "science",
      className,
      description,
      date: formatDate(selectedDay, selectedMonth, selectedYear),
      timeRange: selectedTime,
      mode: slotMode,
      locked: false,
    };

    setLocalNewEvents((prev) => [...prev, newEvent]);
    handleCloseAvailabilityModal();
  };

  const availableDays = useMemo(() => {
    const lastDay = getLastDay(selectedMonth, selectedYear);
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  }, [selectedMonth, selectedYear]);

  const selectedDateText = selectedDay ? formatDate(selectedDay, selectedMonth, selectedYear) : "Select date";

  return (
    <div className="calendar-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <select className="calendar-dropdown" defaultValue="April">
            <option value="April">April</option>
          </select>
          <select className="calendar-dropdown" defaultValue="2026">
            <option value="2026">2026</option>
          </select>
        </div>
        <button type="button" className="availability-btn">
          <PlusIcon />
          availability
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>April - Mei 2026</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button className="nav-btn">
            <ChevronLeft />
          </button>
          <button className="nav-btn">
            <ChevronRight />
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          <p>Loading calendar...</p>
        </div>
      )}

      {!loading && error && <ErrorState title="Unable to load calendar" message={error} onRetry={fetchEvents} />}

      {!loading && !error && visibleEvents.length === 0 && <EmptyState title="No Events" message="Belum ada jadwal di minggu ini." icon="📅" />}

      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "70px repeat(7, 1fr)", borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
          <div style={{ borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", height: "70px" }} />
          {days.map((day, index) => (
            <div
              key={index}
              style={{
                padding: "12px 16px",
                borderRight: index === 6 ? "none" : "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: day.isHighlighted ? "#f0f7ff" : "#ffffff",
                minHeight: "70px",
                boxSizing: "border-box",
              }}
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
                const found = visibleEvents.find((e) => e.time === time && e.dayIndex === dayIdx);

                return (
                  <div
                    key={dayIdx}
                    style={{
                      height: "85px",
                      borderRight: dayIdx === 6 ? "none" : "1px solid #f1f5f9",
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor: day.isHighlighted ? "#f0f7ff" : "transparent",
                      position: "relative",
                      boxSizing: "border-box",
                      cursor: found ? "default" : "pointer",
                    }}
                    onClick={() => {
                      if (!found) handleEmptySlotClick(day, time);
                    }}
                  >
                    {found && (
                      <div
                        className={`event-card event-${found.type}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(found);
                        }}
                      >
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

      {isModalOpen && selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "relative", overflow: "visible" }}>
            <div className="modal-header">
              <h2 className="modal-title">Class Information</h2>
              <button type="button" className="modal-close" onClick={handleCloseModal}>
                <CloseIcon />
              </button>
            </div>

            {selectedEvent.locked ? (
              <>
                <div className="form-group">
                  <label className="form-label">Teacher Name</label>
                  <div className="form-display">{selectedEvent.teacher || "-"}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Class Name</label>
                  <div className="form-display">{selectedEvent.className || selectedEvent.subject}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <div className="form-display">{selectedEvent.description || "-"}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <div className="form-display">{selectedEvent.timeRange || selectedEvent.displayTime}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="form-display">{selectedEvent.date || "-"}</div>
                </div>
                <div className="radio-group">
                  <label className="radio-option">
                    <span className={`radio-dot ${selectedEvent.mode === "online" ? "radio-dot-active" : ""}`} />
                    Online
                  </label>
                  <label className="radio-option">
                    <span className={`radio-dot ${selectedEvent.mode !== "online" ? "radio-dot-active" : ""}`} />
                    Offline
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                    close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Teacher Name</label>
                  <input type="text" className="form-input" value={editTeacherName} onChange={(e) => setEditTeacherName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Class Name</label>
                  <input type="text" className="form-input" value={editClassName} onChange={(e) => setEditClassName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={4} />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <div className="form-display">{selectedEvent.timeRange || selectedEvent.displayTime}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="form-display">{selectedEvent.date || "-"}</div>
                </div>
                <div className="radio-group">
                  <label className="radio-option" onClick={() => setEditMode("online")}>
                    <span className={`radio-dot ${editMode === "online" ? "radio-dot-active" : ""}`} />
                    Online
                  </label>
                  <label className="radio-option" onClick={() => setEditMode("offline")}>
                    <span className={`radio-dot ${editMode !== "online" ? "radio-dot-active" : ""}`} />
                    Offline
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                    cancel
                  </button>
                  <button type="button" className="btn-available" onClick={handleSaveClassInfo}>
                    save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isAvailabilityModalOpen && selectedSlot && (
        <div className="modal-overlay" onClick={handleCloseAvailabilityModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "relative", overflow: "visible" }}>
            <div className="modal-header">
              <h2 className="modal-title">Date Availability</h2>
              <button type="button" className="modal-close" onClick={handleCloseAvailabilityModal}>
                <CloseIcon />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Teacher Name</label>
              <input type="text" className="form-input" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Class Name</label>
              <input type="text" className="form-input" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label className="form-label">Date</label>
              <button
                type="button"
                className="form-input"
                onClick={() => setDatePickerOpen((prev) => !prev)}
                style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: "#fff" }}
              >
                <span style={{ color: selectedDay ? "#0f172a" : "#94a3b8" }}>{selectedDateText}</span>
                <CalendarIcon />
              </button>

              {datePickerOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50, width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)", padding: "12px" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                    <select className="form-input" value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                      {monthOptions.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <select className="form-input" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                    {["S", "M", "T", "W", "T", "F", "S"].map((label) => (
                      <div key={label} style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>
                        {label}
                      </div>
                    ))}

                    {Array.from({ length: new Date(selectedYear, selectedMonth - 1, 1).getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {availableDays.map((day) => {
                      const active = selectedDay === day;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            setSelectedDay(day);
                            setDatePickerOpen(false);
                          }}
                          style={{ height: "32px", borderRadius: "8px", border: active ? "1px solid #2563eb" : "1px solid #e2e8f0", background: active ? "#dbeafe" : "#fff", color: "#0f172a", fontSize: "12px", cursor: "pointer" }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input type="text" className="form-input" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
            </div>

            <div className="radio-group">
              <label className="radio-option" onClick={() => setSlotMode("online")}>
                <span className={`radio-dot ${slotMode === "online" ? "radio-dot-active" : ""}`} />
                Online
              </label>
              <label className="radio-option" onClick={() => setSlotMode("offline")}>
                <span className={`radio-dot ${slotMode !== "online" ? "radio-dot-active" : ""}`} />
                Offline
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleCloseAvailabilityModal}>
                cancel
              </button>
              <button type="button" className="btn-available" onClick={handleSubmitAvailability}>
                available
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarTeacher;