import { MainPageTitle } from "components/MainPageTitle";
import { FinancialInfo } from "components/FinancialInfo";
import { PurchaseFormFields } from "components/PurchaseFormFields";
import { ChatBox } from "components/Chat/ChatBox";
import {
  ChatBoxSchema,
  ChatBoxType,
  FinancialInfoSchema,
  PurchaseFormSchema,
} from "types/ChatTypes";
import { useState } from "react";
import { ZodIssue } from "zod";

export default function Home() {
  const [reason, setReason] = useState<ChatBoxType>({
    purchaseReason: "",
  });
  const [purchaseFormField, setPurchaseFormField] = useState({
    product: "",
    fundSource: "",
    price: 0,
  });
  const [financialInfo, setFinancialInfo] = useState({
    currentJob: "",
    TotalIncomeMonthly: 0,
    TotalExpenseMonthly: 0,
    MainIncomeSource: "",
    isSaving: "",
    isLoan: "",
  });
  const [formErrors, setFormErrors] = useState<{
    Reason?: Record<string, string>;
    PurchaseForm?: Record<string, string>;
    FinancialInfo?: Record<string, string>;
  }>({});

  const HandleChangePurchaseForm = (field: string, value: string | number) => {
    setPurchaseFormField((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const HandleChangeFinancialInfo = (
    field: string,
    value: string | number | boolean
  ) => {
    //Parse field to Boolean as required from backend
    if (field == "isSaving" || field == "isLoan") {
      value = value === "true";
    }
    setFinancialInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const HandleSubmit = () => {
    const result = {
      Reason: ChatBoxSchema.safeParse(reason),
      PurchaseForm: PurchaseFormSchema.safeParse(purchaseFormField),
      FinancialInfo: FinancialInfoSchema.safeParse(financialInfo),
    };

    const mapZodErrors = (issues: ZodIssue[]): Record<string, string> => {
      const errors: Record<string, string> = {};
      for (const issue of issues) {
        const key = issue.path[0] as string;
        if (key) {
          errors[key] = issue.message;
        }
      }
      return errors;
    };

    const errors: typeof formErrors = {};

    if (!result.Reason.success) {
      errors.Reason = mapZodErrors(result.Reason.error.issues);
    }

    if (!result.PurchaseForm.success) {
      errors.PurchaseForm = mapZodErrors(result.PurchaseForm.error.issues);
    }

    if (!result.FinancialInfo.success) {
      errors.FinancialInfo = mapZodErrors(result.FinancialInfo.error.issues);
    }

    setFormErrors(errors); // ← update ke state jika perlu
    console.log(errors);
  };

  return (
    <>
      {/* Header */}
      <MainPageTitle
        Title="Beli Gak Ya?"
        Subtitle="Gausah bingung, coba tanya aja"
      />

      {/* Form Section 1 */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4 mb-4">
        <PurchaseFormFields
          valueForm={purchaseFormField}
          onChange={HandleChangePurchaseForm}
          Error={formErrors.PurchaseForm}
        />
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-6xl space-y-8">
        <ChatBox
          value={reason}
          onChange={setReason}
          onSubmit={HandleSubmit}
          TextInformationBottom="Data akan terhapus dalam 15 menit"
          Error={formErrors.Reason}
        />
        <FinancialInfo
          data={financialInfo}
          onChange={HandleChangeFinancialInfo}
          Error={formErrors.FinancialInfo}
        />
      </div>
    </>
  );
}
