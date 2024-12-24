import supabase from "./supabase";

export const apiTestimonies = {
  // Get all testimonies with optional search
  getTestimonies: async ({ searchTerm = "", page = 1 }) => {
    const pageSize = 10;
    let query = supabase
      .from("testimonies")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply search filter
    if (searchTerm) {
      query = query.or(
        `name.ilike.%${searchTerm}%,role.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`
      );
    }

    // Apply pagination
    // const start = (page - 1) * pageSize;
    // query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;
    return { data, count };
  },

  // Get single testimony by ID
  getTestimonyById: async id => {
    const { data, error } = await supabase
      .from("testimonies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new testimony with profile image upload
  createTestimony: async (testimonyData, profileImageFile) => {
    // 1. Upload profile image if provided
    let profileImageUrl = null;
    if (profileImageFile) {
      const fileExt = profileImageFile.name.split(".").pop();
      const fileName = `profile_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("testimony-profile-images")
        .upload(filePath, profileImageFile);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("testimony-profile-images")
        .getPublicUrl(filePath);

      profileImageUrl = publicUrl;
    }

    // 2. Create testimony record
    const { data, error } = await supabase
      .from("testimonies")
      .insert([
        {
          ...testimonyData,
          profile_image_url: profileImageUrl,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update testimony
  updateTestimony: async (id, testimonyData, profileImageFile) => {
    let updateData = { ...testimonyData };

    // 1. Handle profile image upload if new image is provided
    if (profileImageFile) {
      // Delete old image if exists
      if (testimonyData.profile_image_url) {
        const oldImagePath = testimonyData.profile_image_url.split("/").pop();
        await supabase.storage
          .from("testimony-profile-images")
          .remove([oldImagePath]);
      }

      // Upload new image
      const fileExt = profileImageFile.name.split(".").pop();
      const fileName = `profile_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("testimony-profile-images")
        .upload(filePath, profileImageFile);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("testimony-profile-images")
        .getPublicUrl(filePath);

      updateData.profile_image_url = publicUrl;
    }

    // 2. Update testimony record
    const { data, error } = await supabase
      .from("testimonies")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete testimony
  deleteTestimony: async (id, profileImageUrl) => {
    // 1. Delete profile image if exists
    if (profileImageUrl) {
      const imagePath = profileImageUrl.split("/").pop();
      await supabase.storage
        .from("testimony-profile-images")
        .remove([imagePath]);
    }

    // 2. Delete testimony record
    const { error } = await supabase.from("testimonies").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
