import ImageCropper from "./ImageCropper";

interface ImageCropperModalProps {
  imageToCrop: string | null;
  croppingType: "project" | "client" | null;
  onCancel: () => void;
  onCropComplete: (croppedImage: File) => void;
  filename?: string;
}

export default function ImageCropperModal({
  imageToCrop,
  croppingType,
  onCancel,
  onCropComplete,
  filename,
}: ImageCropperModalProps) {
  if (!imageToCrop || !croppingType) {
    document.body.style.overflow = "auto";
    return null;
  }

  document.body.style.overflow = "hidden";

  return (
    <ImageCropper
      image={imageToCrop}
      onCancel={onCancel}
      onCropComplete={onCropComplete}
      filename={filename}
    />
  );
}
