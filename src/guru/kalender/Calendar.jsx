import React from 'react';
import "./Calendar.css"; // Tetap di-import untuk handling hover dan detail kecil

// Ikon SVG agar presisi dan tidak memerlukan library tambahan
const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const VideoIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>;

const Calendar = () => {
  // Data Hari (Sun - Sat)
  const days = [
    { name: 'SUN', number: 21, isHighlighted: false },
    { name: 'MON', number: 22, isHighlighted: false },
    { name: 'TUE', number: 23, isHighlighted: false },
    { name: 'WED', number: 24, isHighlighted: false },
    { name: 'THU', number: 25, isHighlighted: true }, // Kolom Kamis agak kebiruan
    { name: 'FRI', number: 26, isHighlighted: false },
    { name: 'SAT', number: 27, isHighlighted: false },
  ];

  // Slot Jam Sesuai Gambar (7 AM - 5 PM)
  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
  ];

  
  const events = [
    { dayIndex: 1, time: '8 AM', displayTime: '08:00 AM', teacher: 'Mr Ilham', subject: 'Robotic', type: 'robotic' },
    { dayIndex: 0, time: '10 AM', displayTime: '10:00 AM', teacher: 'Mr Ilham', subject: 'Robotic', type: 'robotic' },
    { dayIndex: 2, time: '11 AM', displayTime: '11:00 AM', teacher: 'Mr Ilham', subject: 'Robotic', type: 'robotic' },
    { dayIndex: 5, time: '11 AM', displayTime: '11:00 AM', teacher: 'Mr Rio', subject: 'Desain', type: 'desain' },
    { dayIndex: 5, time: '1 PM', displayTime: '1:00 PM', teacher: 'Mr Ilham', subject: 'Programing', type: 'programing' },
    { dayIndex: 5, time: '3 PM', displayTime: '3:00 PM', teacher: 'Mr Faisal', subject: 'Science', type: 'science' }
  ];

  return (
    <div className="calendar-page">
      {/* --- HEADER CONTROLS --- */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <select className="calendar-dropdown" defaultValue="April">
          <option value="April">April</option>
        </select>
        <select className="calendar-dropdown" defaultValue="2026">
          <option value="2026">2026</option>
        </select>
        <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
          <button className="nav-btn"><ChevronLeft /></button>
          <button className="nav-btn"><ChevronRight /></button>
        </div>
      </div>

      {/* --- TEXT BULAN UTAMA --- */}
      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
        April 2026
      </div>

      {/* --- STRUKTUR CSS GRID KUNCIAN UTAMA --- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '70px repeat(7, 1fr)',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#ffffff'
      }}>
        
        {/* Sudut Kiri Atas Kosong */}
        <div style={{ borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', height: '70px' }}></div>
        
        {/* Render Judul Hari */}
        {days.map((day, index) => (
          <div 
            key={index} 
            style={{
              padding: '12px 16px',
              borderRight: index === 6 ? 'none' : '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: day.isHighlighted ? '#f0f7ff' : '#ffffff',
              minHeight: '70px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '4px' }}>{day.name}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', lineHeight: '1' }}>{day.number}</div>
          </div>
        ))}

        {/* Render Baris Jam Dan Kotak Sel Grid */}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            {/* Kolom Waktu / Jam Kiri */}
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#94a3b8',
              textAlign: 'right',
              paddingRight: '12px',
              height: '85px',
              boxSizing: 'border-box',
              position: 'relative',
              top: '-6px'
            }}>
              {time}
            </div>

            {/* 7 Kotak Hari di Samping Jam */}
            {days.map((day, dayIdx) => {
              const foundEvent = events.find((e) => e.time === time && e.dayIndex === dayIdx);

              return (
                <div 
                  key={dayIdx} 
                  style={{
                    height: '85px',
                    borderRight: dayIdx === 6 ? 'none' : '1px solid #f1f5f9',
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: day.isHighlighted ? '#f0f7ff' : 'transparent',
                    position: 'relative',
                    boxSizing: 'border-box'
                  }}
                >
                  {foundEvent && (
                    <div className={`event-card event-${foundEvent.type}`}>
                      <div className="event-time-row">
                        <span>{foundEvent.displayTime}</span>
                        <VideoIcon />
                      </div>
                      <div className="event-teacher">{foundEvent.teacher}</div>
                      <div className="event-subject">{foundEvent.subject}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
};

export default Calendar;