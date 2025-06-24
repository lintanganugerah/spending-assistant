export type FinancialInfoProps = {
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
