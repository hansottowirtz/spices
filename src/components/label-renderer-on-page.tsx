"use client";

import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
import { Spice } from "@/lib/spices";
import { LabelRendererScaled } from "./label-renderer-scaled";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const HEADER_HEIGHT = 70;

export function LabelRendererOnPage({ spice }: { spice: Spice }) {
  const settings = useSnapshot(labelStyleState);

  const [size, setSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 768) {
        setSize(undefined);
        return;
      }
      const distance = window.scrollY - HEADER_HEIGHT;
      const size = Math.max(
        window.innerHeight / 2.5,
        Math.min(window.innerWidth, window.innerWidth - distance)
      );
      setSize(size);
    };
    window.addEventListener("scroll", fn);
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full aspect-square" ref={ref}>
      <div className="w-full" style={size ? { height: size } : {}}>
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
