interface SectionDividerProps {
  variant: "wave" | "tilt" | "curve" | "diagonal";
  fillClass?: string;
  flip?: boolean;
}

const paths: Record<SectionDividerProps["variant"], string> = {
  wave: "M0,40 C320,80 640,0 960,40 C1280,80 1600,0 1920,40 L1920,80 L0,80 Z",
  tilt: "M0,60 L1920,0 L1920,80 L0,80 Z",
  curve: "M0,80 Q960,0 1920,80 L1920,80 L0,80 Z",
  diagonal: "M0,0 L1920,60 L1920,80 L0,80 Z",
};

export default function SectionDivider({
  variant,
  fillClass = "fill-surface-alt",
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-[60px] md:h-[80px] ${fillClass}`}
        viewBox="0 0 1920 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
