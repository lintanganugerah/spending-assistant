import { ReasoningBoxProps } from "../../types/ChatTypes";

export function ReasoningBox({ header, timeElapsed, body }: ReasoningBoxProps) {
  return (
    <div className="flex justify-start">
      <div className="w-full p-4">
        <div className="bg-zinc-950 font-bold p-4 flex gap-4 items-center">
          <p>{header}</p>
          <p className="text-sm font-light">{timeElapsed}s</p>
        </div>
        <div className="bg-zinc-900 p-8 text-zinc-400">{body}</div>
      </div>
    </div>
  );
}
