import { Spice } from "@/lib/spices";
import { proxy } from "valtio";
import { LabelStyle } from "./label-settings-provider";

export type Collection = {
  items: {
    spice: Spice;
    style: LabelStyle | "global";
  }[];
};

export const collectionState = proxy<Collection>({
  items: [],
});