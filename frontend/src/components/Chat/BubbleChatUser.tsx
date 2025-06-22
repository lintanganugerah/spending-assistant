import { BubbleChatProps } from "../../types/ComponentProps/ChatComponentProps";
export function BubbleChatUser({ text }: BubbleChatProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-zinc-800 text-white p-4 rounded-2xl max-w-9/12 rounded-br-none break-words">
        {text}
      </div>
    </div>
  );
}
