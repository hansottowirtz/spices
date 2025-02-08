"use client";

import { LabelRendererScaled } from "@/components/label-renderer-scaled";
import { labelStyleState } from "@/components/label-settings-provider";
import { spices } from "@/lib/spices";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { useInView } from "react-intersection-observer";
import { ComponentProps } from "react";

export default function Home() {
  const style = useSnapshot(labelStyleState);
  return (
    <div className="p-4 flex flex-wrap gap-2 justify-center">
      {spices.map((spice) => {
        return <Label key={spice.id} spice={spice} style={style} />;
      })}
    </div>
  );
}

function Label(props: ComponentProps<typeof LabelRendererScaled>) {
  const { inView, ref } = useInView();

  const { spice } = props;

  return (
    <Link
      ref={ref}
      href={`/spices/${encodeURIComponent(spice.id)}`}
      className="size-[160px] md:size-[200px] relative"
    >
      <div className="absolute inset-0 size-full rounded-full bg-white" />
      {inView && <LabelRendererScaled {...props} />}
    </Link>
  );
}
