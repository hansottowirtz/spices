"use client";

import { Spice } from "@/lib/spices";
import { useState } from "react";
import { LabelRenderer } from "./LabelRenderer";

export function LabelsView({ spices }: { spices: Spice[] }) {
  const [selectedSpice, setSelectedSpice] = useState<Spice | null>(null);

  return (
    <div className="flex flex-row">
      <div>
        {spices.map((spice) => (
          <div key={spice.id}>
            {spice.names.find((n) => n.lang === "English")?.value}
            <button
              onClick={() => setSelectedSpice(spice)}
              disabled={selectedSpice === spice}
            >
              Show
            </button>
          </div>
        ))}
      </div>
      <div>{selectedSpice && <LabelRenderer key={selectedSpice.id} spice={selectedSpice} />}</div>
    </div>
  );
}
