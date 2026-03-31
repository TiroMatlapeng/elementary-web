export function DicksonLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="24" cy="18" rx="11" ry="13" />
      <path d="M6 56c0-12 8-20 18-20s18 8 18 20H6z" />
      <path
        d="M19 21c1.5 2 3.5 3 5 3s3.5-1 5-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
