type PurchaseFormFieldsProps = {
  valueForm: {
    product: string;
    fundSource: string;
    price: number;
  };
  onChange: (field: string, value: string | number) => void;
};

export function PurchaseFormFields({
  valueForm,
  onChange,
}: PurchaseFormFieldsProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Apa yang akan anda beli?"
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="product"
        value={valueForm.product}
        onChange={(e) => onChange("product", e.target.value)}
        maxLength={50}
      />

      <select
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        name="fundSource"
        value={valueForm.fundSource}
        onChange={(e) => onChange("fundSource", e.target.value)}
      >
        <option>Asal Dana Pembelian</option>
        <option>Tabungan</option>
        <option>Dana Pribadi</option>
        <option>Investasi</option>
      </select>

      <input
        type="number"
        placeholder="Berapa harga nya?"
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="price"
        min={1}
        value={valueForm.price <= 0 ? "" : valueForm.price}
        onChange={(e) => onChange("price", e.target.value)}
      />
    </>
  );
}
