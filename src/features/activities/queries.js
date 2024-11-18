import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiActivities } from "../../services/apiActivities";

// Query keys
export const ACTIVITY_KEYS = {
  all: ["activities"],
  lists: () => [...ACTIVITY_KEYS.all, "list"],
  list: filters => [...ACTIVITY_KEYS.lists(), filters],
  details: () => [...ACTIVITY_KEYS.all, "detail"],
  detail: id => [...ACTIVITY_KEYS.details(), id],
};

// Query Hooks
export const useActivities = ({
  page = 1,
  category = "all",
  searchTerm = "",
} = {}) => {
  return useQuery({
    queryKey: ACTIVITY_KEYS.list({ page, category, searchTerm }),
    queryFn: () => apiActivities.getActivities({ page, category, searchTerm }),
    keepPreviousData: true,
    onError: error => {
      toast.error("Failed to fetch activities: " + error.message);
    },
  });
};

export const useActivity = id => {
  return useQuery({
    queryKey: ACTIVITY_KEYS.detail(id),
    queryFn: () => apiActivities.getActivityById(id),
    enabled: !!id,
    onError: error => {
      toast.error("Failed to fetch activity details: " + error.message);
    },
  });
};

// Mutation Hooks
export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }) => {
      toast.loading("Creating activity...", { id: "createActivity" });
      return apiActivities.createActivity(data, imageFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_KEYS.lists() });
      toast.success("Activity created successfully!", { id: "createActivity" });
    },
    onError: error => {
      toast.error("Failed to create activity: " + error.message, {
        id: "createActivity",
      });
    },
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, imageFile }) => {
      toast.loading("Updating activity...", { id: "updateActivity" });
      return apiActivities.updateActivity(id, data, imageFile);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_KEYS.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: ACTIVITY_KEYS.lists() });
      toast.success("Activity updated successfully!", { id: "updateActivity" });
    },
    onError: error => {
      toast.error("Failed to update activity: " + error.message, {
        id: "updateActivity",
      });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageUrl }) => {
      toast.loading("Deleting activity...", { id: "deleteActivity" });
      return apiActivities.deleteActivity(id, imageUrl);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: ACTIVITY_KEYS.lists() });
      toast.success("Activity deleted successfully!", { id: "deleteActivity" });
    },
    onError: error => {
      toast.error("Failed to delete activity: " + error.message, {
        id: "deleteActivity",
      });
    },
  });
};
