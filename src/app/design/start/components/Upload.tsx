import UploadGuide from "./UploadGuid";
import { FileDrop } from "@/components/FileDrop";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File>();
  const [userRights, setUserRights] = useState(false);

  return (
    <div id="w-full py-4 px-4">
      <UploadGuide />
      <div>
        <FileDrop setFile={setFile} file={file} />
        <div className="flex items-center py-4">
          <input
            onChange={() => setUserRights(!userRights)}
            type="checkbox"
            name="user-rights"
            id="user-rights"
            className="block w-10 h-10 mr-3"
          />
          <label htmlFor="user-rights">
            By uploading the image, I agree that I have the legal right to
            reproduce and sell the design, and that I am in full compliance with
            Bonfire’s Terms of Use.
          </label>
        </div>
        <button
          disabled={!userRights || !file}
          className="p-4 w-full justify-center items-center text-slate-100 bg-indigo-600 bg-opacity-75 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
