import { create } from "zustand";
import { certificateApi } from "../api/endpoints/certificateApi";
import type { CertificateItem } from "../api/types/features";
import appConfig from "../config/appConfig";

/* eslint-disable no-unused-vars */
type CertificateState = {
  certificates: CertificateItem[];
  searchTerm: string;
  selectedCert: CertificateItem | null;
  showModal: boolean;
  loading: boolean;
  error: string | null;

  setSearchTerm: (term: string) => void;
  setSelectedCert: (cert: CertificateItem | null) => void;
  setShowModal: (show: boolean) => void;

  fetchCertificates: () => Promise<void>;
  saveCertificate: (course: { title: string; instructor: string; certificateImg: string }) => Promise<boolean>;
};
/* eslint-enable no-unused-vars */

const getLocalCertificates = (): CertificateItem[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("certificates") || "[]");
  } catch {
    return [];
  }
};

const useCertificateStore = create<CertificateState>((set, get) => ({
  certificates: appConfig.USE_LOCAL_FALLBACK ? getLocalCertificates() : [],
  searchTerm: "",
  selectedCert: null,
  showModal: false,
  loading: false,
  error: null,

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCert: (selectedCert) => set({ selectedCert }),
  setShowModal: (showModal) => set({ showModal }),

  fetchCertificates: async () => {
    set({ loading: true, error: null });
    try {
      const apiCerts = await certificateApi.getCertificates();
      
      if (!appConfig.USE_LOCAL_FALLBACK) {
        // Purely use strictly what Backend (BE) sends
        set({ certificates: apiCerts, loading: false });
        return;
      }

      const localCerts = getLocalCertificates();
      const certMap = new Map<string, CertificateItem>();
      [...localCerts, ...apiCerts].forEach((c) => certMap.set(c.className, c));
      const merged = Array.from(certMap.values());

      set({ certificates: merged, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load certificates";
      set({ error: msg, loading: false });
    }
  },

  saveCertificate: async (course) => {
    const { certificates } = get();
    const exist = certificates.find((c) => c.className === course.title);

    if (exist) {
      alert("Certificate already saved!");
      return false;
    }

    const newCertData = {
      className: course.title,
      instructor: course.instructor,
      date: new Date().toLocaleDateString(),
      image: course.certificateImg,
    };

    try {
      const savedCert = await certificateApi.saveCertificate(newCertData);
      const updated = [...get().certificates, savedCert];
      if (appConfig.USE_LOCAL_FALLBACK && typeof window !== "undefined") {
        localStorage.setItem("certificates", JSON.stringify(updated));
      }
      set({ certificates: updated });
      alert("Certificate saved!");
      return true;
    } catch {
      if (!appConfig.USE_LOCAL_FALLBACK) {
        alert("Failed to save certificate on backend.");
        return false;
      }
      const fallbackCert: CertificateItem = { id: Date.now(), ...newCertData };
      const updated = [...get().certificates, fallbackCert];
      if (typeof window !== "undefined") {
        localStorage.setItem("certificates", JSON.stringify(updated));
      }
      set({ certificates: updated });
      alert("Certificate saved!");
      return true;
    }
  },
}));

export default useCertificateStore;
