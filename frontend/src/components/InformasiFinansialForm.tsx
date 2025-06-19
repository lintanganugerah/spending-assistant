import { FaCircleChevronDown } from "react-icons/fa6";

type InformasiFinansialFormProps = {
  data: {
    currentJob: string;
    TotalIncomeMonthly: number;
    TotalExpenseMonthly: number;
    MainIncomeSource: string;
    isSaving: string;
    isLoan: string;
  };
  onChange: (field: string, value: string | number | boolean) => void;
};

export function InformasiFinansialForm({
  data,
  onChange,
}: InformasiFinansialFormProps) {
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
            value={data.currentJob}
            onChange={(e) => onChange("currentJob", e.target.value)}
          >
            <option disabled>Pilih Pekerjaan sekarang</option>
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
            value={data.TotalIncomeMonthly <= 0 ? "" : data.TotalIncomeMonthly}
            onChange={(e) => onChange("TotalIncomeMonthly", e.target.value)}
          />

          <input
            type="number"
            placeholder="Total pengeluaran perbulan?"
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="TotalExpenseMonthly"
            min={100}
            value={
              data.TotalExpenseMonthly <= 0 ? "" : data.TotalExpenseMonthly
            }
            onChange={(e) => onChange("TotalExpenseMonthly", e.target.value)}
          />

          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="MainIncomeSource"
            value={data.MainIncomeSource}
            onChange={(e) => onChange("MainIncomeSource", e.target.value)}
          >
            <option value={""} disabled>
              Pilih sumber pendapatan
            </option>
            <option>Orang tua</option>
            <option>Pasangan</option>
            <option>Gaji Utama</option>
          </select>
        </div>

        {/* Financial Input 2 */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="isSaving"
            value={data.isSaving.toString()}
            onChange={(e) => onChange("isSaving", e.target.value)}
          >
            <option value={""} disabled>
              Ada tabungan yang bisa digunakan?
            </option>
            <option value={"true"}>Ya</option>
            <option value={"false"}>Tidak</option>
          </select>

          <select
            className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            name="isLoan"
            value={data.isLoan.toString()}
            onChange={(e) => onChange("isLoan", e.target.value)}
          >
            <option value={""} disabled>
              Apakah ada hutang/paylater?
            </option>
            <option value={"true"}>Ya</option>
            <option value={"false"}>Tidak</option>
          </select>
        </div>
      </div>
    </div>
  );
}
