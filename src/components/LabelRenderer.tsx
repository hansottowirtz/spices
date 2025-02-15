"use client";

import {
  Fragment,
  Ref,
  useId,
  createElement,
  ReactNode,
  CSSProperties,
} from "react";
import { cuisineLanguages, Spice } from "@/lib/spices";
import { FontSettings, LabelStyle, Language } from "./label-settings-provider";
import { cn } from "@/lib/utils";

const SIZE = 600;
const REM = 16;

function calculateCircleSectionPath(
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

  const xAxisRotation = 0;
  const largeArcFlag =
    (startAngle > endAngle ? 1 : 0) ^
    (Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0);
  const sweepFlag = invert ? 0 : 1;

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  if (invert) {
    return `M ${endx} ${endy} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${startx} ${starty}`;
  }
  return `M ${startx} ${starty} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endx} ${endy}`;
}

function CircularTextPath({
  radius,
  startAngle,
  endAngle,
  invert,
  children,
  strokeStyles,
  wireframe,
}: {
  radius: number;
  startAngle: number;
  endAngle: number;
  invert?: boolean;
  children: React.ReactNode;
  strokeStyles?: React.CSSProperties[];
  wireframe?: boolean;
}) {
  const id = useId();

  return (
    <>
      <path
        id={`circle-${id}`}
        d={calculateCircleSectionPath(
          radius,
          startAngle,
          endAngle,
          !!invert,
          SIZE / 2,
          SIZE / 2
        )}
        className={`fill-none ${wireframe ? "stroke-pink-500" : "stroke-none"}`}
      />
      <text style={{ fontSize: REM }}>
        {strokeStyles?.map((strokeStyle, i) => (
          <textPath
            key={i}
            href={`#circle-${id}`}
            startOffset="50%"
            textAnchor="middle"
            style={strokeStyle}
          >
            {children}
          </textPath>
        ))}
        <textPath
          key={"main"}
          href={`#circle-${id}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {children}
        </textPath>
      </text>
    </>
  );
}

export function LabelRenderer({
  spice,
  outline,
  ref,
  style: settings,
  scaleToFit,
  deferRender,
  ImageComponent,
}: {
  spice: Spice;
  outline?: boolean;
  style: LabelStyle;
  ref?: Ref<HTMLDivElement>;
  scaleToFit?: boolean;
  deferRender?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ImageComponent?: (props: any) => ReactNode;
}) {
  const imageId = spice.imageId ?? spice.id;

  return (
    <div
      className="relative"
      style={{
        fontSynthesis: "none",
        ...(scaleToFit
          ? { aspectRatio: 1 }
          : { width: SIZE, height: SIZE, fontSize: REM }),
      }}
      ref={ref}
    >
      <div className="size-full relative aspect-square">
        <div
          className={
            "outline " +
            cn(
              "absolute inset-0 rounded-full bg-white",
              outline && "outline-2 outline-black dark:outline-none"
            )
          }
        />
      </div>
      {!deferRender && (
        <>
          <BackgroundLayerSvg className="absolute top-0 left-0" />
          <div className="absolute top-0 left-0 w-full h-full">
            {createElement((ImageComponent ?? "img") as "img", {
              alt: `Image for ${spice.id}`,
              src: `/spices/${imageId}.png`,
              width: SIZE,
              height: SIZE,
              className: "size-full",
            })}
          </div>
          <TextLayerSvg
            className="absolute top-0 left-0"
            spice={spice}
            style={settings}
          />
        </>
      )}
    </div>
  );
}

function BackgroundLayerSvg({ className }: { className: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} fill="#fff" />
    </svg>
  );
}

const strokeStyles: React.CSSProperties[] = [
  {
    // opacity: 0.85,
    paintOrder: "stroke",
    stroke: "#ffffff",
    strokeWidth: "8px",
  },
  {
    // opacity: 0.85,
    paintOrder: "stroke",
    stroke: "#ffffff",
    strokeWidth: "6px",
  },
  {
    // opacity: 0.85,
    paintOrder: "stroke",
    stroke: "#ffffff",
    strokeWidth: "4px",
  },
];

const findName = (
  names: Array<{ lang: Language; value: string }>,
  language: string
) => names.find((x) => x.lang === language);

function fontSettingsToStyleAndPortal(font: FontSettings, baseSize = 1) {
  const style: CSSProperties = {
    fontSize: `${baseSize * (font.size ?? 1)}em`,
    letterSpacing: `${font.spacing ?? 0}em`,
  };
  if (font.type === "local") {
    style.fontFamily = font.familyPostscriptName;
    const portal = (
      <style>{`
        @font-face {
          font-family: '${font.familyPostscriptName}';
          src: local('${font.familyFullName}'), local('${font.familyPostscriptName}');
        }
      `}</style>
    );
    return { style, portal };
  }
  style.fontFamily = font.family;
  style.fontWeight = font.weight;
  style.fontStyle = font.style;
  return { style };
}

function TextLayerSvg({
  className,
  spice,
  style,
}: {
  className: string;
  spice: Spice;
  style: LabelStyle;
}) {
  const title = findName(spice.names, style.primaryLanguage)?.value;
  const binomial = findName(spice.names, "Binomial")?.value;

  const etymologicalOriginName = spice.etymologicalOrigin
    ? findName(spice.names, spice.etymologicalOrigin!)
    : undefined;
  const mainCuisine = spice.cuisines?.[0];
  const cuisineName = mainCuisine
    ? findName(spice.names, cuisineLanguages[mainCuisine])
    : undefined;
  const chemicalName = spice.eCode;
  const secondaryName = style.secondaryLanguage
    ? findName(spice.names, style.secondaryLanguage)
    : undefined;

  const bottomTexts: {
    lang: Language;
    value: string;
    type: "local" | "chemical";
  }[] = [];
  if (etymologicalOriginName) {
    bottomTexts.push({
      lang: etymologicalOriginName.lang,
      value: etymologicalOriginName.value,
      type: "local",
    });
  }
  if (cuisineName) {
    bottomTexts.push({
      lang: cuisineName.lang,
      value: cuisineName.value,
      type: "local",
    });
  }
  if (secondaryName) {
    bottomTexts.push({
      lang: secondaryName.lang,
      value: secondaryName.value,
      type: "local",
    });
  }

  const uniqueBottomTexts: typeof bottomTexts = [];
  for (const x of bottomTexts) {
    if (x.lang === style.primaryLanguage) continue;
    if (uniqueBottomTexts.some((y) => y.lang === x.lang)) continue;
    uniqueBottomTexts.push(x);
  }

  const bottom = [
    ...uniqueBottomTexts,
    ...(chemicalName
      ? [
          {
            type: "chemical" as const,
            value: chemicalName!,
          },
        ]
      : []),
  ];

  const titleFontLanguage =
    style.languageFonts.English ?? style.languageFonts.default;
  const titleFont = titleFontLanguage.heading ?? titleFontLanguage.default;

  const chemicalFont = style.chemicalFont;
  const binomialFont = style.binomialFont;

  const titleStyleAndPortal = fontSettingsToStyleAndPortal(titleFont, 4);
  const binomialStyleAndPortal = fontSettingsToStyleAndPortal(
    binomialFont,
    1.3
  );

  console.log({ titleStyleAndPortal})

  return (
    <svg className={className} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <CircularTextPath
        radius={(SIZE / 2) * style.textOffsets.title.margin * (1 - style.bleed)}
        startAngle={Math.PI * (-3 / 8)}
        endAngle={Math.PI * (11 / 8)}
        strokeStyles={strokeStyles}
        wireframe={style.wireframe}
      >
        <tspan style={titleStyleAndPortal.style} alignmentBaseline="middle">
          {title}
        </tspan>
        {titleStyleAndPortal.portal}
      </CircularTextPath>
      <CircularTextPath
        radius={
          (SIZE / 2) * style.textOffsets.binomial.margin * (1 - style.bleed)
        }
        startAngle={Math.PI * (5 / 8)}
        endAngle={Math.PI * (3 / 8)}
        invert
        strokeStyles={strokeStyles}
        wireframe={style.wireframe}
      >
        <tspan style={binomialStyleAndPortal.style} alignmentBaseline="middle">
          {binomial}
        </tspan>
        {binomialStyleAndPortal.portal}
      </CircularTextPath>
      <CircularTextPath
        radius={
          (SIZE / 2) * style.textOffsets.bottom.margin * (1 - style.bleed)
        }
        startAngle={Math.PI * (5 / 8)}
        endAngle={Math.PI * (3 / 8)}
        invert
        strokeStyles={strokeStyles}
        wireframe={style.wireframe}
      >
        {bottom.map((x, i) => {
          const fontCssAndPortal =
            x.type === "chemical"
              ? fontSettingsToStyleAndPortal(chemicalFont, 2.5)
              : fontSettingsToStyleAndPortal(
                  accessKeyOrDefault(style.languageFonts, x.lang).default,
                  2.5
                );
          return (
            <Fragment key={i}>
              {fontCssAndPortal.portal}
              <tspan
                style={fontCssAndPortal.style}
                dx={i > 0 ? 10 : 0}
                alignmentBaseline="middle"
              >
                {x.value}
              </tspan>
              {i < bottom.length - 1 && (
                <tspan
                  style={{ fontSize: "35px", padding: "0 10px" }}
                  dx={10}
                  alignmentBaseline="middle"
                >
                  {"/"}
                </tspan>
              )}
            </Fragment>
          );
        })}
      </CircularTextPath>
    </svg>
  );
}

function accessKeyOrDefault<
  T,
  TObj extends Record<string, T> & { default: T },
  TKey extends keyof TObj
>(obj: TObj, key: TKey): TObj["default"] {
  return key in obj ? obj[key] : obj.default;
}
