import { PurchaseFormFieldsProps } from "types/ComponentProps/PurchaseFormFIeldProps";

export function PurchaseFormFields({
  valueForm,
  onChange,
  Error,
}: PurchaseFormFieldsProps) {
  return (
    <>
      {/* Product Field */}
      <div className="flex flex-col gap-1 w-full">
        <input
          type="text"
          placeholder="Apa yang akan anda beli?"
          className="px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="product"
          value={valueForm.product}
          onChange={(e) => onChange("product", e.target.value)}
          maxLength={50}
        />
        {Error?.product && (
          <p className="text-sm font-light text-red-500">{Error.product}</p>
        )}
      </div>

      {/* Fund Source Field */}
      <div className="flex flex-col gap-1 w-full">
        <select
          className="px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          name="fundSource"
          value={valueForm.fundSource}
          onChange={(e) => onChange("fundSource", e.target.value)}
        >
          <option disabled value="">
            Asal Dana Pembelian
          </option>
          <option>Tabungan</option>
          <option>Dana Pribadi</option>
          <option>Investasi</option>
        </select>
        {Error?.fundSource && (
          <p className="text-sm font-light text-red-500">{Error.fundSource}</p>
        )}
      </div>

      {/* Price Field */}
      <div className="flex flex-col gap-1 w-full">
        <input
          type="number"
          placeholder="Berapa harga nya?"
          className="px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="price"
          min={1}
          value={valueForm.price <= 0 ? "" : valueForm.price}
          onChange={(e) => onChange("price", e.target.value)}
        />
        {Error?.price && (
          <p className="text-sm font-light text-red-500">{Error.price}</p>
        )}
      </div>
    </>
  );
}
