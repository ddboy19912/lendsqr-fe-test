export interface User {
  id: string;
  organization: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    profileImage: string;
    gender: "male" | "female" | "other";
    maritalStatus: "single" | "married" | "divorced";
    children: number;
    residenceType: "owned" | "rented" | "family";
  };
  account: {
    tier: 1 | 2 | 3;
    balance: number;
    number: string;
    bank: string;
    bvn: string;
  };
  employment: {
    company: string;
    position: string;
    sector: string;
    duration: number;
    income: number;
  };
  education: {
    level: "high-school" | "bachelors" | "masters" | "phd";
    institution: string;
    graduationYear: number;
  };
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  guarantors: Array<{
    name: string;
    relationship: string;
    phone: string;
    email: string;
  }>;
  meta: {
    email: string;
    phone: string;
    joined: string;
    status: "active" | "inactive" | "blacklisted" | "pending";
    loanAmount: number;
    savingsAmount: number;
  };
}

export type UserStatus = "active" | "inactive" | "blacklisted" | "pending";
