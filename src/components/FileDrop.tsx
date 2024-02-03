import { imageTypes } from "@/constants";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { DragEvent, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

export function FileDrop({ file, setFile }: any) {
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState('')

  const imageFilter = (imgFile) => {
    if (imgFile?.size > 1024 * 1024 * 5) {
      setError('Maximum image size is 5MB')
      return false
    }
    if (!imageTypes.includes(imgFile?.type)) {
      setError('Only images allowed')
      return false
    }
    return true
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (imageFilter(event.dataTransfer.files[0])) {
      setIsOver(false);
      setFile(event.dataTransfer.files[0]);
    }
  };

  const onUpload = (e) => {
    if (imageFilter(e.target.files?.[0])) {
      setFile(e.target.files?.[0])
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }, [error])

  return (
    <div className="col-span-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-2 relative flex justify-center rounded-lg border border-dashed border-gray-900/25 lg:px-6 lg:py-10 px-2 py-3 cursor-pointer ${isOver ? " bg-gray-100 border-gray-900 border-5 " : ""
          }`}
      >
        {error && <span className="w-full text-center absolute left-1/2 -translate-x-1/2 bottom-3 text-red-600 font-medium text-sm">{error}</span>}
        <div className="text-center">
          {file ? (
            <div className="flex items-center cursor-auto rounded-md py-1 px-2 text-sm bg-slate-200 md:max-w-[280px] max-w-[250px] w-full overflow-hidden">
              <button
                onClick={() => setFile("")}
                className="text-sm p-1.5 mr-2 cursor-pointer"
              >
                <RxCross1 />
              </button>
              <span className="w-full text-sm">{file.name}</span>
            </div>
          ) : (
            <>
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue focus-within:outline-none ring-2 ring-blue focus-within:ring-offset-2 hover:text-blue/70"
                >
                  <span>Choose a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={onUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
