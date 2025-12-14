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
import Loading from "../components/Loading";

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
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState<string>("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string>("");
  const [resetPasswordForm, setResetPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard | SyncHomes";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "SyncHomes Admin Portal - Dashboard"
      );
    }
  }, []);

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
      alert("Project added successfully!");
      setProjectImage(null);
    } catch (error: any) {
      console.error(error);
      alert(
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
      alert(`Client "${data.name}" added successfully!`);
      setClientImage(null);
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An unexpected error occurred";
      console.error(err);
      alert("Failed to add client. " + (errorMessage || "Please try again."));
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
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/admin/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetPasswordError("");
    setResetPasswordSuccess("");

    // Validation
    if (
      !resetPasswordForm.oldPassword ||
      !resetPasswordForm.newPassword ||
      !resetPasswordForm.confirmPassword
    ) {
      setResetPasswordError("All fields are required");
      return;
    }

    if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
      setResetPasswordError("New passwords do not match");
      return;
    }

    if (resetPasswordForm.newPassword.length < 6) {
      setResetPasswordError("New password must be at least 6 characters");
      return;
    }

    setResetPasswordLoading(true);

    try {
      await axios.post(
        `${API}/admin/reset-password`,
        {
          oldPassword: resetPasswordForm.oldPassword,
          newPassword: resetPasswordForm.newPassword,
        },
        { withCredentials: true }
      );

      setResetPasswordSuccess("Password reset successfully!");
      setResetPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => setResetPasswordSuccess(""), 3000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to reset password";
      setResetPasswordError(errorMessage);
    } finally {
      setResetPasswordLoading(false);
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>

              {/* Admin Info */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Admin Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={admin?.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={admin?.name}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Password */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Reset Password
                </h3>

                {resetPasswordError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{resetPasswordError}</p>
                  </div>
                )}

                {resetPasswordSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">
                      {resetPasswordSuccess}
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleResetPassword}
                  className="space-y-4 max-w-md"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={resetPasswordForm.oldPassword}
                      onChange={(e) =>
                        setResetPasswordForm({
                          ...resetPasswordForm,
                          oldPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={resetPasswordForm.newPassword}
                      onChange={(e) =>
                        setResetPasswordForm({
                          ...resetPasswordForm,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={resetPasswordForm.confirmPassword}
                      onChange={(e) =>
                        setResetPasswordForm({
                          ...resetPasswordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetPasswordLoading}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {resetPasswordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
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
    </div>
  );
}
