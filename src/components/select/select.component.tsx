import { FC, useEffect, useRef, useState } from "react";
import { faArrowDown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  label?: string;
  onChange: (value: string) => void;
  value: string;
}

const Selector: FC<CustomSelectProps> = ({
  options,
  label,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Find the selected option directly from props
  const selectedOption =
    options.find((option) => option.value === value) || null;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full px-[16px] py-[12px] text-title border border-[#2C2E30] rounded-md flex justify-between items-center"
        >
          <span className="text-[15px] text-title">
            {selectedOption ? selectedOption.label : ""}
          </span>
          <FontAwesomeIcon icon={faArrowDown} className="icons" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-bg dark:bg-bg border dark:border-border overflow-hidden rounded-md shadow-lg">
            {options.length ? (
              options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full text-left text-[15px] p-[20px] py-[10px] text-title dark:text-title hover:bg-bg100 hover:dark:bg-bg100"
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="p-[20px] text-center text-gray-500 dark:text-gray-400">
                No options available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selector;
