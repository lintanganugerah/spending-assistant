import { FaPaperPlane } from "react-icons/fa6";
import { ChatBoxProps } from "types/ComponentProps/ChatComponentProps";

export function ChatBox({
  MaxWords = import.meta.env.VITE_MAX_CHAT_CHAR,
  TextInformationBottom,
  PlaceHolderText = "Kenapa anda ingin beli barang/produk tersebut?",
  MaxRows = 4,
  value,
  onChange,
  onSubmit,
  Error,
}: ChatBoxProps) {
  return (
    <div className="p-4 rounded-xl border border-zinc-500 form-color">
      <textarea
        className={`w-full resize-none px-4 py-3 text-white focus:outline-none`}
        name="purchaseReason"
        id="textareaReason"
        placeholder={PlaceHolderText}
        rows={MaxRows}
        maxLength={MaxWords}
        value={value.purchaseReason}
        onChange={(e) => onChange({ purchaseReason: e.target.value })}
      ></textarea>
      {Error?.purchaseReason && (
        <p className="text-sm font-light text-red-500">
          {Error?.purchaseReason}
        </p>
      )}

      <div className="flex flex-row sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-zinc-500 text-base">
          {value.purchaseReason.length}/{MaxWords}
        </div>
        <div className="text-zinc-500 text-sm font-light text-center">
          {TextInformationBottom}
        </div>
        <div
          onClick={onSubmit}
          className="cursor-pointer flex text-zinc-500 border border-zinc-500 p-4 items-center rounded-lg"
        >
          <button className="cursor-pointer">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
