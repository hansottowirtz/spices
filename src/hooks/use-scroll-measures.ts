import { useState, useEffect } from "react";

type ScrollMeasures = {
  scrollY: number;
  innerHeight: number;
  innerWidth: number;
}
export function useScrollMeasures() {
  const [measures, setMeasures] = useState<ScrollMeasures>({
    scrollY: 0,
    innerHeight: 0,
    innerWidth: 0
  });
  
  useEffect(() => {
    const fn = () => {
      setMeasures({
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      });
    };
    window.addEventListener("scroll", fn);
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);

  return measures;
}