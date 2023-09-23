import { useState } from "react";

export default function Text() {
  const [text, setText] = useState("");

  return (
    <div id="w-full py-4 px-4">
      <div className="col-span-full">
        <div className="mt-2">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            id="design-text"
            name="text"
            placeholder="Your text"
            rows={4}
            className="block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
          ></textarea>
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Write text to design your campaign.
        </p>
      </div>
    </div>
  );
}
