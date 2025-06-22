import { FaPaperPlane } from "react-icons/fa6";
import { ChatBoxProps } from "../../types/ComponentProps/ChatComponentProps";

export function ChatBox({
  MaxWords = 500,
  TextInformationBottom,
  PlaceHolderText = "Kenapa anda ingin beli barang/produk tersebut?",
  MaxRows = 4,
  value,
  onChange,
  onSubmit,
}: ChatBoxProps) {
  return (
    <div className="p-4 rounded-xl border border-zinc-500 form-color">
      <textarea
        className="w-full resize-none px-4 py-3 text-white focus:outline-none"
        name="purchaseReason"
        id="textareaReason"
        placeholder={PlaceHolderText}
        rows={MaxRows}
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
        <div className="flex text-zinc-500 border border-zinc-500 p-4 items-center rounded-lg">
          <button type="submit" onClick={onSubmit}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
