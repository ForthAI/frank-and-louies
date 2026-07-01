import { cn } from "@/lib/utils";
import {
  FACES_BROW_PATH,
  FACES_COLLARS,
  FACES_CROP_VIEWBOX,
  FACES_EYES,
  FACES_LINE_PATH,
  FACES_PANEL_PATH,
} from "./faces-paths";

type FacesMarkProps = {
  className?: string;
  /** Render the rounded blush panel behind the faces (badge look). */
  withPanel?: boolean;
  /** Tailwind text-* class drives the panel fill when withPanel is set. */
  panelClassName?: string;
  title?: string;
} & React.SVGProps<SVGSVGElement>;

/**
 * The back-to-back two-face icon (Frank & Louie). Single-color line-art that
 * inherits `currentColor`, so colour it with a text-* utility. Used as a
 * recurring mark, section accent, divider and loading flourish.
 */
export function FacesMark({
  className,
  withPanel = false,
  panelClassName,
  title,
  ...props
}: FacesMarkProps) {
  return (
    <svg
      viewBox={FACES_CROP_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {withPanel ? (
        <path
          d={FACES_PANEL_PATH}
          className={cn("text-blush", panelClassName)}
          fill="currentColor"
        />
      ) : null}
      <g fill="currentColor">
        <path d={FACES_LINE_PATH} />
        <path d={FACES_BROW_PATH} />
        {FACES_EYES.map((e, i) => (
          <circle key={i} cx={e.cx} cy={e.cy} r={e.r} />
        ))}
        {FACES_COLLARS.map((pts, i) => (
          <polygon key={i} points={pts} />
        ))}
      </g>
    </svg>
  );
}
