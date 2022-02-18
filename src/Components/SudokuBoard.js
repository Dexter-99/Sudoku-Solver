import React from "react";
import SudokuField from "./SudokuField";
const SudokuBoard = ({ sudoku, onChange }) => {
  // console.log(sudoku);
  return (
    <div>
      {sudoku.rows.map((row) => (
        <div className="row" key={row.index}>
          {row.cols.map((field) => (
            <SudokuField
              field={field}
              key={field.col}
              rownumber={row.index}
              onChange={onChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
