import { updateUserStatus } from "@/api/users";
import { User, UserStatus } from "@/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      updateUserStatus(userId, status),
    onSuccess: (data: User, variables) => {
      queryClient.setQueryData(["users"], (old: User[] | undefined) =>
        (old || []).map((user) =>
          user.id === variables.userId
            ? { ...user, meta: { ...user.meta, status: variables.status } }
            : user
        )
      );

      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["user", variables.userId],
      });

      queryClient.setQueryData(["user", variables.userId], data);

      toast.success(
        `User-${variables.userId} status updated to ${variables.status}`
      );
    },
    onError: (err: Error) => {
      toast.error(`Update failed: ${err.message}`);
    },
  });
};
