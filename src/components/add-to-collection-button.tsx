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
          onClick={() => {
            collectionState.items = collectionState.items.map((item) => {
              if (item.spice.id === spice.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          }}
        >
          Add another
          <PlusIcon className="size-4" />
        </Button>
        <div className="rounded-full dark:border-white border-black border-2 size-9 text-sm flex items-center justify-center gap-2">
          {
            collection.items.find((item) => item.spice.id === spice.id)
              ?.quantity
          }
        </div>
      </>
    );
  }

  return (
    <Button
      onClick={() => {
        collectionState.items.push({
          spice,
          style: "global",
          quantity: 1,
        });
      }}
      disabled={isInCollection}
    >
      Add to collection
      <PlusIcon className="size-4" />
    </Button>
  );
}
