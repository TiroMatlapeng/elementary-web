export function DicksonLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dickson"
    >
      {/* Shoulders / torso base */}
      <path d="M10 120 C10 95 22 84 50 82 C78 84 90 95 90 120 Z" />

      {/* Neck */}
      <path d="M40 80 L40 68 Q50 72 60 68 L60 80 Q50 84 40 80 Z" />

      {/* Head */}
      <ellipse cx="50" cy="50" rx="26" ry="30" />

      {/* Ear left */}
      <path d="M24 48 C20 48 18 52 18 56 C18 60 20 63 24 63 L26 63 L26 48 Z" />

      {/* Ear right */}
      <path d="M76 48 C80 48 82 52 82 56 C82 60 80 63 76 63 L74 63 L74 48 Z" />

      {/* Hair — close-cropped, tight to top of head */}
      <path
        d="M28 32 Q30 14 50 14 Q70 14 72 32 Q65 22 50 21 Q35 22 28 32 Z"
        opacity={0.35}
      />

      {/* Eye whites */}
      <ellipse cx="40" cy="48" rx="5" ry="4.5" fill="white" opacity={0.9} />
      <ellipse cx="60" cy="48" rx="5" ry="4.5" fill="white" opacity={0.9} />

      {/* Irises */}
      <ellipse cx="40" cy="48" rx="3" ry="3" />
      <ellipse cx="60" cy="48" rx="3" ry="3" />

      {/* Eye shine highlights */}
      <circle cx="41.5" cy="46.5" r="1" fill="white" />
      <circle cx="61.5" cy="46.5" r="1" fill="white" />

      {/* Nose bridge */}
      <path
        d="M46 53 L44 62 Q50 65 56 62 L54 53"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={0.4}
      />

      {/* Teeth — warm, wide smile */}
      <path
        d="M37 68 Q50 80 63 68 Q56 74 50 75 Q44 74 37 68 Z"
        fill="white"
        opacity={0.92}
      />

      {/* Upper lip */}
      <path
        d="M37 68 Q43 64 50 65 Q57 64 63 68"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Lower lip */}
      <path
        d="M37 68 Q50 80 63 68"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* Cheek smile lines */}
      <path
        d="M33 63 Q30 68 32 74"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.25}
      />
      <path
        d="M67 63 Q70 68 68 74"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.25}
      />

      {/* Eyebrows — strong and confident */}
      <path
        d="M33 41 Q40 38 47 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M53 40 Q60 38 67 41"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
