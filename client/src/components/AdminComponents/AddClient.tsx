import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface ClientFormInput {
  name: string;
  description: string;
  designation: string;
}

interface AddClientProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDrop: (file: File) => void;
  clientImageError: string;
  onImageErrorClear: () => void;
  onSubmit: SubmitHandler<ClientFormInput>;
  selectedImageName?: string;
}

export default function AddClient({
  onImageSelect,
  onImageDrop,
  clientImageError,
  onImageErrorClear,
  onSubmit,
  selectedImageName,
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

  const [isDragging, setIsDragging] = useState(false);

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
          <div
            className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-4 text-sm text-gray-600 transition-colors cursor-pointer ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${clientImageError ? "border-red-500" : ""}`}
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
            <p className="font-semibold">Drag & drop client image</p>
            <p className="text-xs text-gray-500">or click to browse</p>
            {clientImageError && (
              <p className="text-red-500 text-xs mt-2">{clientImageError}</p>
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
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Client
        </button>
      </form>
    </section>
  );
}
