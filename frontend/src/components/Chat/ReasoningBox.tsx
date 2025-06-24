import { FaChevronDown } from "react-icons/fa";
import { ReasoningBoxProps } from "types/ComponentProps/ChatComponentProps";
import { useState } from "react";

export function ReasoningBox({ header, timeElapsed, body }: ReasoningBoxProps) {
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  const toggleBody = () => {
    setIsBodyVisible(!isBodyVisible);
  };
  return (
    <div className="flex justify-start">
      <div className="w-full">
        <div
          className="form-color font-bold p-4 flex items-center text-white justify-between"
          id="header"
        >
          <div className="flex flex-row items-center gap-4">
            <p>{header}</p>
            <p className="text-sm font-light">{timeElapsed}s</p>
          </div>
          <FaChevronDown
            onClick={toggleBody}
            className={`cursor-pointer transform transition-transform duration-500 ${
              isBodyVisible ? "rotate-180" : ""
            }`}
          />
        </div>
        {isBodyVisible && (
          <div
            className="bg-zinc-900 p-8 text-zinc-400 transition-all duration-500"
            id="body"
          >
            {body}
          </div>
        )}
      </div>
    </div>
  );
}
