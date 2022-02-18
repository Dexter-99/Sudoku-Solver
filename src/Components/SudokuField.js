import React from "react";

const SudokuField = ({ field, rownumber, onChange }) => {
  const handleChange = (e) => {
    let value = "";
    if (e.target.value >= 0 && e.target.value < 10) {
      value = parseInt(e.target.value);
    }

    onChange({ ...field, value: value });
  };
  return (
    <input
      type="text"
      className="field"
      value={field.value || ""}
      onChange={handleChange}
      readOnly={field.readOnly}
      colnumber={field.col}
      rownumber={rownumber}
    />
  );
};

export default SudokuField;
