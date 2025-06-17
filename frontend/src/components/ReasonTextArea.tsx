import { FaPaperPlane } from "react-icons/fa6";

type ReasonTextAreaProps = {
  MaxWords?: number;
  TextInformationBottom?: string;
  PlaceHolderText?: string;
};

export function ReasonTextArea({
  MaxWords = 500,
  TextInformationBottom,
  PlaceHolderText = "Kenapa anda ingin beli barang/produk tersebut?",
}: ReasonTextAreaProps) {
  return (
    <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-950">
      <textarea
        className="w-full resize-none px-4 py-3 text-white focus:outline-none"
        name="purchaseReason"
        id="textareaReason"
        placeholder={PlaceHolderText}
        rows={4}
        maxLength={MaxWords}
      ></textarea>

      <div className="flex flex-row sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-zinc-500 text-base">0/{MaxWords}</div>
        <div className="text-zinc-500 text-sm font-light text-center">
          {TextInformationBottom}
        </div>
        <div className="text-zinc-500 text-base border border-zinc-700 p-4 rounded-lg">
          <FaPaperPlane />
        </div>
      </div>
    </div>
  );
}
