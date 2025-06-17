export function FormQuery() {
  return (
    <>
      <input
        type="text"
        placeholder="Apa yang akan anda beli?"
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="product"
        maxLength={50}
      />

      <select
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        name="fundSource"
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
      />
    </>
  );
}
