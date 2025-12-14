import type { SubmitHandler } from "react-hook-form";

export interface Project {
  _id: string;
  category: string;
  name: string;
  location: string;
  image: File | null;
}

export interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: File | null;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export interface Subscriber {
  _id: string;
  email: string;
}

export interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ClientFormInput {
  name: string;
  description: string;
  designation: string;
}

export interface ProjectFormInput {
  category: string;
  name: string;
  location: string;
}

export interface ProjectEditForm {
  category: string;
  name: string;
  location: string;
  imageFile: FileList | null;
}

export interface AddProjectProps {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDrop: (file: File) => void;
  projectImageError: string;
  onImageErrorClear: () => void;
  onSubmit: SubmitHandler<ProjectFormInput>;
  selectedImageName?: string;
}

export interface btnProps {
  text: string;
  className?: string;
  onClick?: () => void;
}
