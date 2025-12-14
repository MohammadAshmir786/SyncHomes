import { useState } from "react";
import axios from "axios";
import { API } from "../Constants";
import ErrorBox from "../ErrorBox";

interface EditAdminNameProps {
  currentName: string;
  onSuccess: (newName: string) => void;
  onCancel: () => void;
}

export default function EditAdminName({
  currentName,
  onSuccess,
  onCancel,
}: EditAdminNameProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [name, setName] = useState(currentName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    if (name === currentName) {
      setError("Please enter a different name");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        `${API}/admin/profile`,
        { name: name.trim() },
        { withCredentials: true }
      );

      setSuccess("Name updated successfully!");

      setTimeout(() => {
        onSuccess(name.trim());
      }, 1500);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to update name";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <ErrorBox title="Error" message={error} className="mb-4" />}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-semibold">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Admin Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            disabled={loading}
            placeholder="Enter admin name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            This is the name displayed in the dashboard
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || name === currentName}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? "Updating..." : "Update Name"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
