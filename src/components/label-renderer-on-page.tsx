"use client";

import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
import { Spice } from "@/lib/spices";
import { LabelRenderer } from "./LabelRenderer";

export function LabelRendererOnPage({ spice }: { spice: Spice }) {
  const settings = useSnapshot(labelStyleState);

  return <LabelRenderer spice={spice} outline style={settings} />;
}
