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
const CustomSelect = ({
  options,
  selectedOption,
  setSelectedOption,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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
          {selectedOption?.label || placeholder}
        </div>
        <div className={cx(s.arrow, { down: !isOpen })}>
          <img src={downArrow} alt="drow arrow" />
        </div>
      </div>
      {isOpen && (
        <div className={cx(s.dropdown)}>
          {normalizedOptions.map((option) => (
            <div
              key={option.value}
              className={cx(s.option, {
                selected: selectedOption?.value === option.value,
              })}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ])
  ).isRequired,
  selectedOption: PropTypes.any,
  setSelectedOption: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CustomSelect;
