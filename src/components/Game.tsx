import { useState } from "react";
import { Board } from "./Board";

export const Game: React.FC = () => {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (i: number) => {
    const squares = history[history.length - 1];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([newSquares]));
    setXIsNext(!xIsNext);
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
    setHistory(history.slice(0, move + 1));
    setXIsNext(move % 2 === 0);
  };

  const squares = history[history.length - 1];
  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>
          {history.map((_, move) => {
            return (
              <li key={move}>
                <button onClick={() => jump(move)}>
                  {move ? `Go to move #${move}` : "Go to game start"}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
