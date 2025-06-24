import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FinancialInfoProps } from "types/ComponentProps/FinancialInfoProps";

export function FinancialInfo({ data, onChange, Error }: FinancialInfoProps) {
  const [isBoxFormVisibile, setIsBoxFormVisible] = useState(false);

  const handleBoxFormVisible = () => {
    setIsBoxFormVisible(!isBoxFormVisibile);
  };

  useEffect(() => {
    if (Error && Object.keys(Error).length > 0) {
      handleBoxFormVisible();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Error]);
  return (
    <div
      className={`p-4 rounded-x ${
        isBoxFormVisibile ? "border border-zinc-500 form-color rounded-2xl" : ""
      }`}
    >
      <div className="flex flex-col items-center">
        <p className="font-bold mb-2">Informasi Finansial</p>
        {isBoxFormVisibile && (
          <p className="font-light text-sm text-center">
            Sertakan data finansial untuk hasil yang lebih akurat. Data
            terenkripsi 256-bit dan anonim, digunakan semata-mata hanya untuk
            analisis saran, serta otomatis dihapus dalam 15 menit.
          </p>
        )}
        <FaChevronDown
          className={`cursor-pointer ${isBoxFormVisibile ? "hidden" : "block"}`}
          onClick={handleBoxFormVisible}
        />
      </div>

      {isBoxFormVisibile && (
        <>
          <div
            className="mt-8 transition-all duration-500"
            id="financial-form-box"
          >
            {/* Financial Input 1 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-1 w-full">
                <select
                  className="px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
                {Error?.currentJob && (
                  <p className="text-sm font-light text-red-500">
                    {Error?.currentJob}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <input
                  type="number"
                  placeholder="Total pendapatan perbulan?"
                  className="flex-1 px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  name="TotalIncomeMonthly"
                  min={100}
                  value={
                    data.TotalIncomeMonthly <= 0 ? "" : data.TotalIncomeMonthly
                  }
                  onChange={(e) =>
                    onChange("TotalIncomeMonthly", e.target.value)
                  }
                />
                {Error?.TotalIncomeMonthly && (
                  <p className="text-sm font-light text-red-500">
                    {Error?.TotalIncomeMonthly}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <input
                  type="number"
                  placeholder="Total pengeluaran perbulan?"
                  className="flex-1 px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  name="TotalExpenseMonthly"
                  min={100}
                  value={
                    data.TotalExpenseMonthly <= 0
                      ? ""
                      : data.TotalExpenseMonthly
                  }
                  onChange={(e) =>
                    onChange("TotalExpenseMonthly", e.target.value)
                  }
                />
                {Error?.TotalExpenseMonthly && (
                  <p className="text-sm font-light text-red-500">
                    {Error?.TotalExpenseMonthly}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <select
                  className="flex-1 px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
                {Error?.MainIncomeSource && (
                  <p className="text-sm font-light text-red-500">
                    {Error?.MainIncomeSource}
                  </p>
                )}
              </div>
            </div>

            {/* Financial Input 2 */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex flex-col gap-1 w-full">
                <select
                  className="flex-1 px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
                {Error?.isSaving && (
                  <p className="text-sm font-light text-red-500">
                    {Error?.isSaving}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <select
                  className="flex-1 px-4 py-3 rounded-lg form-color text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
                {Error?.isLoan && (
                  <p className="text-sm font-light text-red-500">
                    {Error?.isLoan}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <FaChevronUp
              className={`cursor-pointer ${
                isBoxFormVisibile ? "block" : "hidden"
              }`}
              onClick={handleBoxFormVisible}
            />
          </div>
        </>
      )}
    </div>
  );
}
