"use client";

import { LabelRenderer } from "@/app/LabelRenderer";
import { Spice } from "@/lib/spices";
import { useState } from "react";
import { Slider } from "./ui/slider";

export function LabelPage({ spice }: { spice: Spice }) {
  const [titleMargin, setTitleMargin] = useState(0.77);
  const [binomialMargin, setBinomialMargin] = useState(0.655);
  const [bottomMargin, setBottomMargin] = useState(0.8);

  const textSettings = {
    title: {
      margin: titleMargin,
    },
    binomial: {
      margin: binomialMargin,
    },
    bottom: {
      margin: bottomMargin,
    },
  };

  return (
    <div className="p-4 min-w-[600px]">
      <LabelRenderer spice={spice} outline settings={{ textSettings }} />
      <div className="my-4">
        <div className="flex flex-row gap-4">
          <div className="w-20">Title</div>
          <Slider
            min={0}
            max={1}
            value={[titleMargin]}
            onValueChange={([v]) => setTitleMargin(v)}
            step={0.005}
          />
          {(titleMargin * 100).toFixed(1)}%
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-20">Binomial</div>
          <Slider
            min={0}
            max={1}
            value={[binomialMargin]}
            onValueChange={([v]) => setBinomialMargin(v)}
            step={0.005}
          />
          {(binomialMargin * 100).toFixed(1)}%
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-20">Bottom</div>
          <Slider
            min={0}
            max={1}
            value={[bottomMargin]}
            onValueChange={([v]) => setBottomMargin(v)}
            step={0.005}
          />
          {(bottomMargin * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
