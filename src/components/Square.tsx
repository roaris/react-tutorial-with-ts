type SquareProps = {
  value: string | null;
  onClick: () => void;
  hilighted: boolean;
};

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  hilighted,
}) => {
  return (
    <>
      {hilighted ? (
        <button
          className="square"
          onClick={onClick}
          style={{ backgroundColor: "red" }}
        >
          {value}
        </button>
      ) : (
        <button className="square" onClick={onClick}>
          {value}
        </button>
      )}
    </>
  );
};
