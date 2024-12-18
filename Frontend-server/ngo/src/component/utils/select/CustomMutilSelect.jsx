import { useState, useRef, useEffect } from "react";
import cx from "classnames";
import s from "./CustomSelect.module.scss";
import PropTypes from "prop-types";
import { downArrow } from "../images/Images";

/**
 *
 * sample inputs
 *
 * options  = ["Sundar", "Jeeva", "Sabari"] or
 * options  = { label : "sundar" , value : "sundar"}
 * onChange = setSelectedValue() method (returns an array of selected options)
 * placeholder : "Any String..."
 *
 */
const CustomMultiSelect = ({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionToggle = (option) => {
    const updatedSelectedOptions = selectedOptions.includes(option.value)
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value];
    setSelectedOptions(updatedSelectedOptions);
    console.log(updatedSelectedOptions);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
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
    <div className={cx(s.container)} ref={selectRef}>
      <div className={cx(s.header)} onClick={toggleDropdown}>
        <div className={cx(s.label)}>
          {selectedOptions.length > 0
            ? selectedOptions
                .map(
                  (value) =>
                    normalizedOptions.find((opt) => opt.value === value)?.label
                )
                .join(", ")
            : placeholder}
        </div>
        <div className={cx(s.arrow, { down: !isOpen })}>
          <img src={downArrow} alt="dropdown arrow" />
        </div>
      </div>
      {isOpen && (
        <div className={cx(s.dropdown)}>
          {normalizedOptions.map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              className={cx(s.option)}
              onClick={() => handleOptionToggle(option)}
            >
              <div
                className={cx(s.customCheckbox, {
                  [s.checked]: selectedOptions.includes(option.value),
                })}
              >
                &#x2713;
              </div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomMultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ])
  ).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CustomMultiSelect;
