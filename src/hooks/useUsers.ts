import { getBasicProfile, getUserDetails } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useBasicProfile = () => {
  return useQuery({
    queryKey: ["user", "basic"],
    queryFn: getBasicProfile,
    staleTime: 60_000,
  });
};

export const useUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["user", "details", userId],
    queryFn: () => getUserDetails(userId),
    enabled: !!userId,
  });
};
