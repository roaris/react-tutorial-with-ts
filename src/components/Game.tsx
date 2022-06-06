import { useState } from "react";
import { Board } from "./Board";

export type History = {
  squares: (string | null)[];
  position?: {
    x: number;
    y: number;
  };
}[];

export const Game: React.FC = () => {
  const [history, setHistory] = useState<History>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleClick = (i: number) => {
    const squares = history[currentStep].squares;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push({
      squares: newSquares,
      position: {
        x: Math.floor(i / 3) + 1,
        y: (i % 3) + 1,
      },
    });
    setHistory(newHistory);
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
        return squares[a];
      }
    }
    return null;
  };

  const jump = (move: number) => {
    setXIsNext(move % 2 === 0);
    setCurrentStep(move);
  };

  const squares = history[currentStep].squares;
  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  const moves = history.map((v, move) => {
    const desc = move
      ? `Go to move #${move} (${v.position!.x}, ${v.position!.y})`
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jump(move)}>
          {move === currentStep ? (
            <span style={{ fontWeight: "bold" }}>{desc}</span>
          ) : (
            desc
          )}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
