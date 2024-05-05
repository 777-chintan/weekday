import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DropdownInputProps } from "./dropdownInput.types";

const DropdownInput = ({
  label,
  value,
  onChange,
  options,
  multiple = false,
}: DropdownInputProps) => {
  const onHandleChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    onChange(e.target.value as string);
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        value={value}
        label={label}
        onChange={onHandleChange}
        multiple={multiple}
        sx={{ width: "100%" }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownInput;
