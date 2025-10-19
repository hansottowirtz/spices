"use client";

import { Spice } from "@/lib/spices";
import { ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import { useScrollMeasures } from "@/hooks/use-scroll-measures";
import { cn } from "@/lib/utils";
import { LabelRenderer } from "./LabelRenderer";
import Image from "next/image";
import { useSpiceStyleProxy } from "@/lib/use-spice-style-proxy";
import { useSnapshot } from "valtio";
import useMeasure from "react-use-measure";
import { createPortal } from "react-dom";

const HEADER_HEIGHT = 70;

export function LabelRendererOnPage({ spice }: { spice: Spice }) {
  const { style } = useSpiceStyleProxy(spice);
  const styleSnap = useSnapshot(style);

  const scrollMeasures = useScrollMeasures();

  const distance = scrollMeasures.scrollY - HEADER_HEIGHT;
  const size =
    typeof window === "undefined"
      ? undefined
      : window.innerWidth >= 768
      ? undefined
      : Math.max(
          scrollMeasures.innerHeight / 2.5,
          Math.min(
            scrollMeasures.innerWidth,
            scrollMeasures.innerWidth - distance
          )
        );

  const [hasLoadedLongEnough, setHasLoadedLongEnough] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasLoadedLongEnough(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // const [measureFromTopRef, measuresFromTop, remeasure] = useMeasure();

  // const measureFromTop = Math.round(useOnlyChangeIfBigDifference(measuresFromTop.top, 5));

  // useEffect(() => {
  //   const ti = requestAnimationFrame(() => {
  //     remeasure();
  //   });
  //   return () => {
  //     cancelAnimationFrame(ti);
  //   };
  // }, [remeasure, scrollMeasures]);

  // console.log("measureFromTop", measureFromTop, measuresFromTop.top);

  const [measurer, fixedTop0Offset] = useFixedTop0Offset();

  // console.log("fixedTop0Offset", fixedTop0Offset);

  const smoothedFixedTop0Offset = Math.round(useOnlyChangeIfBigDifference(fixedTop0Offset, 5));

  return (
    <>
      <div className="w-full aspect-square flex">
        <div
          className={cn(
            // margin top -1px, because you shouldn't see border top, only visible when adjusting the transform
            "w-full p-2 md:p-0 border-y mt-[-1px] border-b-transparent md:pb-0 md:border-0 backdrop-blur-sm md:backdrop-blur-none",
            distance > 0 && "border-gray-200 dark:border-gray-800",
            !hasLoadedLongEnough ? "transition-[height] ease-in-out" : "transition-[transform] ease-in-out"
          )}
          style={
            size
              ? {
                  height: size,
                  transform: distance > 0 ? `translateY(${-smoothedFixedTop0Offset}px)` : undefined,
                }
              : {}
          }
        >
          <div className="h-full flex justify-around">
            <LabelRenderer
              scaleToFit
              spice={spice}
              outline
              style={styleSnap}
              ImageComponent={ImageWithPriority}
            />
          </div>
        </div>
      </div>
      {measurer}
    </>
  );
}

function ImageWithPriority(props: ComponentProps<typeof Image>) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image priority {...props} />;
}

function useOnlyChangeIfBigDifference(value: number, minDifference: number) {
  const lastValueRef = useRef(value);

  if (Math.abs(value - lastValueRef.current) < minDifference) {
    return lastValueRef.current;
  }

  lastValueRef.current = value;

  return lastValueRef.current;
}

// function Measurer() {
//   const [ref, bounds] = useMeasure();

//   console.log("bounds", bounds.top);

//   return (
//     <div ref={ref} className="fixed top-0">
//       Measurer
//     </div>
//   );
// }

/** This hook is needed because on Chrome iOS, fixed 0 very often does not mean y=0 in the viewport. */
function useFixedTop0Offset() {
  const [ref, bounds, remeasure] = useMeasure();

  const measurer = useMemo(() => {
    return typeof document !== "undefined"
      ? createPortal(
          <div ref={ref} className="fixed top-0 w-0 h-0" />,
          document.body
        )
      : null;
  }, [ref]);

  useEffect(() => {
    const fn = () => {
      requestAnimationFrame(() => {
        remeasure();
      });
    };

    document.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn, { passive: true });
    return () => {
      document.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, [remeasure]);

  // it should always be negative, positive values are invalid but happen

  return [measurer, Math.min(bounds.top, 0)] as const;
}
