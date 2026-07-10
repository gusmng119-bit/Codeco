import { useState } from "react";
import "./SalaryAdmin.css";

interface SalaryRow {
  no: number;
  nama: string;
  totalClass: number;
  feedbackSelesai: number;
  feedbackPending: number;
  totalSalary: string;
  status: "Paid" | "Unpaid";
}

interface SummaryCard {
  id: number;
  title: string;
  value: string;
  type: "total" | "due" | "pending" | "paid";
}

const SalaryAdmin = () => {
  // Data untuk 4 Summary Cards di bagian atas
  const summaryCards: SummaryCard[] = [
    { id: 1, title: "Total Salary", value: "Rp 30.200.000", type: "total" },
    { id: 2, title: "Harus Dibayar", value: "28", type: "due" },
    { id: 3, title: "Menunggu Feedback", value: "2", type: "pending" },
    { id: 4, title: "Terbayar", value: "24", type: "paid" },
  ];

  // Data baris tabel gaji guru (typed sebagai state biar status bisa diubah)
  const [salaryData, setSalaryData] = useState<SalaryRow[]>([
    { no: 1, nama: "Mr. Ilham", totalClass: 4, feedbackSelesai: 4, feedbackPending: 0, totalSalary: "Rp 2.000.000", status: "Paid" },
    { no: 1, nama: "Krisnawan Putrawan", totalClass: 3, feedbackSelesai: 2, feedbackPending: 1, totalSalary: "Rp 1.000.000", status: "Unpaid" },
    { no: 1, nama: "Krisnawan Putrawan", totalClass: 3, feedbackSelesai: 3, feedbackPending: 0, totalSalary: "Rp 1.500.000", status: "Paid" },
    { no: 1, nama: "Krisnawan Putrawan", totalClass: 2, feedbackSelesai: 1, feedbackPending: 1, totalSalary: "Rp 500.000", status: "Unpaid" },
    { no: 1, nama: "Krisnawan Putrawan", totalClass: 1, feedbackSelesai: 1, feedbackPending: 0, totalSalary: "Rp 500.000", status: "Paid" },
    { no: 1, nama: "Krisnawan Putrawan", totalClass: 1, feedbackSelesai: 1, feedbackPending: 0, totalSalary: "Rp 500.000", status: "Paid" },
  ]);

  // State untuk modal ubah status
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openStatusModal = (idx: number): void => {
    setSelectedIndex(idx);
    setModalOpen(true);
  };

  const closeStatusModal = (): void => {
    setModalOpen(false);
    setSelectedIndex(null);
  };

  const updateStatus = (newStatus: "Paid" | "Unpaid"): void => {
    setSalaryData((prev: SalaryRow[]) =>
      prev.map((row: SalaryRow, i: number) =>
        i === selectedIndex ? { ...row, status: newStatus } : row
      )
    );
    closeStatusModal();
  };

  const selectedRow: SalaryRow | null =
    selectedIndex !== null ? salaryData[selectedIndex] : null;

  return (
    <div className="salary-page-container">

      {/* 1. TOP SUMMARY CARDS */}
      <div className="salary-summary-grid">
        {summaryCards.map((card: SummaryCard) => (
          <div key={card.id} className={`salary-summary-card ${card.type}`}>
            <div className="summary-icon-circle">
              <div className="inner-icon-dot"></div>
            </div>
            <div className="summary-info-text">
              <span className="summary-card-title">{card.title}</span>
              <span className="summary-card-value">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <div className="salary-filter-control-bar">
        <div className="salary-search-box-wrapper">
          <input type="text" placeholder="Cari nama guru..." className="salary-search-input" />
        </div>

        <div className="salary-dropdown-selectors-group">
          <button className="salary-filter-dropdown-btn">Semua Kelas</button>
          <button className="salary-filter-dropdown-btn">Semua Status</button>
          <button className="salary-filter-dropdown-btn font-medium">Semua Tanggal</button>
        </div>
      </div>

      {/* 3. MAIN DATA TABLE */}
      <div className="salary-table-border-wrapper">
        <table className="salary-main-data-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>No</th>
              <th>Nama Guru</th>
              <th>Total Class</th>
              <th className="text-center-th">Feedback Selesai</th>
              <th className="text-center-th">Feedback Pending</th>
              <th>Total Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((row: SalaryRow, idx: number) => (
              <tr key={idx}>
                <td>{row.no}</td>
                <td className="teacher-name-cell-text">{row.nama}</td>
                <td>{row.totalClass}</td>
                <td className="text-center-td font-bold color-green-done">{row.feedbackSelesai}</td>
                <td className="text-center-td font-bold color-orange-pending">{row.feedbackPending}</td>
                <td className="font-medium">{row.totalSalary}</td>
                <td>
                  <button
                    type="button"
                    className={`salary-status-badge status-clickable ${row.status.toLowerCase()}`}
                    onClick={() => openStatusModal(idx)}
                  >
                    {row.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. LOWER DETAIL PANEL (DETAIL SALARY) */}
      <div className="salary-lower-detail-card">
        <div className="salary-detail-tabs-header">
          <button className="salary-tab-header-btn active">Detail Salary</button>
        </div>

        <div className="salary-detail-card-layout-grid">

          {/* Sisi Kiri: Profil & Kontak Identitas */}
          <div className="salary-teacher-identity-side-box">
            <h3 className="detail-teacher-title-name">
              {selectedRow ? selectedRow.nama : "Mr Ilham"}
            </h3>
            <span className="detail-status-green-pill">
              {selectedRow ? selectedRow.status : "Paid"}
            </span>

            <div className="teacher-meta-spec-rows-list">
              <div className="meta-spec-item">
                <span className="icon-placeholder-box">📚</span>
                <span className="meta-txt">Kelas: Coding</span>
              </div>
              <div className="meta-spec-item">
                <span className="icon-placeholder-box">✉️</span>
                <span className="meta-txt">Email: Ilham23@gmail.com</span>
              </div>
              <div className="meta-spec-item">
                <span className="icon-placeholder-box">📞</span>
                <span className="meta-txt">Telepon: 0823-4321-3332</span>
              </div>
            </div>
          </div>

          {/* Sisi Tengah: Rincian Angka Tarif Gaji */}
          <div className="salary-calculation-breakdown-box">
            <div className="calc-info-card-bordered">
              <div className="calc-row-item-line">
                <span className="calc-lbl">Total Kelas Diajar</span>
                <span className="calc-val">
                  : {selectedRow ? selectedRow.totalClass : 3} Kelas
                </span>
              </div>
              <div className="calc-row-item-line">
                <span className="calc-lbl">Tarif per kelas</span>
                <span className="calc-val">: Rp 500.000</span>
              </div>
              <div className="calc-row-item-line">
                <span className="calc-lbl">Feedback Pending</span>
                <span className="calc-val">
                  : {selectedRow ? selectedRow.feedbackPending : 1}
                </span>
              </div>
              <div className="calc-divider-dashed-line"></div>
              <div className="calc-row-item-line total-gaji-highlight-row">
                <span className="calc-lbl-total">Total Gaji</span>
                <span className="calc-val-total">
                  : {selectedRow ? selectedRow.totalSalary : "Rp 1.000.000"}
                </span>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Informasi Metode Pembayaran */}
          <div className="salary-bank-payment-details-box">
            <h4 className="payment-block-main-title">Informasi Pembayaran</h4>
            <div className="payment-data-rows-list">
              <div className="payment-data-line-row">
                <span className="p-lbl">Status Pembayaran</span>
                <span className="p-val">
                  : {selectedRow ? selectedRow.status : "Paid"}
                </span>
              </div>
              <div className="payment-data-line-row">
                <span className="p-lbl">Tanggal Bayar</span>
                <span className="p-val">: 25 April 2026</span>
              </div>
              <div className="payment-data-line-row">
                <span className="p-lbl">Metode Pembayaran</span>
                <span className="p-val">: Transfer Bank</span>
              </div>
              <div className="payment-data-line-row">
                <span className="p-lbl">Bank Tujuan</span>
                <span className="p-val">: Bank BCA</span>
              </div>
              <div className="payment-data-line-row">
                <span className="p-lbl">Catatan</span>
                <span className="p-val">: Pembayaran Gaji April 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. MODAL UBAH STATUS PEMBAYARAN */}
      {modalOpen && selectedRow !== null && (
        <div className="status-modal-overlay" onClick={closeStatusModal}>
          <div className="status-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="status-modal-title">Ubah Status Pembayaran</h3>
            <p className="status-modal-subtitle">{selectedRow.nama}</p>

            <div className="status-modal-actions">
              <button className="status-modal-btn paid" onClick={() => updateStatus("Paid")}>
                Paid
              </button>
              <button className="status-modal-btn unpaid" onClick={() => updateStatus("Unpaid")}>
                Unpaid
              </button>
            </div>

            <button className="status-modal-close" onClick={closeStatusModal}>
              Batal
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalaryAdmin;