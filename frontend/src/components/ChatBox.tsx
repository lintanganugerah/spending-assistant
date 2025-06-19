import { FaPaperPlane } from "react-icons/fa6";

type ChatBoxProps = {
  MaxWords?: number;
  TextInformationBottom?: string;
  PlaceHolderText?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatBox({
  MaxWords = 500,
  TextInformationBottom,
  PlaceHolderText = "Kenapa anda ingin beli barang/produk tersebut?",
  value,
  onChange,
  onSubmit,
}: ChatBoxProps) {
  return (
    <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-950">
      <textarea
        className="w-full resize-none px-4 py-3 text-white focus:outline-none"
        name="purchaseReason"
        id="textareaReason"
        placeholder={PlaceHolderText}
        rows={4}
        maxLength={MaxWords}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>

      <div className="flex flex-row sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-zinc-500 text-base">
          {value.length}/{MaxWords}
        </div>
        <div className="text-zinc-500 text-sm font-light text-center">
          {TextInformationBottom}
        </div>
        <div className="text-zinc-500 text-base border border-zinc-700 p-4 rounded-lg">
          <button onClick={onSubmit}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
