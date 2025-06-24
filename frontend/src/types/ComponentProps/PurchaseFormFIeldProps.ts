export type PurchaseFormFieldsProps = {
  valueForm: {
    product: string;
    fundSource: string;
    price: number;
  };
  onChange: (field: string, value: string | number) => void;
};
