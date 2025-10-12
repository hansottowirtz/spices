"use client";

import { spices } from "@/lib/spices";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { useInView } from "react-intersection-observer";
import { ComponentProps, useCallback } from "react";
import { LabelRenderer } from "@/components/LabelRenderer";
import Image from "next/image";
import { collectionState } from "@/components/collection-provider";
import { Button } from "@/components/ui/button";
import { CheckIcon, PlusIcon, PrinterIcon, XIcon } from "lucide-react";
import { useSpiceStyleProxy } from "@/lib/use-spice-style-proxy";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export default function Home() {
  const collection = useSnapshot(collectionState);
  const hasItems = collection.items.length > 0;
  return (
    <>
      <div
        className={cn(
          "flex flex-wrap justify-center py-4",
          hasItems && "pb-20"
        )}
      >
        {spices.map((spice, i) => {
          return <Label key={spice.id} spice={spice} index={i} outline />;
        })}
      </div>
      <CollectionFooter />
    </>
  );
}

function Label(
  props: Omit<ComponentProps<typeof LabelRenderer>, "style"> & { index: number }
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

  const { style: usedStyle, hasCollectionItem } = useSpiceStyleProxy(spice);

  return (
    <div className="relative size-[50%] aspect-square sm:size-[200px] group/label-container">
      <Link
        ref={ref}
        href={`/spices/${encodeURIComponent(spice.id)}`}
        className="size-full"
      >
        <div className="p-1 relative">
          <LabelRenderer
            scaleToFit
            outline
            deferRender={!inView}
            ImageComponent={ImageWithPriority}
            expectedImageSize={250}
            qualitySettings={{ strokes: 1 }}
            style={usedStyle}
            {...props}
          />
        </div>
      </Link>
      <div className="absolute bottom-2 right-2 flex flex-row gap-2">
        {hasCollectionItem ? (
          <>
            <LabelButton
              onClick={() => {
                collectionState.items = collectionState.items.filter(
                  (item) => item.spice.id !== spice.id
                );
              }}
              variant="destructive"
              className="opacity-0 group-hover/label-container:opacity-100 transition-opacity duration-300"
            >
              <XIcon className="size-4" />
            </LabelButton>
            <LabelButton disabled>
              <CheckIcon className="size-4" />
            </LabelButton>
          </>
        ) : (
          <div className="opacity-0 group-hover/label-container:opacity-100 transition-opacity duration-300">
            <LabelButton
              onClick={() => {
                collectionState.items.push({
                  spice,
                  style: "global",
                });
              }}
            >
              <PlusIcon className="size-4" />
            </LabelButton>
          </div>
        )}
      </div>
    </div>
  );
}

function LabelButton(props: ComponentProps<typeof Button> & {
  variant?: "default" | "destructive";
}) {
  const buttonVariants = cva(
    "rounded-full p-2 border-2 border-black dark:border-white cursor-pointer disabled:cursor-auto",
    {
      variants: {
        variant: {
          default: "bg-background text-foreground hover:bg-secondary/90 disabled:hover:bg-background",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ variant: props.variant }),
        props.className
      )}
    >
      {props.children}
    </button>
  );
}

function CollectionFooter() {
  const collection = useSnapshot(collectionState);
  const hasItems = collection.items.length > 0;
  if (!hasItems) return null;
  return (
    <div className="flex flex-row gap-2 justify-between items-center fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div>
        {`${collection.items.length} ${
          collection.items.length === 1 ? "spice" : "spices"
        } added`}
      </div>
      <Button asChild>
        <Link href="/collection">
          Order or print
          <PrinterIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
