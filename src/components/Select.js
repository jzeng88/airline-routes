import React from "react";

const Select = ({
  options,
  valueKey,
  titleKey,
  value,
  allTitle,
  onSelect,
}) => {
  return (
    <select value={value} onChange={onSelect}>
      <option value="all">{allTitle}</option>

      {options.map((option) => {
        return (
          <option
            key={option[valueKey]}
            value={option[valueKey]}
            disabled={!option.active}
          >
            {option[titleKey]}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
