"use client";

import { createContext, useMemo } from "react";

export const GlobalFontsContext = createContext<{
  googleFonts: GoogleFont[];
  fontUrls: string[];
}>(null!);

export type GoogleFont = {
  family: string;
  styles?: string[];
}

export function GlobalFontsProvider({ children, googleFonts }: { children: React.ReactNode, googleFonts: GoogleFont[] }) {
  const googleFontsUrl = useMemo(() => {
    const url = new URL("https://fonts.googleapis.com/css2");
    for (const font of googleFonts) {
      const styles = font.styles?.join(",");
      url.searchParams.append("family", styles ? `${font.family}:${styles}` : font.family);
    }
    return url;
  }, [googleFonts]);

  const fontUrls = useMemo(() => [googleFontsUrl.toString()], [googleFontsUrl]);
  
  return (
    <GlobalFontsContext.Provider value={useMemo(() => ({ googleFonts, fontUrls }), [googleFonts, fontUrls])}>
      {children}
    </GlobalFontsContext.Provider>
  );
}