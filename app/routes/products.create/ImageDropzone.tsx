import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";

/**
 * ImageDropzone component for handling image uploads.
 * Allows users to drag and drop images or select them via file input.
 * Displays uploaded images with the option to remove them.
 */
const ImageDropzone = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files].filter((file) =>
      file.type.startsWith("image/"),
    );
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? [...event.target.files] : [];
    const filteredFiles = files.filter((file) =>
      file.type.startsWith("image/"),
    );
    const imageUrls = filteredFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const removeImage = (url: string) => {
    setImages(images.filter((image) => image !== url));
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <CloudArrowUpIcon className="mb-2 size-8 text-gray-600" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            className="sr-only"
            aria-labelledby="file-label"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`upload preview ${index}`}
              className="h-44 w-auto"
            />
            <button
              className="absolute right-0 top-0 rounded-full bg-white p-1"
              onClick={() => removeImage(image)}
              type="button"
            >
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </button>
            <input type="hidden" name="product_images" value={image} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageDropzone;
