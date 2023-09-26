import UploadGuide from "./UploadGuid";
import { FileDrop } from "@/components/FileDrop";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File>();

  console.log(file);

  return (
    <div id="w-full py-4 px-4">
      <UploadGuide />
      <div>
        <FileDrop setFile={setFile} file={file} />
      </div>
    </div>
  );
}
