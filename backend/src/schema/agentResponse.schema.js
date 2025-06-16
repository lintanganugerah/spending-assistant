const joi = require("joi");

const FinancialAgentSchema = joi.object({
  klasifikasi: joi
    .string()
    .lowercase()
    .valid("kebutuhan", "keinginan")
    .required(),
  sub_klasifikasi: joi
    .string()
    .lowercase()
    .valid("primer", "sekunder", "tersier", "besar", "kecil"),
  alasan: joi.string().required(),
  keterjangkauan: joi.string().lowercase().required(),
  nilai_jangka_panjang: joi.string().lowercase().required(),
});

const EmotionAgentSchema = joi.object({
  emosi: joi
    .string()
    .lowercase()
    .valid("impulsif", "tidak impulsif", "non-impulsif", "non impulsif")
    .required(),
  alasan: joi.string().required(),
});

module.exports = { FinancialAgentSchema, EmotionAgentSchema };
