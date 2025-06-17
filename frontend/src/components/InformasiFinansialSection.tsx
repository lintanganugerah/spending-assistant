import { FaCircleChevronDown } from "react-icons/fa6";

export function InformasiFinansialSection() {
  return (
    <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-950">
      <div className="flex flex-col items-center mb-4">
        <p className="font-bold mb-2">Informasi Finansial</p>
        <p className="font-light text-sm text-center">
          Sertakan data finansial untuk hasil yang lebih akurat. Data
          terenkripsi 256-bit dan anonim, digunakan semata-mata hanya untuk
          analisis saran, serta otomatis dihapus dalam 15 menit.
        </p>
        <FaCircleChevronDown className="hidden" />
      </div>

      <div className="mt-8">
        {/* Financial Input 1 */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="currentJob"
          >
            <option>Pekerjaan sekarang</option>
            <option>Belum Bekerja</option>
            <option>Ibu/Bapak rumah tangga</option>
            <option>Karyawan</option>
            <option>Freelance</option>
          </select>

          <input
            type="number"
            placeholder="Total pendapatan perbulan?"
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="TotalIncomeMonthly"
            min={100}
          />

          <input
            type="number"
            placeholder="Total pengeluaran perbulan?"
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="TotalExpenseMonthly"
            min={100}
          />

          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="MainIncomeSource"
          >
            <option>Pilih sumber pendapatan</option>
            <option value={"Orang tua"}>Orang tua</option>
            <option value={"Pasangan"}>Pasangan</option>
            <option value={"Gaji Utama"}>Gaji Utama</option>
          </select>
        </div>

        {/* Financial Input 2 */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="isSaving"
          >
            <option>Ada tabungan yang bisa digunakan?</option>
            <option value={"true"}>Ya</option>
            <option value={"false"}>Tidak</option>
          </select>

          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="isLoan"
          >
            <option>Apakah ada hutang/paylater?</option>
            <option value={"true"}>Ya</option>
            <option value={"false"}>Tidak</option>
          </select>
        </div>
      </div>
    </div>
  );
}
