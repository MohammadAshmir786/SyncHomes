import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProjectFormInput, AddProjectProps } from "../../types";

export default function AddProject({
  onImageSelect,
  projectImageError,
  onImageErrorClear,
  onSubmit,
}: AddProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormInput>({
    mode: "onBlur",
    defaultValues: { name: "", category: "" },
  });

  const handleFormSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    onImageErrorClear();
    await onSubmit(data);
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
          <input
            type="file"
            className={`border p-2 w-full ${
              projectImageError ? "border-red-500" : "border-gray-300"
            }`}
            accept="image/*"
            onChange={onImageSelect}
          />
          {projectImageError && (
            <p className="text-red-500 text-sm mt-1 h-5">{projectImageError}</p>
          )}
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
