import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Upload } from "lucide-react";
import {
  useTestimonies,
  useCreateTestimony,
  useUpdateTestimony,
  useDeleteTestimony,
} from "../features/testimonies/queries";

const AdminTestimonies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimony, setCurrentTestimony] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Queries and Mutations
  const { data: testimoniesData, isLoading } = useTestimonies({ searchTerm });
  const createTestimony = useCreateTestimony();
  const updateTestimony = useUpdateTestimony();
  const deleteTestimony = useDeleteTestimony();

  const handleDelete = (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this testimony?")) {
      deleteTestimony.mutate({ id, imageUrl });
    }
  };

  const handleEdit = testimony => {
    setCurrentTestimony(testimony);
    setPreviewImage(testimony.testimony);
    setIsModalOpen(true);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      role: formData.get("role"),
      content: formData.get("content"),
      status: "published",
    };

    if (currentTestimony) {
      updateTestimony.mutate(
        {
          id: currentTestimony.id,
          data,
          profileImageFile: selectedFile,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setCurrentTestimony(null);
            setSelectedFile(null);
            setPreviewImage(null);
          },
        }
      );
    } else {
      createTestimony.mutate(
        {
          data,
          profileImageFile: selectedFile,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedFile(null);
            setPreviewImage(null);
          },
        }
      );
    }
  };

  return (
    <main className="flex-1 ml-64 p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Testimony Management</h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search testimonies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentTestimony(null);
              setPreviewImage(null);
              setSelectedFile(null);
              setIsModalOpen(true);
            }}
            className="bg-primary text-background px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#388E3C] transition-colors"
          >
            <Plus size={20} />
            New Testimony
          </button>
        </div>

        {/* Testimonies Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                testimoniesData?.data.map(testimony => (
                  <tr key={testimony.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={testimony.profile_image_url || ""}
                          alt={testimony.profile_image_url}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                        <div className="text-sm font-medium text-text">
                          {testimony.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {testimony.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          testimony.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {testimony.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(testimony)}
                          className="text-primary hover:text-[#388E3C]"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(
                              testimony.id,
                              testimony.profile_image_url
                            )
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Testimony Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 py-56 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white h-screen overflow-y-auto my-12 rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">
                {currentTestimony ? "Edit Testimony" : "New Testimony"}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    defaultValue={currentTestimony?.name}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    name="role"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    defaultValue={currentTestimony?.role}
                    required
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    defaultValue={currentTestimony?.status || "draft"}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimony Content
                  </label>
                  <textarea
                    name="content"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    rows="4"
                    defaultValue={currentTestimony?.content}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="mt-1 flex flex-col items-center space-y-2">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-40 w-full rounded-lg object-cover"
                      />
                    )}
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image_url/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-[#388E3C] transition-colors"
                    disabled={
                      createTestimony.isLoading || updateTestimony.isLoading
                    }
                  >
                    {createTestimony.isLoading || updateTestimony.isLoading
                      ? "Saving..."
                      : currentTestimony
                      ? "Update"
                      : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminTestimonies;
