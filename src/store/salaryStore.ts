import { create } from "zustand";
import axiosClient from "../api/core/axiosClient";

/* eslint-disable no-unused-vars */
export type SalaryRow = {
  id: number;
  date: string;
  className: string;
  grade: string;
  total: string;
  status: "Paid" | "Pending";
  paymentDate: string;
};

export type SalarySummary = {
  totalSalary: string;
  pendingAmount: string;
  pendingCount: number;
  paidAmount: string;
  paidCount: number;
};

type SalaryState = {
  salaryData: SalaryRow[];
  summary: SalarySummary | null;
  loading: boolean;
  error: string | null;

  fetchSalary: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useSalaryStore = create<SalaryState>((set) => ({
  salaryData: [],
  summary: null,
  loading: false,
  error: null,

  fetchSalary: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get<{ rows: SalaryRow[]; summary: SalarySummary }>("/teacher/salary");
      set({ salaryData: res.data.rows, summary: res.data.summary, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load salary data";
      set({ error: msg, loading: false });
    }
  },
}));

export default useSalaryStore;
