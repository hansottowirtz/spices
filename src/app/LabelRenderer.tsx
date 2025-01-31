"use client";

import { useCallback } from "react";
import { Svg } from "@svgdotjs/svg.js";
import { Spice } from "@/lib/spices";

const SIZE = 600;

function drawCircleSector(
  draw: Svg,
  radius: number,
  startAngle: number,
  endAngle: number,
  invert: boolean,
  midpointX: number = 0,
  midpointY: number = 0
) {
  const dx1 = radius * Math.cos(startAngle);
  const dy1 = radius * Math.sin(startAngle);
  const startx = midpointX - dx1;
  const starty = midpointY - dy1;

  const dx2 = radius * Math.cos(endAngle);
  const dy2 = radius * Math.sin(endAngle);
  const endx = midpointX - dx2;
  const endy = midpointY - dy2;

  const rx = radius;
  const ry = radius;
  // return draw.path(`M ${midpointX - dx1} ${midpointY - dy1} L ${midpointX} ${midpointY}`)
  const xAxisRotation = 0;
  const largeArcFlag =
    (startAngle > endAngle ? 1 : 0) ^
    (Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0);
  const sweepFlag = invert ? 0 : 1;

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  if (invert) {
    return draw.path(
      `M ${endx} ${endy} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${startx} ${starty}`
    );
  }
  {
    return draw.path(
      `M ${startx} ${starty} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endx} ${endy}`
    );
  }
}

function createTextPath(
  draw: Svg,
  radius: number,
  parentRadius: number,
  startAngle: number = 0,
  endAngle: number = Math.PI,
  invert: boolean
) {
  const randomId = Math.random().toString(36).substring(7);
  const id = `arc-${randomId}`;
  const path = drawCircleSector(
    draw,
    radius,
    startAngle,
    endAngle,
    invert,
    parentRadius,
    parentRadius
  )
    // .stroke("#f00")
    .fill("transparent")
    .attr("id", id);
  const textPath = draw
    .element("text")
    .element("textPath")
    .attr("href", `#${id}`)
    .attr("startOffset", "50%")
    .attr("text-anchor", "middle");
  return textPath;
}

function addStroke(el: SVGElement) {
  el.setAttribute("paint-order", "stroke");
  el.style.stroke = "#ffffffbb";
  el.style.strokeWidth = "8px";
}

export function LabelRenderer({ spice }: { spice: Spice }) {
  const textLayerRef = useCallback((node: SVGSVGElement) => {
    if (!node) return;

    const draw = new Svg(node);
    draw.clear();
    draw.width(SIZE).height(SIZE);

    const findName = (
      names: Array<{ lang: string; value: string }>,
      language: string
    ) => names.find((x) => x.lang === language);

    // Main title (English)
    const englishName = findName(spice.names, "English")?.value;
    if (englishName) {
      const title = createTextPath(
        draw,
        SIZE * 0.35,
        SIZE / 2,
        Math.PI * (-1 / 8),
        Math.PI * (9 / 8),
        false
      );
      const tspan = title.element("tspan").words(englishName);
      addStroke(title.node);
      tspan.node.style.fontFamily = "Glegoo";
      tspan.node.style.fontSize = "60px";
      tspan.node.style.fontWeight = "bold";
      tspan.node.style.letterSpacing = "-4px";
    }

    // Binomial name
    const binomialName = findName(spice.names, "Binomial")?.value;
    if (binomialName) {
      const binomial = createTextPath(
        draw,
        SIZE * 0.35,
        SIZE / 2,
        Math.PI * (9 / 8),
        Math.PI * (-1 / 8),
        true
      );
      const tspan = binomial.element("tspan").words(binomialName);
      addStroke(binomial.node);
      tspan.node.style.fontFamily = "Petit Formal Script";
      tspan.node.style.fontSize = "20px";
    }

    // Chinese name
    const localName =
      (spice.etymologicalOrigin
        ? findName(spice.names, spice.etymologicalOrigin)
        : null) ?? findName(spice.names, "Chinese Simplified");
    const chemicalName = spice.eCode;
    const arr = [
      {
        type: "local",
        value: localName?.value!,
        lang: localName?.lang,
      },
      {
        type: "chemical",
        value: chemicalName!,
      },
    ].filter((x) => !!x.value);
    const local = createTextPath(
      draw,
      SIZE * 0.45,
      SIZE / 2,
      Math.PI * (9 / 8),
      Math.PI * (-1 / 8),
      true
    );
    for (let i = 0; i < arr.length; i++) {
      const name = arr[i];
      const tspan = local.element("tspan").words(name.value);
      addStroke(local.node);
      tspan.node.style.fontFamily =
        name.type === "local"
          ? name.lang === "Chinese Simplified"
            ? "serif"
            : "sans-serif"
          : "Courier Prime";
      tspan.node.style.fontSize = "40px";
      if (i > 0) {
        tspan.attr("dx", "5");
      }
      if (i < arr.length - 1) {
        const sep = local.element("tspan").words("  /  ");
        sep.node.style.fontSize = "35px";
        sep.node.style.padding = "0 10px";
        sep.attr("dx", "5");
      }
    }
  }, []);

  const backgroundLayerRef = useCallback((node: SVGSVGElement) => {
    if (!node) return;

    const draw = new Svg(node);
    draw.clear();
    draw.width(SIZE).height(SIZE);

    draw.circle(SIZE).fill("#fff");
  }, []);

  const imageId = spice.imageId ?? spice.id;

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <svg ref={backgroundLayerRef} className="absolute top-0 left-0"></svg>
      <div className="absolute top-0 left-0 w-full h-full">
        <img src={`/spices/${imageId}.png`} className="w-full h-full" />
      </div>
      <svg ref={textLayerRef} className="absolute top-0 left-0"></svg>
    </div>
  );
}
