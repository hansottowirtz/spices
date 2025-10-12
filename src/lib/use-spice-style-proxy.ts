import { Collection, collectionState } from "@/components/collection-provider";
import { Spice } from "./spices";
import { useSnapshot } from "valtio";
import { LabelStyle, labelStyleState } from "@/components/label-settings-provider";

export function useSpiceStyleProxy(spice: Spice) {
  const collection = useSnapshot(collectionState);
  const collectionItem = collection.items.find(
    (item) => item.spice.id === spice.id
  );
  const collectionItemProxy = collectionState.items.find(
    (item) => item.spice.id === spice.id
  );

  const collectionItemStyle = collectionItemProxy?.style === "global" ? undefined : collectionItemProxy?.style;
  return {
    style: collectionItemStyle ?? labelStyleState,
    isGlobalStyle: !collectionItem || collectionItem?.style === "global",
    hasCollectionItem: collectionItem !== undefined,
  }
}

export function getSpiceStyle(spice: Spice, collection: Collection, globalStyle: LabelStyle) {
  const collectionItem = collection.items.find(
    (item) => item.spice.id === spice.id
  );
  return (collectionItem?.style === "global" ? undefined : collectionItem?.style) ?? globalStyle;
}