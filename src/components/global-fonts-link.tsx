"use client";

import { useContext } from "react";
import { GlobalFontsContext } from "./global-fonts-provider";

export function GlobalFontsLink() {
  const { fontUrls } = useContext(GlobalFontsContext);

  return <>{
    fontUrls.map((url) => (
      <link key={url} rel="stylesheet" href={url} />
    )) 
  }</>
}
