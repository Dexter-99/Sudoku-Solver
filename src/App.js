import "./App.css";
import generator from "sudoku";
import { useState } from "react";
import SudokuBoard from "./Components/SudokuBoard";

/*
 Sudoku with following structure

 {
   rows:[
     {
       index:0,

       cols:[
  {
  row:0,
  col:0,
  value:1,
  readonly:true
}
     ]
    }
   ]
 }
*/
const generateSudoku = () => {
  const puzzle = generator.makepuzzle();
  const result = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = puzzle[i * 9 + j];

      const col = {
        row: i,
        col: j,
        value: value !== null ? value + 1 : null,
        readOnly: value !== null,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }

  return result;
};
function App() {
  const [sudoku, setSudoku] = useState(generateSudoku());
  const [board, setBoard] = useState(sudoku);
  const [generated, setGenerated] = useState(false);

  const handleChange = (e) => {
    const curr = sudoku;
    curr.rows.at(e.row).cols.at(e.col).value = e.value;
    setSudoku({ rows: curr.rows });
    setBoard({ rows: curr.rows });
    console.log(board);
  };

  const isValid = (x, y, val) => {
    for (let i = 0; i < 9; i++) {
      if (board.rows.at(x).cols.at(i).value === val) return false;
    }
    for (let i = 0; i < 9; i++) {
      if (board.rows.at(i).cols.at(y).value === val) return false;
    }
    let bX = x - (x % 3);
    let bY = y - (y % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board.rows.at(bX + i).cols.at(bY + j).value === val) return false;
      }
    }
    return true;
  };
  const handleSolve = (e) => {
    e.preventDefault();
    console.log("Yo running...");

    const ans = solve(0, 0);
    console.log(ans);
    if (ans) {
      console.log();
      setSudoku(board);
      setGenerated(true);
    } else {
      console.log("Invalid Board...");
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    const curr = generateSudoku();
    setSudoku(curr);
    setBoard(curr);
    setGenerated(false);
  };
  const solve = (i, j) => {
    console.log(i, j);
    if (i === 9) {
      return true;
    }
    let x, y;
    if (j === 8) {
      x = i + 1;
      y = 0;
    } else {
      x = i;
      y = j + 1;
    }

    if (board.rows.at(i).cols.at(j).value !== null) {
      return solve(x, y);
    } else
      for (let val = 1; val <= 9; val++) {
        if (isValid(i, j, val)) {
          board.rows.at(i).cols.at(j).value = val;
          if (solve(x, y)) return true;
          board.rows.at(i).cols.at(j).value = null;
        }
      }
    return false;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Solver</h1>
      </header>
      <SudokuBoard sudoku={sudoku} onChange={handleChange} />
      {generated ? (
        <button className="btn red" onClick={handleClear}>
          Clear Sudoku
        </button>
      ) : (
        <button className="btn blue" onClick={handleSolve}>
          Generate Sudoku
        </button>
      )}
    </div>
  );
}

export default App;
