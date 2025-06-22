import { MainPageTitle } from "./../components/MainPageTitle";
import { FinancialInfo } from "../components/FinancialInfo";
import { PurchaseFormFields } from "../components/PurchaseFormFields";
import { ChatBox } from "../components/Chat/ChatBox";
import { useState } from "react";

export default function Home() {
  const [reason, setReason] = useState("");
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
    window.alert(JSON.stringify(financialInfo));
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
        />
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-6xl space-y-8">
        <ChatBox
          value={reason}
          onChange={setReason}
          onSubmit={HandleSubmit}
          TextInformationBottom="Data akan terhapus dalam 15 menit"
        />
        <FinancialInfo
          data={financialInfo}
          onChange={HandleChangeFinancialInfo}
        />
      </div>
    </>
  );
}
