import React from "react";
import { FaCircleChevronDown, FaPaperPlane } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-4">
      {/* Header */}
      <div className="text-6xl font-black mb-2">Beli Gak Ya?</div>
      <div className="font-light mb-12">Gausah bingung, coba tanya aja</div>

      {/* Form Section 1 */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4 mb-4">
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
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-6xl mb-8">
        <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-950">
          <textarea
            className="w-full resize-none px-4 py-3 text-white focus:outline-none"
            name="purchaseReason"
            id="textareaReason"
            placeholder="Kenapa anda ingin beli barang/produk tersebut?"
            rows={4}
            maxLength={500}
          ></textarea>

          <div className="flex flex-row sm:flex-row justify-between items-center mt-4 gap-4">
            <div className="text-zinc-500 text-base">0/500</div>
            <div className="text-zinc-500 text-sm font-light text-center">
              Data akan terhapus dalam 15 menit
            </div>
            <div className="text-zinc-500 text-base border border-zinc-700 p-4 rounded-lg">
              <FaPaperPlane />
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Finansial */}
      <div className="w-full max-w-6xl mb-8">
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
      </div>
    </div>
  );
}
