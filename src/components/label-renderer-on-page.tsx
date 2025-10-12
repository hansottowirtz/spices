"use client";

import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
import { Spice } from "@/lib/spices";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { useScrollMeasures } from "@/hooks/use-scroll-measures";
import { cn } from "@/lib/utils";
import { LabelRenderer } from "./LabelRenderer";
import Image from "next/image";

const HEADER_HEIGHT = 70;

export function LabelRendererOnPage({ spice }: { spice: Spice }) {
  const settings = useSnapshot(labelStyleState);

  const measures = useScrollMeasures();

  const distance = measures.scrollY - HEADER_HEIGHT;
  const size =
    typeof window === "undefined"
      ? undefined
      : window.innerWidth >= 768
      ? undefined
      : Math.max(
          measures.innerHeight / 2.5,
          Math.min(measures.innerWidth, measures.innerWidth - distance)
        );

  const ref = useRef<HTMLDivElement>(null);

  const [hasLoadedLongEnough, setHasLoadedLongEnough] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasLoadedLongEnough(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full aspect-square flex" ref={ref}>
      <div
        className={cn(
          "w-full p-2 md:p-0 border-b border-t border-b-transparent md:pb-0 md:border-0 backdrop-blur-sm md:backdrop-blur-none",
          distance > 0 && "border-gray-200 dark:border-gray-800",
          !hasLoadedLongEnough && "transition-[height] ease-in-out"
        )}
        style={size ? { height: size } : {}}
      >
        <div className="h-full flex justify-around">
          <LabelRenderer
            scaleToFit
            spice={spice}
            outline
            style={settings}
            ImageComponent={ImageWithPriority}
          />
        </div>
      </div>
    </div>
  );
}

function ImageWithPriority(props: ComponentProps<typeof Image>) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image priority {...props} />;
}
