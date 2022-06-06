import { useState } from "react";
import { Board } from "./Board";

export type History = {
  squares: (string | null)[];
  step: number;
  position?: {
    x: number;
    y: number;
  };
}[];

export const Game: React.FC = () => {
  const [history, setHistory] = useState<History>([
    {
      squares: Array(9).fill(null),
      step: 0,
    },
  ]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [toggled, setToggled] = useState<boolean>(false);

  const handleClick = (i: number) => {
    let squares;
    if (toggled) squares = history[history.length - 1 - currentStep].squares;
    else squares = history[currentStep].squares;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    const addValue = {
      squares: newSquares,
      step: currentStep + 1,
      position: {
        x: Math.floor(i / 3) + 1,
        y: (i % 3) + 1,
      },
    };
    if (toggled) {
      const newHistory = history.slice(
        history.length - currentStep - 1,
        history.length
      );
      newHistory.unshift(addValue);
      setHistory(newHistory);
    } else {
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(addValue);
      setHistory(newHistory);
    }
    setXIsNext(!xIsNext);
    setCurrentStep(currentStep + 1);
  };

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return [squares[a], a, b, c];
      }
    }
    return null;
  };

  const jump = (step: number) => {
    setXIsNext(step % 2 === 0);
    setCurrentStep(step);
  };

  let squares;
  if (toggled) squares = history[history.length - 1 - currentStep].squares;
  else squares = history[currentStep].squares;
  const result = calculateWinner(squares);
  const status = result
    ? "Winner: " + result[0]
    : "Next player: " + (xIsNext ? "X" : "O");
  const hilightCell = (result ? result.slice(1) : []) as number[];

  const moves = history.map((v) => {
    const desc = v.step
      ? `Go to move #${v.step} (${v.position!.x}, ${v.position!.y})`
      : "Go to game start";
    return (
      <li key={v.step}>
        <button onClick={() => jump(v.step)}>
          {v.step === currentStep ? (
            <span style={{ fontWeight: "bold" }}>{desc}</span>
          ) : (
            desc
          )}
        </button>
      </li>
    );
  });

  const toggle = () => {
    const newHistory = history.slice();
    newHistory.reverse();
    setHistory(newHistory);
    setToggled(!toggled);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={(i) => handleClick(i)}
          hilightCell={hilightCell}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button onClick={toggle}>toggle</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
