type DiagonalCutProps = {
  from: string;
  to: string;
  slope?: "right" | "left";
};

export function DiagonalCut({ from, to, slope = "right" }: DiagonalCutProps) {
  const fromPoints =
    slope === "right" ? "0,0 1440,0 0,60" : "0,0 1440,0 1440,60";
  const toPoints =
    slope === "right" ? "0,60 1440,0 1440,60" : "0,0 1440,60 0,60";

  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        height: "60px",
        marginTop: "-1px",
        background: from,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points={fromPoints} fill={from} />
      <polygon points={toPoints} fill={to} />
    </svg>
  );
}
