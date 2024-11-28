import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiTestimonies } from "../../services/apiTestimonies";

// Query keys
export const TESTIMONY_KEYS = {
  all: ["testimonies"],
  lists: () => [...TESTIMONY_KEYS.all, "list"],
  list: filters => [...TESTIMONY_KEYS.lists(), filters],
  details: () => [...TESTIMONY_KEYS.all, "detail"],
  detail: id => [...TESTIMONY_KEYS.details(), id],
};

// Query Hooks
export const useTestimonies = ({ page = 1, searchTerm = "" } = {}) => {
  return useQuery({
    queryKey: TESTIMONY_KEYS.list({ page, searchTerm }),
    queryFn: () => apiTestimonies.getTestimonies({ page, searchTerm }),
    keepPreviousData: true,
    onError: error => {
      toast.error("Failed to fetch testimonies: " + error.message);
    },
  });
};

export const useTestimony = id => {
  return useQuery({
    queryKey: TESTIMONY_KEYS.detail(id),
    queryFn: () => apiTestimonies.getTestimonyById(id),
    enabled: !!id,
    onError: error => {
      toast.error("Failed to fetch testimony details: " + error.message);
    },
  });
};

// Mutation Hooks
export const useCreateTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, profileImageFile }) => {
      toast.loading("Creating testimony...", { id: "createTestimony" });
      return apiTestimonies.createTestimony(data, profileImageFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONY_KEYS.lists() });
      toast.success("Testimony created successfully!", {
        id: "createTestimony",
      });
    },
    onError: error => {
      toast.error("Failed to create testimony: " + error.message, {
        id: "createTestimony",
      });
    },
  });
};

export const useUpdateTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, profileImageFile }) => {
      toast.loading("Updating testimony...", { id: "updateTestimony" });
      return apiTestimonies.updateTestimony(id, data, profileImageFile);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: TESTIMONY_KEYS.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: TESTIMONY_KEYS.lists() });
      toast.success("Testimony updated successfully!", {
        id: "updateTestimony",
      });
    },
    onError: error => {
      toast.error("Failed to update testimony: " + error.message, {
        id: "updateTestimony",
      });
    },
  });
};

export const useDeleteTestimony = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, profileImageUrl }) => {
      toast.loading("Deleting testimony...", { id: "deleteTestimony" });
      return apiTestimonies.deleteTestimony(id, profileImageUrl);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: TESTIMONY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: TESTIMONY_KEYS.lists() });
      toast.success("Testimony deleted successfully!", {
        id: "deleteTestimony",
      });
    },
    onError: error => {
      toast.error("Failed to delete testimony: " + error.message, {
        id: "deleteTestimony",
      });
    },
  });
};
