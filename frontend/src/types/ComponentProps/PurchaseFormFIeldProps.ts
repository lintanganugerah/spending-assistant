export type PurchaseFormFieldsProps = {
  valueForm: {
    product: string;
    fundSource: string;
    price: number;
  };
  Error?: Record<string, string> | undefined;
  onChange: (field: string, value: string | number) => void;
};
