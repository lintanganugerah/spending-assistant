const { UserfinancialBackgroundoundSchema } = require("@schema/chat.schema");
const Joi = require("joi");
const {
  setGuestFinancialBackground,
  getGuestFinancialBackground,
} = require("@database/redis/handler/guestRedis.handler");
const checkReqBody = require("@utils/checkReqBody.utils");

//Mengenai informasi latar belakang si user

//Pekerjaan saat ini? Mahasiswa or pelajar/Karyawan/Pemilik Bisnis/Freelance/Belum Bekerja/Lainnya
//Total Pemasukan Perbulan?
//Pengeluaran tetap perbulan? Biasanya dipakai untuk apa? (Teks max 200 kata)
//Sumber Pendapatan Utama? Pilih satu: Gaji Pekerjaan/Orang tua atau pasangan/Hasil Side Job
//Apakah kamu punya tabungan atau investasi saat ini? Kalau iya, berapa kira-kira totalnya (Int) dan tujuan tabungan/Invest (Deksriptif/String) ?
//Apakah kamu punya cicilan atau paylater aktif saat ini?
//Jika ada, berapa total, dan masih berapa lama lagi?

//Data anda akan dihapus dalam 24 Jam secara otomatis. Data disimpan secara anonim, dan terenkripsi.
//(CheckBox) Simpan data keuangan saya. Data akan disimpan tanpa nama, dan terenkripsi. Data tidak akan digunakan untuk iklan atau dijual. Data ini digunakan untuk meningkatkan aplikasi

exports.getFinancialBackground = async (req, res) => {
  const financialBg = await getGuestFinancialBackground(req.identity.id);
  return res.status(200).send({
    success: true,
    data: financialBg,
  });
};

exports.setFinancialBackground = async (req, res) => {
  const dataBody = checkReqBody(req.body);

  const validated = await UserfinancialBackgroundoundSchema.validateAsync(
    dataBody
  );

  if (req.identity.role == "guest") {
    await setGuestFinancialBackground(req.identity.id, validated);
  }

  return res.status(200).send({
    success: true,
  });
};
