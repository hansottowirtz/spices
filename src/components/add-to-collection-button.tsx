"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { collectionState } from "./collection-provider";
import { Button } from "./ui/button";
import { useSnapshot } from "valtio";
import { Spice } from "@/lib/spices";

export function AddToCollectionButton({ spice }: { spice: Spice }) {
  const collection = useSnapshot(collectionState);
  const isInCollection = collection.items.some(
    (item) => item.spice.id === spice.id
  );

  if (isInCollection) {
    return (
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
    );
  }

  return (
    <Button
      onClick={() => {
        collectionState.items.push({
          spice,
          style: "global",
        });
      }}
      disabled={isInCollection}
    >
      Add to collection
      <PlusIcon className="size-4" />
    </Button>
  );
}
