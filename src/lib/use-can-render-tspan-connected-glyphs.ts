import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";

export function useCanRenderTspanConnectedGlyphs() {
  const [engine, setEngine] = useState<string | null>(null);

  useEffect(() => {
    setEngine(new UAParser().getEngine().name ?? null);
  }, []);

  return engine ? engine === "Blink" : null;
}