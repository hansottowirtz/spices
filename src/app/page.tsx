"use client";

import { labelStyleState } from "@/components/label-settings-provider";
import { spices } from "@/lib/spices";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { useInView } from "react-intersection-observer";
import { ComponentProps } from "react";
import { LabelRenderer } from "@/components/LabelRenderer";

export default function Home() {
  const style = useSnapshot(labelStyleState);
  return (
    <div className="flex flex-wrap justify-center py-1">
      {spices.map((spice) => {
        return <Label key={spice.id} spice={spice} style={style} outline />;
      })}
    </div>
  );
}

function Label(props: ComponentProps<typeof LabelRenderer>) {
  const { inView, ref } = useInView();

  const { spice } = props;

  return (
    <Link
      ref={ref}
      href={`/spices/${encodeURIComponent(spice.id)}`}
      className="size-[50%] aspect-square sm:size-[200px]"
    >
      <div className="p-1 relative">
        <div className="absolute inset-0 size-full rounded-full bg-white outline-2 outline-black dark:outline-none" />
        {inView && <LabelRenderer scaleToFit {...props} />}
      </div>
    </Link>
  );
}
