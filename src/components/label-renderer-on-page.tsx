"use client";

import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
import { Spice } from "@/lib/spices";
import { LabelRendererScaled } from "./label-renderer-scaled";
import { useState, useEffect } from "react";

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

  console.log("size", size);
  return (
    <div className="w-full" style={size ? { maxWidth: "100%", width: size } : {}}>
      <LabelRendererScaled spice={spice} outline style={settings} />
    </div>
  );
}
