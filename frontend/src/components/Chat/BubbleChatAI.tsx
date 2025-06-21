import { BubbleChatProps } from "../../types/ChatTypes";
export function BubbleChatAI({ text }: BubbleChatProps) {
  return (
    <div className="flex justify-start">
      <div className=" text-white p-4 rounded-2xl rounded-bl-none break-words">
        {text}
      </div>
    </div>
  );
}
