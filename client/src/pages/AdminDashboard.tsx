import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { SubmitHandler } from "react-hook-form";
import type {
  ProjectFormInput,
  ClientFormInput,
  Contact,
  Subscriber,
} from "../types";
import { API } from "../components/Constants";
import AddProject from "../components/AdminComponents/AddProject";
import AddClient from "../components/AdminComponents/AddClient";
import ProjectManager from "../components/AdminComponents/ProjectManager";
import ImageCropperModal from "../components/AdminComponents/ImageCropperModal";
import ContactResponses from "../components/AdminComponents/ContactResponses";
import NewsletterSubscribers from "../components/AdminComponents/NewsletterSubscribers";
import DashboardOverview from "../components/AdminComponents/DashboardOverview";
import AnalyticsGraphs from "../components/AdminComponents/AnalyticsGraphs";
import EditAdminName from "../components/AdminComponents/EditAdminName";
import Loading from "../components/Loading";
import { usePageMeta } from "../utils/usePageMeta";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

interface AdminData {
  id?: string;
  name: string;
  email: string;
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [clientImage, setClientImage] = useState<File | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppingType, setCroppingType] = useState<"project" | "client" | null>(
    null
  );
  const [projectImageError, setProjectImageError] = useState<string>("");
  const [clientImageError, setClientImageError] = useState<string>("");
  const [showEditNameModal, setShowEditNameModal] = useState<boolean>(false);
  const navigate = useNavigate();

  usePageMeta({
    title: "Admin Dashboard | SyncHomes",
    description: "SyncHomes Admin Portal - Dashboard",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, contactsRes, subscribersRes, projectsRes, clientsRes] =
          await Promise.all([
            axios.get(
              `${
                import.meta.env.VITE_API_URL || "http://localhost:5000/api"
              }/admin/me`,
              {
                withCredentials: true,
              }
            ),
            axios.get(`${API}/contacts`),
            axios.get(`${API}/subscribers`),
            axios.get(`${API}/projects`),
            axios.get(`${API}/clients`),
          ]);
        setAdmin(adminRes.data.admin);
        setContacts(contactsRes.data);
        setSubscribers(subscribersRes.data);
        setProjectCount(projectsRes.data.length);
        setClientCount(clientsRes.data.length);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleProjectSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    setProjectImageError("");

    if (!projectImage) {
      setProjectImageError("Project image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", projectImage);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("location", data.location);

    try {
      await axios.post(`${API}/projects`, formData);
      toast.success("Project added successfully!");
      setProjectImage(null);
    } catch (error: any) {
      console.error(error);
      toast.error(
        "Failed to add project. " +
          (error?.response?.data?.message ||
            error?.message ||
            "Please try again.")
      );
    }
  };

  const handleClientSubmit: SubmitHandler<ClientFormInput> = async (data) => {
    setClientImageError("");

    if (!clientImage) {
      setClientImageError("Client image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", clientImage);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("designation", data.designation);

    try {
      await axios.post(`${API}/clients`, formData);
      toast.success(`Client "${data.name}" added successfully!`);
      setClientImage(null);
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An unexpected error occurred";
      console.error(err);
      toast.error(
        "Failed to add client. " + (errorMessage || "Please try again.")
      );
    }
  };

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "project" | "client"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageToCrop(reader.result);
          setCroppingType(type);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: File) => {
    if (croppingType === "project") {
      setProjectImage(croppedImage);
    } else if (croppingType === "client") {
      setClientImage(croppedImage);
    }
    setImageToCrop(null);
    setCroppingType(null);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out?",
      text: "You will need to sign in again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/admin/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out");
      navigate("/admin/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      const msg =
        error?.response?.data?.message || error?.message || "Logout failed";
      toast.error(msg);
    }
  };

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-600 to-indigo-600 text-white transition-all duration-300 shadow-lg overflow-hidden flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between h-20 border-b border-blue-500">
          {sidebarOpen && <h2 className="text-xl font-bold">SyncHomes</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 space-y-2 px-3 flex-1 overflow-y-auto">
          {[
            { id: "overview", label: "Dashboard", icon: "📊" },
            { id: "properties", label: "Properties", icon: "🏠" },
            { id: "contacts", label: "Contacts", icon: "📬" },
            { id: "subscribers", label: "Subscribers", icon: "📧" },
            { id: "leads", label: "Leads", icon: "👥" },
            { id: "agents", label: "Agents", icon: "🤝" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-3 rounded-lg transition-all flex items-center gap-3 ${
                activeTab === item.id
                  ? "bg-white text-blue-600 font-bold shadow-md"
                  : "text-blue-100 hover:bg-blue-500"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors flex items-center gap-2 justify-center"
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === "overview" && "Dashboard"}
            {activeTab === "properties" && "Properties"}
            {activeTab === "contacts" && "Contact Responses"}
            {activeTab === "subscribers" && "Newsletter Subscribers"}
            {activeTab === "leads" && "Leads"}
            {activeTab === "agents" && "Agents"}
            {activeTab === "settings" && "Settings"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, <strong>{admin?.name}</strong>
            </span>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {admin?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-600 text-sm font-semibold">
                        Total Properties
                      </p>
                      <p className="text-2xl font-bold text-indigo-700 mt-2">
                        24
                      </p>
                    </div>
                    <span className="text-3xl">🏠</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-600 text-sm font-semibold">
                        New Leads
                      </p>
                      <p className="text-2xl font-bold text-pink-700 mt-2">
                        12
                      </p>
                    </div>
                    <span className="text-3xl">👥</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-600 text-sm font-semibold">
                        Active Agents
                      </p>
                      <p className="text-2xl font-bold text-teal-700 mt-2">8</p>
                    </div>
                    <span className="text-3xl">🤝</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-semibold">
                        Revenue
                      </p>
                      <p className="text-2xl font-bold text-orange-700 mt-2">
                        $45.2K
                      </p>
                    </div>
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
              </div>

              {/* Additional overview cards from DashboardOverview component */}
              <DashboardOverview API={API} />

              {/* Analytics Graphs */}
              <AnalyticsGraphs
                projectCount={projectCount}
                clientCount={clientCount}
                contactCount={contacts.length}
                subscriberCount={subscribers.length}
              />
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Add New Property
                  </h2>
                  <AddProject
                    onImageSelect={(e) => handleImageSelect(e, "project")}
                    projectImageError={projectImageError}
                    onImageErrorClear={() => setProjectImageError("")}
                    onSubmit={handleProjectSubmit}
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Add New Client
                  </h2>
                  <AddClient
                    onImageSelect={(e) => handleImageSelect(e, "client")}
                    clientImageError={clientImageError}
                    onImageErrorClear={() => setClientImageError("")}
                    onSubmit={handleClientSubmit}
                  />
                </div>
              </div>
              <div className="mt-6">
                <ProjectManager API={API} />
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Contact Responses
              </h2>
              <ContactResponses contacts={contacts} />
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === "subscribers" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Newsletter Subscribers
              </h2>
              <NewsletterSubscribers subscribers={subscribers} />
            </div>
          )}

          {/* Leads Tab */}
          {activeTab === "leads" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Manage Leads
              </h2>
              <p className="text-gray-500">
                Lead management interface coming soon...
              </p>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === "agents" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Manage Agents
              </h2>
              <p className="text-gray-500">
                Agent management interface coming soon...
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + Add Agent
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Admin Information Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Admin Information
                </h2>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={admin?.email || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Name
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={admin?.name || ""}
                        disabled
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                      <button
                        onClick={() => setShowEditNameModal(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Edit Name
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Security
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Manage your account security settings
                </p>

                <button
                  onClick={() => navigate("/admin/reset-password")}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Change Password
                </button>
              </div>

              {/* Account Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Account Information
                </h2>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Account Status:</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Role:</span>
                    <span>Administrator</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold">Last Login:</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Cropper Modal */}
      <ImageCropperModal
        imageToCrop={imageToCrop}
        croppingType={croppingType}
        onCancel={() => {
          setImageToCrop(null);
          setCroppingType(null);
        }}
        onCropComplete={handleCropComplete}
      />

      {/* Modal: Edit Admin Name */}
      {showEditNameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Edit Admin Name
            </h2>
            <EditAdminName
              currentName={admin?.name || ""}
              onSuccess={(newName) => {
                setAdmin((prev) => (prev ? { ...prev, name: newName } : null));
                setShowEditNameModal(false);
              }}
              onCancel={() => setShowEditNameModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
