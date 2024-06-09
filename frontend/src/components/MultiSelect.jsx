import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ options, placeholder }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (option) => {
    if (option.value === "all") {
      if (selectedOptions.includes(option.value)) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(options.map((opt) => opt.value));
      }
    } else {
      if (selectedOptions.includes(option.value)) {
        setSelectedOptions(
          selectedOptions.filter((opt) => opt !== option.value)
        );
      } else {
        setSelectedOptions([
          ...selectedOptions.filter((opt) => opt !== "all"),
          option.value,
        ]);
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="border border-gray-300 p-2 rounded w-full cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="text-gray-600">{placeholder}</div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 border border-gray-300 bg-white rounded mt-1 w-max">
          <div className="flex flex-col max-h-60 w-max overflow-y-auto">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex w-max  gap-2  py-2 px-3 items-center hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox text-orange-500"
                />
                <p className="w-max inline-flex">{option.label}</p>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
