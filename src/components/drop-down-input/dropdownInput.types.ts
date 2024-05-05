export type DropDownOption = {
  value: string | number;
  label: string;
};

export type DropdownValueType = "number" | "string";

export type DropdownInputProps = {
  label: string;
  options: DropDownOption[];
  value: any;
  onChange: (x: string) => void;
  multiple?: boolean;
};
