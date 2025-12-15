import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Project, ProjectEditForm } from "../../types";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ProjectManager(props: { API: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectEditForm>({
    mode: "onBlur",
    defaultValues: { category: "", name: "", location: "", imageFile: null },
  });

  const fetchProjects = () => {
    axios.get(`${props.API}/projects`).then((res) => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    reset({
      category: project.category,
      name: project.name,
      location: project.location,
      imageFile: null,
    });
    setPreviewUrl(`${props.API}/${project.image}`);
  };

  const onSubmit: SubmitHandler<ProjectEditForm> = async (data) => {
    if (!editingId) return;

    const updatedFormData = new FormData();
    updatedFormData.append("category", data.category.trim());
    updatedFormData.append("name", data.name.trim());
    updatedFormData.append("location", data.location.trim());

    const file = data.imageFile?.[0];
    if (file) {
      updatedFormData.append("image", file);
    }

    try {
      await axios.put(`${props.API}/projects/${editingId}`, updatedFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project updated successfully.");
      setEditingId(null);
      setPreviewUrl("");
      reset();
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete project?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${props.API}/projects/${id}`);
      toast.success("Project deleted.");
      fetchProjects();
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete project.";
      toast.error(msg);
    }
  };

  const imageInputRegister = register("imageFile", {
    onChange: (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      setPreviewUrl(file ? URL.createObjectURL(file) : "");
    },
  });

  return (
    <section className="bg-white shadow-md rounded-lg p-6 mb-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            📂 Manage Projects
          </h2>
          <p className="text-sm text-gray-500">
            Edit details, update images, or remove projects.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchProjects}
          className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Refresh
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          No projects yet. Add one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {editingId === proj._id ? (
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Category
                      </label>
                      <select
                        className={`mt-1 border p-2 rounded w-full text-sm ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("category", {
                          required: "Category is required",
                        })}
                      >
                        <option value="">Select Category</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Construction">Construction</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Name
                      </label>
                      <input
                        className={`mt-1 border p-2 rounded w-full text-sm ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Project name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Location
                    </label>
                    <input
                      className={`mt-1 border p-2 rounded w-full text-sm ${
                        errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={`${props.API}/${proj.image}`}
                          alt="existing preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...imageInputRegister}
                        ref={(el) => {
                          imageInputRegister.ref(el);
                          fileInputRef.current = el;
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl("");
                          imageInputRegister.onChange?.({
                            target: { files: [] },
                          } as any);
                        }}
                        className="px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setPreviewUrl("");
                        reset();
                      }}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {proj.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {proj.category} • {proj.location}
                      </p>
                    </div>
                    <img
                      src={`${props.API}/${proj.image}`}
                      alt={proj.name}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(proj)}
                      className="px-3 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="px-3 py-2 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
