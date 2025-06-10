const joi = require("joi");

//Produk yang ingin di beli
//Harga produk (optional)
//Mengapa ingin membeli?
//Membeli dari sumber pendapatan mana? Pendapatan tetap, tabungan, atau hasil investasi?

/*
  * Data financial Guest disimpan di redis, dan user di postgresql:
    financialBackgroundound: {
      currentJob: String (Pelajar/Karyawan/Pemilik Bisnis/Freelance/Belum Bekerja/Lainnya),
      TotalIncomeMonthly: Int,
      TotalExpenseMonthly: Int,
      MainIncomeSource: String (Gaji Pekerjaan/Orang tua atau pasangan/Hasil Side Job),
      isSaving: Bool,
      TotalSaving: Nullable Int,
      isLoan : Bool,
      TotalLoan : Int (Harus kosong/tidak dikirim jika isLoan False),
      LoanTerm: Int (in Months dan Harus kosong/tidak dikirim jika isLoan False),
    },
  * Chat Guest hanya bisa satu chat saja! Sehingga bentuk data nya :
    purchaseIntent: {
      PurchaseReason : Text,
      Product: String,
      ProductPrice: Nullable Int,
      BuyFrom: String (Tabungan/Gaji),
    },
    * Expire 15 minutes untuk guest. User cache tdk expire
    * Untuk Data ini Key nya = guest:data:{keyID}
  * Data chat User disimpan ke PostgreSQL:
    id : RandomUUID();
    UserId: Reference table User.id;
    financialBackgroundound: Reference table financialBackgroundound.id,
    PurchaseReason : text;
    Product: string,
    ProductPrice: Nullable Interger,
 */

const UserfinancialBackgroundoundSchema = joi.object({
  currentJob: joi
    .string()
    .lowercase()
    .valid(
      "pelajar",
      "karyawan",
      "pemilik bisnis",
      "freelance",
      "belum bekerja",
      "lainnya"
    )
    .required(),
  TotalIncomeMonthly: joi.number().required(),
  TotalExpenseMonthly: joi.number().required(),
  MainIncomeSource: joi
    .string()
    .lowercase()
    .valid("gaji pekerjaan", "orang tua atau pasangan", "hasil side job")
    .required(),
  isSaving: joi.boolean().required(),
  TotalSaving: joi.number().when("isSaving", {
    is: true,
    then: joi.required(),
    otherwise: joi.forbidden(), //If isSaving false, then totalsaving are forbidden to exist. Return error if this exist && isSaving false
  }),
  isLoan: joi.boolean().required(),
  TotalLoan: joi.number().when("isLoan", {
    is: true,
    then: joi.required(),
    otherwise: joi
      .forbidden()
      .error(
        () =>
          new Error(
            "Total Loan Must Be Empty if isLoan false and type of number"
          )
      ),
  }),
  LoanTerm: joi.number().when("isLoan", {
    is: true,
    then: joi.required(),
    otherwise: joi
      .forbidden()
      .error(
        () =>
          new Error(
            "Loan Term Must Be Empty if isLoan false and type of number"
          )
      ),
  }),
});

const UserNewChatSchema = joi.object({
  userID: joi.string().required(),
  purchaseReason: joi.string().required(),
  product: joi.string().required(),
  productPrice: joi.number().optional().allow(""),
  fundSource: joi
    .string()
    .lowercase()
    .valid("gaji", "tabungan atau investasi", "dana pribadi")
    .required(),
  financialBackground: UserfinancialBackgroundoundSchema.required(),
});

const UserContinueChatSchema = joi.object({
  userID: joi.string().required(),
  chatID: joi.string().required(),
  lastChatSummary: joi.string().required(),
  message: joi.string().required(),
});

module.exports = {
  UserNewChatSchema,
  UserfinancialBackgroundoundSchema,
  UserContinueChatSchema,
};
