import { ComponentProps } from "react";
import { LabelRenderer } from "./LabelRenderer";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

const SIZE = 600;

export function LabelRendererScaled(
  props: ComponentProps<typeof LabelRenderer> & {
    className?: string;
  }
) {
  const [ref, rect] = useMeasure();

  return (
    <div className={cn("w-full", props.className)} ref={ref}>
      <div
        className="inline-block"
        style={{
          transform: `scale(${Math.min(rect.width, rect.height) / SIZE})`,
          transformOrigin: "top left",
        }}
      >
        <LabelRenderer {...props} />
      </div>
    </div>
  );
}
