import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Upload } from "lucide-react";
import { format } from "date-fns";
import logo from "../assets/logo_2.png";

const AdminActivities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Youth Education Workshop",
      category: "education",
      date: "2024-03-15",
      status: "published",
      image: "/api/placeholder/400/300",
    },
    // Add more sample activities...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const handleEdit = activity => {
    setCurrentActivity(activity);
    setPreviewImage(activity.image);
    setIsModalOpen(true);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-text text-background py-8">
        <div className="container flex flex-col justify-center items-center space-y-8 mx-auto px-4">
          <img src={logo} alt="Logo" className="w-36" />
          <h1 className="text-2xl font-bold">Activity Management</h1>
        </div>
      </div>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentActivity(null);
              setPreviewImage(null);
              setIsModalOpen(true);
            }}
            className="bg-primary text-background px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#388E3C] transition-colors"
          >
            <Plus size={20} />
            New Activity
          </button>
        </div>

        {/* Activities Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredActivities.map(activity => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={activity.image || "/api/placeholder/40/40"}
                        alt={activity.title}
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                      />
                      <div className="text-sm font-medium text-text">
                        {activity.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {activity.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {format(new Date(activity.date), "MMM dd, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(activity)}
                        className="text-primary hover:text-[#388E3C]"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">
              {currentActivity ? "Edit Activity" : "New Activity"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  defaultValue={currentActivity?.title}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  defaultValue={currentActivity?.category}
                >
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="environment">Environment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  defaultValue={currentActivity?.date}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  rows="4"
                  defaultValue={currentActivity?.description}
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
                      accept="image/*"
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
                >
                  {currentActivity ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivities;
