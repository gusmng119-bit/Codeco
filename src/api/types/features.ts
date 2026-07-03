export type ClassItem = {
  id: number;
  title: string;
  instructor: string;
  material: string;
  date: string;
  time: string;
  type: "yesterday" | "today" | "upcoming";
};

export type TeacherItem = {
  id: number;
  name: string;
  subject: string;
  img: string;
  education: string;
  teaching: string;
  about: string;
  ig: string;
  yt: string;
  linkedin: string;
  tiktok: string;
};

export type CertificateItem = {
  id: number;
  className: string;
  instructor: string;
  date: string;
  image: string;
};

export type FeedbackItem = {
  id: number;
  materialId?: number;
  title: string;
  date: string;
  progress: string;
  instructor: string;
  link?: string;
  feedback: string;
};

export type MaterialItem = {
  id: number;
  classId?: number;
  title: string;
  description?: string;
  date: string;
  progress: string;
  instructor: string;
  duration?: string;
  materialType?: string;
  link: string;
};

export type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  country: string;
  city: string;
  streetAddress: string;
  bankAccount: string;
};
