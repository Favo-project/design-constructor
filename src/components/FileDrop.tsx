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

    // Use FileReader to read file content
    // droppedFiles.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     console.log(reader);
    //   };

    //   reader.onerror = () => {
    //     console.error("There was an issue reading the file.");
    //   };

    //   reader.readAsDataURL(file);
    //   return reader;
    // });
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Cover photo
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer ${
          isOver ? " bg-gray-100 border-gray-900 border-5 " : ""
        }`}
      >
        <div className="text-center">
          {file ? (
            <div className="flex items-center cursor-auto rounded-md py-1 px-2 text-sm bg-slate-200">
              <button
                onClick={() => setFile("")}
                className="text-sm p-1.5 mr-2 cursor-pointer"
              >
                <RxCross1 />
              </button>{" "}
              {file.name}
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
