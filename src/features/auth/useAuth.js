import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { login, getCurrentUser, logout } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: user => {
      queryClient.setQueryData(["user"], user);

      toast.success("Successfully logged in!");
      // navigate("/admin/activities");
    },
    onError: error => {
      toast.error(error.message || "Failed to login");
    },
  });
}

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return { user, isLoading };
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Successfully logged out!");
    },
    onError: error => {
      toast.error(error.message || "Failed to logout");
    },
  });
}
