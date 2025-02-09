"use client";

import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
import { Spice } from "@/lib/spices";
import { LabelRendererScaled } from "./label-renderer-scaled";
import { useRef } from "react";
import { useScrollMeasures } from "@/hooks/use-scroll-measures";
import { cn } from "@/lib/utils";

const HEADER_HEIGHT = 70;

export function LabelRendererOnPage({ spice }: { spice: Spice }) {
  const settings = useSnapshot(labelStyleState);

  const measures = useScrollMeasures();

  const distance = measures.scrollY - HEADER_HEIGHT;
  const size =
    window.innerWidth >= 768
      ? undefined
      : Math.max(
          measures.innerHeight / 2.5,
          Math.min(measures.innerWidth, measures.innerWidth - distance)
        );

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full aspect-square" ref={ref}>
      <div
        className={cn(
          "w-full p-2 md:p-0 border-b border-b-transparent md:pb-0 md:border-0 backdrop-blur md:backdrop-blur-none",
          distance > 0 ? "border-b-gray-200 dark:border-b-gray-800" : ""
        )}
        style={size ? { height: size } : {}}
      >
        <LabelRendererScaled
          className="h-full"
          spice={spice}
          outline
          style={settings}
        />
      </div>
    </div>
  );
}
