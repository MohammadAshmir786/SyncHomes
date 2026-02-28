export const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const PLACEHOLDER_IMAGE = ({
  length,
  width,
  text,
}: {
  length: number;
  width: number;
  text: string;
}) =>
  `https://placehold.co/${length}x${width}?text=${encodeURIComponent(text)}`;
