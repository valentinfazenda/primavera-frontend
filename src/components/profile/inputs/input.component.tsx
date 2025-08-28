import React from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  defaultValue?: string | number;
  disabled?: boolean;
}

const Input: React.FC<InputFieldProps> = ({
  label = "",
  placeholder = "",
  type = "text",
  className = "",
  value,
  required = false,
  min,
  onChange,
  disabled = false,
  defaultValue,
  onBlur,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={label} className="block mb-[10px]">
          {label}
        </label>
      )}
      <input
        id={label}
        min={type === "number" ? min : undefined}
        type={type}
        className={`w-full px-[16px] py-[12px] text-title bg-bg100 dark:bg-bg100 border dark:border-border rounded-md ${className}`}
        placeholder={placeholder}
        {...(value !== undefined ? { value, onChange } : { defaultValue })}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
