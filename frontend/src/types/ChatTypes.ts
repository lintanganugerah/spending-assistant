import { z } from "zod";

export const PurchaseFormSchema = z
  .object({
    product: z.string().min(1),
    fundSource: z.string().min(1),
    price: z.number().int().positive(),
  })
  .required();

export const ChatBoxSchema = z
  .object({
    purchaseReason: z
      .string()
      .min(1)
      .max(Number(import.meta.env.VITE_MAX_CHAT_CHAR)),
  })
  .required();

export const FinancialInfoSchema = z
  .object({
    currentJob: z.string().min(1),
    TotalIncomeMonthly: z.number().int().positive(),
    TotalExpenseMonthly: z.number().int().positive(),
    MainIncomeSource: z.string().min(1),
    isSaving: z.string().min(1),
    isLoan: z.string().min(1),
  })
  .required();

export type FinancialInfoType = z.infer<typeof FinancialInfoSchema>;
export type ChatBoxType = z.infer<typeof ChatBoxSchema>;
export type PurhcaseFormFieldType = z.infer<typeof PurchaseFormSchema>;
