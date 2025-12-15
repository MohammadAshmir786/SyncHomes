import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { ProjectFormInput, AddProjectProps } from "@/types";

export default function AddProject({
  onImageSelect,
  onImageDrop,
  projectImageError,
  onImageErrorClear,
  onSubmit,
  selectedImageName,
}: AddProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormInput>({
    mode: "onBlur",
    defaultValues: { name: "", category: "" },
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleFormSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    onImageErrorClear();
    await onSubmit(data);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageErrorClear();
      onImageDrop(file);
    }
  };

  return (
    <section className="mb-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">➕ Add Project</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 gap-2"
      >
        <div>
          <input
            type="text"
            className={`border p-2 w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Project Name"
            {...register("name", { required: "Project name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <select
            className={`border p-2 rounded w-full ${
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
            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            className={`border p-2 w-full ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Project location"
            {...register("location", {
              required: "Project location is required",
            })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <div
            className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-4 text-sm text-gray-600 transition-colors cursor-pointer ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${projectImageError ? "border-red-500" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                onImageErrorClear();
                onImageSelect(e);
              }}
            />
            <p className="font-semibold">Drag & drop project image</p>
            <p className="text-xs text-gray-500">or click to browse</p>
            {projectImageError && (
              <p className="text-red-500 text-xs mt-2">{projectImageError}</p>
            )}
            {selectedImageName && (
              <p className="text-xs text-gray-700 mt-2">
                Selected: {selectedImageName}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>
    </section>
  );
}
