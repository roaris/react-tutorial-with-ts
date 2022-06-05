import { useState } from "react";

export const Square: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <button className="square" onClick={() => setValue("X")}>
      {value}
    </button>
  );
};
