/**
 * Responsibility : Memberikan klasifikasi apakah barang termasuk kebutuhan/keinginan, apakah ada alternatif jika dana pas pasan?
 * Models : High Reasoning Model yet fast
 */

const config = require("@config/index.config");
const sendEvent = require("@utils/sendEventSSE.utils");
const {
  streamResponseModel,
  extractResponseJson,
} = require("@utils/responseModel.utils");
const { FinancialAgentSchema } = require("@schema/agentResponse.schema");
const logger = require("@library/logger/logger.library");

const financialAgentsPrompt = config.prompt.FINANCIAL_AGENTS.system;
const financialAgentsOutput = config.prompt.FINANCIAL_AGENTS.structured_output;
const financialAgentsModel =
  config.ai.finacialAgentsModel || config.ai.baseModel;

async function getReasoning(chatID, data, res) {
  try {
    let userPrompt = buildUserPrompt(data);

    let attempt = 0;
    const maxTries = config.ai.maxTries;

    while (attempt <= maxTries) {
      attempt++;
      const response = await streamResponseModel(
        res,
        chatID,
        financialAgentsModel,
        "financial",
        financialAgentsPrompt,
        financialAgentsOutput,
        userPrompt
      );

      const cleaned = extractResponseJson(response);
      //validasi response AI dalam bentuk JSON apakah properti sudah sesuai
      const { value: validated, error } =
        FinancialAgentSchema.validate(cleaned);

      if (!error) {
        return validated;
      }

      logger.warn(`FINANCIAL AGENTS RESPONSE ERROR : ${error}`);
      userPrompt = `Response anda memiliki error : ${error}. Perbaiki response anda ini dalam JSON format. Ini adalah reponse anda sebelumnya : ${response}. Data query user : ${userPrompt}`;
    }

    sendEvent(res, "Stop", {
      type: "error",
      message: `Failed to get valid AI response after ${config.ai.maxTries} attempts.`,
    });

    return res.status(500).end();
  } catch (error) {
    sendEvent(res, "Stop", {
      type: "error",
      message: "Inernal Server Error Occured.",
    });
    console.error(error);
    return res.status(500).end();
  }
}

function buildUserPrompt(data) {
  const loanInfo = data.financialBackground.isLoan
    ? `Total Hutang Rp. ${data.financialBackground.totalLoan}, tenor ${data.financialBackground.loanTerm} bulan.`
    : `Tidak memiliki hutang.`;
  const userPrompt = `Barang yang akan dibeli adalah ${
    data.product
  } dengan harga ${
    data.productPrice || "Tidak disertakan user"
  } yang akan dibeli dengan duit dari ${
    data.fundSource
  }. Alasan user ingin membeli barang tersebut : ${
    data.purchaseReason
  }. Berikut data finansial dia : 
        pekerjaan saat ini : ${
          data.financialBackground.currentJob
        }, Total Pendapatan bulanan : Rp.${
    data.financialBackground.TotalIncomeMonthly
  }, Total Pengeluaran Bulanan : Rp. ${
    data.financialBackground.TotalExpenseMonthly
  }, Sumber pendapatan utama : ${
    data.financialBackground.MainIncomeSource
  }, Status Menabung  : ${
    data.financialBackground.isSaving
  }, Total tabungan : Rp. ${
    data.financialBackground.TotalSaving || "Tidak ada tabungan"
  }, dengan ${loanInfo}`;

  return userPrompt;
}

module.exports = { getReasoning };
