import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PassFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
}

const PasswordInput: React.FC<PassFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  defaultValue = ""
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <label htmlFor={label} className="block mb-[10px]">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={showPassword ? "text" : "password"}
          id={label} // Use name for the id
          className="w-full px-[16px] py-[12px] text-title bg-bg100 dark:bg-bg100 border dark:border-border rounded-md pr-12"
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          aria-describedby={`${label}-error`}
          defaultValue={defaultValue}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          aria-label={showPassword ? "Hide password" : "Show password"} // Accessible label
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} className="icons" />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} className="icons" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;