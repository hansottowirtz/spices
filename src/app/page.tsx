"use client";

import { labelStyleState } from "@/components/label-settings-provider";
import { spices } from "@/lib/spices";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { useInView } from "react-intersection-observer";
import { ComponentProps, useCallback } from "react";
import { LabelRenderer } from "@/components/LabelRenderer";
import Image from "next/image";

export default function Home() {
  const style = useSnapshot(labelStyleState);
  return (
    <div className="flex flex-wrap justify-center py-4">
      {spices.map((spice, i) => {
        return (
          <Label key={spice.id} spice={spice} style={style} index={i} outline />
        );
      })}
    </div>
  );
}

function Label(
  props: ComponentProps<typeof LabelRenderer> & { index: number }
) {
  const { inView, ref } = useInView();

  const { spice } = props;

  const ImageWithPriority = useCallback(
    (imageProps: ComponentProps<typeof Image>) => (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image priority={props.index < 5} {...imageProps} />
    ),
    [props.index]
  );

  return (
    <Link
      ref={ref}
      href={`/spices/${encodeURIComponent(spice.id)}`}
      className="size-[50%] aspect-square sm:size-[200px]"
    >
      <div className="p-1 relative">
        <LabelRenderer
          scaleToFit
          outline
          deferRender={!inView}
          ImageComponent={ImageWithPriority}
          expectedImageSize={250}
          qualitySettings={{ strokes: 1 }}
          {...props}
        />
      </div>
    </Link>
  );
}
