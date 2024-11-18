import supabase from "./supabase";

export const apiActivities = {
  // Get all activities with optional filters
  getActivities: async ({ page = 1, category = "all", searchTerm = "" }) => {
    const pageSize = 6;
    let query = supabase
      .from("activities")
      .select("*", { count: "exact" })
      .order("date", { ascending: false });

    // Apply category filter
    if (category !== "all") {
      query = query.eq("category", category);
    }

    // Apply search filter
    if (searchTerm) {
      query = query.or(
        `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    // Apply pagination
    const start = (page - 1) * pageSize;
    query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;
    return { data, count };
  },

  // Get single activity by ID
  getActivityById: async id => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new activity with image upload
  createActivity: async (activityData, imageFile) => {
    // 1. Upload image if provided
    let imageUrl = null;
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("activity-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("activity-images").getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    // 2. Create activity record
    const { data, error } = await supabase
      .from("activities")
      .insert([
        {
          ...activityData,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update activity
  updateActivity: async (id, activityData, imageFile) => {
    let updateData = { ...activityData };

    // 1. Handle image upload if new image is provided
    if (imageFile) {
      // Delete old image if exists
      if (activityData.image_url) {
        const oldImagePath = activityData.image_url.split("/").pop();
        await supabase.storage.from("activity-images").remove([oldImagePath]);
      }

      // Upload new image
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("activity-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("activity-images").getPublicUrl(filePath);

      updateData.image_url = publicUrl;
    }

    // 2. Update activity record
    const { data, error } = await supabase
      .from("activities")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete activity
  deleteActivity: async (id, imageUrl) => {
    // 1. Delete image if exists
    if (imageUrl) {
      const imagePath = imageUrl.split("/").pop();
      await supabase.storage.from("activity-images").remove([imagePath]);
    }

    // 2. Delete activity record
    const { error } = await supabase.from("activities").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
