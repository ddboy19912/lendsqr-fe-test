import { User, UserStatus } from "@/types/User";

const API_URL =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD
    ? "/.netlify/functions/server"
    : "http://localhost:4000/.netlify/functions/server");

// Get basic user profile
export const getBasicProfile = async (): Promise<{
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");

  const users = await response.json();
  const currentUser = users[0]; // Assuming first user is current user
  return {
    id: currentUser.id,
    firstName: currentUser.personalInfo.firstName,
    lastName: currentUser.personalInfo.lastName,
    profileImage: currentUser.personalInfo.profileImage,
  };
};

// Get full user details
export const getUserDetails = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  if (!response.ok) throw new Error("Failed to fetch user");
  const user = await response.json();

  if (!user) throw new Error("User not found");
  return user;
};

// Get All users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const updateUserStatus = async (
  userId: string,
  status: UserStatus
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update status");
  }

  return response.json();
};
