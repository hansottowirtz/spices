import { useState, useEffect } from "react";

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
  
  useEffect(() => {
    let svh = calculateSvh();
    const fn = () => {
      setMeasures({
        scrollY: window.scrollY,
        innerHeight: svh ?? window.innerHeight,
        innerWidth: window.innerWidth,
        loaded: true
      });
    };
    const resizeFn = () => {
      svh = calculateSvh();
      fn();
    };
    fn();
    window.addEventListener("scroll", fn);
    window.addEventListener("resize", resizeFn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", resizeFn);
    };
  }, []);

  return measures;
}

function calculateSvh() {
  const div = document.createElement("div");
  div.style.height = "100svh";
  div.style.pointerEvents = "none";
  document.body.appendChild(div);
  const height = div.clientHeight;
  document.body.removeChild(div);
  return height;
}