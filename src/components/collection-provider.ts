import { Spice } from "@/lib/spices";
import { proxy } from "valtio";
import { LabelStyle } from "./label-settings-provider";

let nextKey = 1;

export type CollectionItem = {
  key: number;
  spice: Spice;
  style: LabelStyle | "global";
}

export type Collection = {
  items: CollectionItem[];
};

export const collectionState = proxy<Collection>({
  items: [],
});

export function createCollectionItem(spice: Spice): CollectionItem {
  return { key: nextKey++, spice: { ...spice }, style: "global" };
}

export function insertAfterLastOccurrence(spice: Spice) {
  const lastIndex = collectionState.items.findLastIndex(
    (item) => item.spice.id === spice.id,
  );
  const newItem = createCollectionItem(spice);
  if (lastIndex >= 0) {
    collectionState.items.splice(lastIndex + 1, 0, newItem);
  } else {
    collectionState.items.push(newItem);
  }
}