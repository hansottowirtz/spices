"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { collectionState, insertAfterLastOccurrence } from "./collection-provider";
import { Button } from "./ui/button";
import { useSnapshot } from "valtio";
import { Spice } from "@/lib/spices";

export function AddToCollectionButton({ spice }: { spice: Spice }) {
  const collection = useSnapshot(collectionState);
  const itemCount = collection.items.filter(
    (item) => item.spice.id === spice.id
  ).length;
  const isInCollection = itemCount > 0;

  if (isInCollection) {
    return (
      <>
        <Button
          variant="destructive"
          onClick={() => {
            collectionState.items = collectionState.items.filter(
              (item) => item.spice.id !== spice.id
            );
          }}
        >
          Remove from collection
          <XIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => insertAfterLastOccurrence(spice)}
        >
          Add another
          <PlusIcon className="size-4" />
        </Button>
        <div className="rounded-full dark:border-white border-black border-2 size-9 text-sm flex items-center justify-center gap-2">
          {itemCount}
        </div>
      </>
    );
  }

  return (
    <Button
      onClick={() => insertAfterLastOccurrence(spice)}
      disabled={isInCollection}
    >
      Add to collection
      <PlusIcon className="size-4" />
    </Button>
  );
}
