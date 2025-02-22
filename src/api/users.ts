import { User } from "@/types/User";

// Get basic user profile
export const getBasicProfile = async (): Promise<{
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}> => {
  const res = await fetch("/api/users/current");
  return res.json();
};

// Get full user details
export const getUserDetails = async (userId: string): Promise<User> => {
  const res = await fetch(`/api/users/${userId}`);
  return res.json();
};

// Get All users
export const getAllUsers = async (filters?: {
  hasLoans?: boolean;
  hasSavings?: boolean;
}) => {
  const params = new URLSearchParams();
  if (filters?.hasLoans) params.append("hasLoans", "true");
  if (filters?.hasSavings) params.append("hasSavings", "true");

  const res = await fetch(`/api/users?${params.toString()}`);
  return res.json();
};
