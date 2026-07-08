type WaveDividerProps = {
  /** 波の下側の色（次のセクションの背景色に合わせる） */
  fill?: string;
  flip?: boolean;
  className?: string;
};

/** セクション間に入れる水面風の区切り */
export default function WaveDivider({
  fill = "#ffffff",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none -my-px w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-16"
      >
        <path
          d="M0,40 C240,72 480,8 720,32 C960,56 1200,16 1440,40 L1440,72 L0,72 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
