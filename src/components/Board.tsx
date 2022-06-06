import { Square } from "./Square";

type BoardProps = {
  squares: (string | null)[];
  onClick: (i: number) => void;
  hilightCell: number[];
};

export const Board: React.FC<BoardProps> = ({
  squares,
  onClick,
  hilightCell,
}) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        hilighted={hilightCell.includes(i)}
      />
    );
  };

  return (
    <div>
      {[0, 1, 2].map((i) => (
        <div className="board-row" key={i}>
          {[0, 1, 2].map((j) => (
            <span key={j}>{renderSquare(3 * i + j)}</span>
          ))}
        </div>
      ))}
    </div>
  );
};
