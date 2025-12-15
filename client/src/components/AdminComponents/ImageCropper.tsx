import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { CroppedAreaPixels } from "@/types";
import { getCroppedImg } from "@/utils/cropImage";
import Slider from "@mui/material/Slider";
import bg from "@/assets/transparent-bg.jpg";

interface Props {
  image: string;
  onCancel: () => void;
  onCropComplete: (croppedImage: File) => void;
  filename?: string;
}

const ImageCropper: React.FC<Props> = ({
  image,
  onCancel,
  onCropComplete,
  filename,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const onCropCompleteHandler = useCallback(
    (_: unknown, croppedPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleDone = async () => {
    if (!croppedAreaPixels) {
      console.log("Cropping area is not defined!");
      return;
    }
    const croppedImage = await getCroppedImg(
      image,
      croppedAreaPixels,
      filename
    );
    if (croppedImage) onCropComplete(croppedImage);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-center items-center p-2 sm:p-4">
      <div
        className="relative w-full sm:w-[90vw] max-w-[280px] sm:max-w-md md:max-w-lg h-[50vh] sm:h-[55vh] md:h-[60vh] shadow p-2 sm:p-3 md:p-4"
        style={{ background: `url(${bg})` }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
        />
      </div>
      <div className="container w-full sm:w-[90vw] max-w-[280px] sm:max-w-md md:max-w-lg bg-black shadow p-3 sm:p-4">
        <div className="mt-2 sm:mt-3 md:mt-4 px-3 sm:px-4 md:px-6">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, val) => setZoom(val as number)}
          />
        </div>
        <div className="flex justify-between gap-2 mt-3 sm:mt-4 px-3 sm:px-4 md:px-6">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded z-50 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="bg-blue-600 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded z-50 hover:bg-blue-700 transition-colors"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
