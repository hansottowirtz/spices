"use client";

import { spices } from "@/lib/spices";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { useInView } from "react-intersection-observer";
import { ComponentProps, useCallback } from "react";
import { LabelRenderer } from "@/components/LabelRenderer";
import Image from "next/image";
import {
  collectionState,
  insertAfterLastOccurrence,
} from "@/components/collection-provider";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronRightIcon, PlusIcon, XIcon } from "lucide-react";
import { useSpiceStyleProxy } from "@/lib/use-spice-style-proxy";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useDebounce } from "use-debounce";

export default function Home() {
  const collection = useSnapshot(collectionState);
  const hasItems = collection.items.length > 0;
  return (
    <>
      {/* <IntroductionHeader /> */}
      <div className="flex flex-row gap-2 justify-center px-4 mt-4">
        <Button asChild>
          <Link href="/create">
            Create your own collection
            <ChevronRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
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
  const { spice } = props;

  const { inView: inViewOrig, ref } = useInView({
    initialInView: props.index < 5,
  });

  // debouncing is needed to prevent weird iOS Safari behavior
  const inView = useDebounce(inViewOrig, 100);

  const ImageWithPriority = useCallback(
    (imageProps: ComponentProps<typeof Image>) => (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image priority={props.index < 5} {...imageProps} />
    ),
    [props.index]
  );

  const { style: usedStyle, hasCollectionItem } = useSpiceStyleProxy(spice);

  const collectionSnap = useSnapshot(collectionState);
  const itemCount = collectionSnap.items.filter(
    (item) => item.spice.id === spice.id,
  ).length;

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
            <LabelButton
              onClick={() => {
                insertAfterLastOccurrence(spice);
              }}
            >
              {itemCount > 1 ? (
                <div className="text-xs size-4">{itemCount}</div>
              ) : (
                <CheckIcon className="size-4" />
              )}
            </LabelButton>
          </>
        ) : (
          <div className="opacity-0 group-hover/label-container:opacity-100 transition-opacity duration-300">
            <LabelButton
              onClick={() => insertAfterLastOccurrence(spice)}
            >
              <PlusIcon className="size-4" />
            </LabelButton>
          </div>
        )}
      </div>
    </div>
  );
}

function LabelButton(
  props: ComponentProps<typeof Button> & {
    variant?: "default" | "destructive";
  }
) {
  const buttonVariants = cva(
    "rounded-full p-2 border-2 border-black dark:border-white cursor-pointer disabled:cursor-auto",
    {
      variants: {
        variant: {
          default:
            "bg-background text-foreground hover:bg-secondary/90 disabled:hover:bg-background",
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
    <div className="flex flex-row gap-2 justify-between items-center fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-black border-y-2 mb-[-2px] border-black dark:border-white">
      <div>
        {`${collection.items.length} ${
          collection.items.length === 1 ? "spice" : "spices"
        } added`}
      </div>
      <Button asChild>
        <Link href="/create">
          Configure
          <ChevronRightIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

function IntroductionHeader() {
  return (
    <div className="max-w-[600px] mx-auto px-2 mt-4 border-b border-foreground pb-4">
      <p>Hi, welcome to Spices.app!</p>
      <p>
        This is an open source project where I created spice labels based on old
        botanical books that are now in the public domain.
      </p>
      <p>
        The source is available on{" "}
        <a
          className="underline underline-offset-4"
          href="https://github.com/hansottowirtz/spices/tree/v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        , contributions are welcome!
      </p>
      <p>
        This site is under development, but you can already generate labels for
        your spices.
      </p>
      <p>
        Want to help, are you interested, do you have questions or feedback, or
        do you want to order labels? Please reach out to me at{" "}
        <a
          className="underline underline-offset-4"
          href="mailto:hansottowirtz@gmail.com"
        >
          hansottowirtz@gmail.com
        </a>
        , on Reddit {" "}
        <a
          className="underline underline-offset-4"
          href="https://www.reddit.com/user/hansottowirtz"
          target="_blank"
          rel="noopener noreferrer"
        >
          u/hansottowirtz
        </a>
        , on Bluesky {" "}
        <a
          className="underline underline-offset-4"
          href="https://bsky.app/profile/hansottowirtz.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          @hansottowirtz.bsky.social
        </a>{" "}
        or on X{" "}
        <a
          className="underline underline-offset-4"
          href="https://x.com/hansottowirtz"
          target="_blank"
          rel="noopener noreferrer"
        >
          @hansottowirtz
        </a>
        .
      </p>
    </div>
  );
}
