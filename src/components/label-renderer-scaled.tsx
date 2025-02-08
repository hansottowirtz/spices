import { ComponentProps } from "react";
import { LabelRenderer } from "./LabelRenderer";
import useMeasure from "react-use-measure";

const SIZE = 600;
export function LabelRendererScaled(
  props: ComponentProps<typeof LabelRenderer>
) {
  const [ref, rect] = useMeasure();

  return (
    <div className="w-full" ref={ref}>
      <div
        style={{
          transform: `scale(${rect.width / SIZE})`,
          transformOrigin: "top left",
        }}
      >
        <LabelRenderer {...props} />
      </div>
    </div>
  );
}
