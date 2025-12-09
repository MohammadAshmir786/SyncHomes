import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface ClientFormInput {
  name: string;
  description: string;
  designation: string;
}

interface AddClientProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clientImageError: string;
  onImageErrorClear: () => void;
  onSubmit: SubmitHandler<ClientFormInput>;
}

export default function AddClient({
  onImageSelect,
  clientImageError,
  onImageErrorClear,
  onSubmit,
}: AddClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormInput>({
    mode: "onBlur",
    defaultValues: { name: "", description: "", designation: "" },
  });

  const handleFormSubmit: SubmitHandler<ClientFormInput> = async (data) => {
    onImageErrorClear();
    await onSubmit(data);
  };

  return (
    <section className="mb-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">➕ Add Client</h2>
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
            placeholder="Client Name"
            {...register("name", { required: "Client name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            className={`border p-2 w-full ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Description"
            {...register("description", {
              required: "Client description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            className={`border p-2 w-full ${
              errors.designation ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Designation"
            {...register("designation", {
              required: "Client designation is required",
            })}
          />
          {errors.designation && (
            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.designation.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="file"
            className={`border p-2 w-full ${
              clientImageError ? "border-red-500" : "border-gray-300"
            }`}
            accept="image/*"
            onChange={onImageSelect}
          />
          {clientImageError && (
            <p className="text-red-500 text-sm mt-1 h-5">{clientImageError}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Client
        </button>
      </form>
    </section>
  );
}
