import React from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  value: string | number;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  defaultValue?: string;
  disabled?: boolean;
}

const Input: React.FC<InputFieldProps> = ({
  label = "",
  placeholder = "",
  type = "text",
  className = "",
  value,
  name,
  required = false,
  min,
  onChange = () => {},
  disabled = false,
  defaultValue = "",
  onBlur = () => {},
}) => {
  return (
    <div className="w-full">
      <label htmlFor={label} className="block mb-[10px]">
        {label}
      </label>
      <input
        min={type === "number" ? min : ""}
        type={type}
        // id={label}
        className={`w-full px-[16px] py-[12px] text-title bg-bg100 dark:bg-bg100 border dark:border-border rounded-md ${className}`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
