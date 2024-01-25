import { PhotoIcon } from "@heroicons/react/24/outline";
import { DragEvent, useState } from "react";
import { RxCross1 } from "react-icons/rx";

export function FileDrop({ file, setFile }: any) {
  const [isOver, setIsOver] = useState(false);

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
    setIsOver(false);
    setFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="col-span-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 lg:px-6 lg:py-10 px-2 py-3 cursor-pointer ${isOver ? " bg-gray-100 border-gray-900 border-5 " : ""
          }`}
      >
        <div className="text-center">
          {file ? (
            <div className="flex items-center cursor-auto rounded-md py-1 px-2 text-sm bg-slate-200 md:max-w-[280px] lg:max-w-sm max-w-[250px] w-full overflow-hidden">
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
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none ring-2 ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Choose a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
