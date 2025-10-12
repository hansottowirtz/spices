import { useState, useEffect, useLayoutEffect } from "react";

type ScrollMeasures = {
  scrollY: number;
  innerHeight: number;
  innerWidth: number;
  loaded: boolean;
}
export function useScrollMeasures() {
  const [measures, setMeasures] = useState<ScrollMeasures>({
    scrollY: 0,
    innerHeight: 0,
    innerWidth: 0,
    loaded: false
  });

  const [measureDiv, setMeasureDiv] = useState<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const div = document.createElement("div");
    div.style.height = "100svh";
    div.style.pointerEvents = "none";
    document.body.appendChild(div);
    setMeasureDiv(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);
  
  useEffect(() => {
    if (!measureDiv) return;
    let svh = measureDiv.clientHeight;
    const fn = () => {
      setMeasures({
        scrollY: window.scrollY,
        innerHeight: svh ?? window.innerHeight,
        innerWidth: window.innerWidth,
        loaded: true
      });
    };
    const resizeFn = () => {
      svh = measureDiv.clientHeight;
      fn();
    };
    fn();
    window.addEventListener("scroll", fn);
    window.addEventListener("resize", resizeFn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", resizeFn);
    };
  }, [measureDiv]);

  return measures;
}