"use client";

import { Fragment, Ref, useId, ReactNode, CSSProperties } from "react";
import { cuisineLanguages, Spice } from "@/lib/spices";
import {
  FontSettings,
  getFallbackLanguages,
  LabelStyle,
  Language,
} from "./label-settings-provider";
import { cn } from "@/lib/utils";
import { useCanRenderTspanConnectedGlyphs } from "@/lib/use-can-render-tspan-connected-glyphs";
import { graphemeSplit } from "@/lib/grapheme-split";
import { getTextDirection } from "@/lib/text-direction";
import { useCanRenderTspanRtlText } from "@/lib/use-can-render-tspan-rtl-text";

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

function generateTextShadow(): string {
  const color = 'white';
  const sizes = [3,4,5];
  const blur = 0;
  const anglesCount = 100;
  const angles = Array.from({ length: anglesCount }, (_, i) => (360 / anglesCount) * i);

  return angles
    .flatMap(
      (angle) => sizes.map((size) => {
        const x = Math.cos((angle * Math.PI) / 180) * size;
        const y = Math.sin((angle * Math.PI) / 180) * size;
        return `${x}px ${y}px ${blur}px ${color}`; 
      })
    )
    .join(", ");
}

export function LabelRenderer({
  spice,
  outline,
  ref,
  style: settings,
  scaleToFit,
  deferRender,
  hideSkeleton,
  noBrowserDetection,
  expectedImageSize,
  ImageComponent,
  qualitySettings
}: {
  spice: Spice;
  outline?: boolean;
  style: LabelStyle;
  ref?: Ref<HTMLDivElement>;
  scaleToFit?: boolean;
  deferRender?: boolean;
  hideSkeleton?: boolean;
  noBrowserDetection?: boolean;
  expectedImageSize?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ImageComponent?: (props: any) => ReactNode;
  qualitySettings?: {
    strokes: number;
  }
}) {
  const imageId = spice.imageId ?? spice.id;

  const UsedImageComponent = ImageComponent ?? "img";
  const imageSize = expectedImageSize ?? SIZE;

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
      {!hideSkeleton && (
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
      )}
      {!deferRender && (
        <>
          <BackgroundLayerSvg className="absolute top-0 left-0" />
          <div className="absolute top-0 left-0 w-full h-full">
            <UsedImageComponent
              alt={`Image for ${spice.id}`}
              src={`/spices/${imageId}.png`}
              width={imageSize}
              height={imageSize}
              className="size-full"
            />
          </div>
          <TextLayerSvg
            className="absolute top-0 left-0"
            spice={spice}
            style={settings}
            noBrowserDetection={noBrowserDetection}
            strokeStyles={
              qualitySettings?.strokes
                ? strokeStyles.slice(0, qualitySettings.strokes)
                : strokeStyles
            }
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
  // {
  //   textShadow: generateTextShadow(),
  // }
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
  names: Array<{ lang: Language; value: string; romanized?: string }>,
  language: string
) => {
  const name = names.find((x) => x.lang === language);
  if (name) return name;
  const fallbacks = getFallbackLanguages(
    language as Language,
    names.map((x) => x.lang)
  );
  return names.find((x) => fallbacks.includes(x.lang));
};

function formatFontFamily(fontFamily: string) {
  if (fontFamily[0] !== fontFamily[0].toLowerCase()) {
    return `'${fontFamily}'`;
  }
  return fontFamily;
}

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
  style.fontFamily = formatFontFamily(font.family);
  style.fontWeight = font.weight;
  style.fontStyle = font.style;
  return { style };
}

export function getSpiceNames(spice: Spice, style: LabelStyle) {
  const title = findName(spice.names, style.primaryLanguage);
  const binomial = spice.binomialName;

  const secondaryLanguage = style.secondaryLanguage;

  const etymologicalOriginName = spice.etymologicalOrigin
    ? findName(spice.names, spice.etymologicalOrigin!)
    : undefined;
  const mainCuisine = spice.cuisines?.[0];
  const cuisineName = mainCuisine
    ? (() => {
        const cuisineLangs = cuisineLanguages[mainCuisine];
        if (!cuisineLangs) return;
        if (secondaryLanguage && cuisineLangs.includes(secondaryLanguage)) {
          const name = findName(spice.names, secondaryLanguage);
          if (name) {
            return name;
          }
        }
        return findName(spice.names, cuisineLangs[0]);
      })()
    : undefined;
  const chemicalName = spice.eCode;
  let secondaryName = style.secondaryLanguage
    ? findName(spice.names, style.secondaryLanguage)
    : undefined;
  secondaryName =
    secondaryName?.value !== title?.value ? secondaryName : undefined;

  return {
    title,
    binomial,
    etymologicalOriginName,
    cuisineName,
    chemicalName,
    secondaryName,
  };
}

function TextLayerSvg({
  className,
  spice,
  style,
  noBrowserDetection,
  strokeStyles
}: {
  className: string;
  spice: Spice;
  style: LabelStyle;
  noBrowserDetection?: boolean;
  strokeStyles?: React.CSSProperties[];
}) {
  const {
    title,
    binomial,
    etymologicalOriginName,
    cuisineName,
    chemicalName,
    secondaryName,
  } = getSpiceNames(spice, style);

  const bottomTexts: {
    lang: Language;
    value: string;
    romanized?: string;
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
      romanized: cuisineName.romanized,
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
    (title ? style.languageFonts[title?.lang] : null) ??
    style.languageFonts.default;
  const titleFont =
    titleFontLanguage.heading ??
    style.languageFonts.default.heading ??
    titleFontLanguage.default;

  const chemicalFont = style.chemicalFont;
  const binomialFont = style.binomialFont;

  const titleStyleAndPortal = fontSettingsToStyleAndPortal(titleFont, 4);
  const binomialStyleAndPortal = fontSettingsToStyleAndPortal(
    binomialFont,
    1.3
  );
  const bottomSeparatorStyleAndPortal = fontSettingsToStyleAndPortal(
    style.bottomSeparatorFont,
    2
  );

  const Tspan = noBrowserDetection ? "tspan" : FixedTspan;

  return (
    <svg className={className} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {title && (
        <CircularTextPath
          radius={
            (SIZE / 2) * style.textOffsets.title.margin * (1 - style.bleed)
          }
          startAngle={Math.PI * (-3 / 8)}
          endAngle={Math.PI * (11 / 8)}
          strokeStyles={strokeStyles}
          wireframe={style.wireframe}
        >
          <Tspan
            language={title.lang}
            style={titleStyleAndPortal.style}
            alignmentBaseline="middle"
          >
            {title.value}
          </Tspan>
          {titleStyleAndPortal.portal}
        </CircularTextPath>
      )}
      {binomial && (
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
          <tspan
            style={binomialStyleAndPortal.style}
            alignmentBaseline="middle"
          >
            {binomial}
          </tspan>
          {binomialStyleAndPortal.portal}
        </CircularTextPath>
      )}
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
        {bottomSeparatorStyleAndPortal.portal}
        {bottom.map((x, i) => {
          const getLangStyle = (lang: Language) =>
            accessKeyOrDefault(style.languageFonts, lang);
          const fontCssAndPortal =
            x.type === "chemical"
              ? fontSettingsToStyleAndPortal(chemicalFont, 2.5)
              : fontSettingsToStyleAndPortal(getLangStyle(x.lang).default, 2.5);
          const romanizedFontCssAndPortal =
            x.type === "local" && x.romanized
              ? fontSettingsToStyleAndPortal(
                  getLangStyle(x.lang).romanized ??
                    getLangStyle(x.lang).default,
                  1.5
                )
              : undefined;
          return (
            <Fragment key={i}>
              {fontCssAndPortal.portal}
              <Tspan
                language={x.type === "local" ? x.lang : "en"}
                style={fontCssAndPortal.style}
                dx={i > 0 ? 10 : 0}
                alignmentBaseline="middle"
              >
                {x.value}
              </Tspan>
              {"romanized" in x &&
                x.romanized &&
                getLangStyle(x.lang).showRomanized && (
                  <>
                    {romanizedFontCssAndPortal!.portal}
                    <Tspan
                      language={x.lang}
                      style={romanizedFontCssAndPortal!.style}
                      dx={10}
                      alignmentBaseline="middle"
                    >
                      {x.romanized}
                    </Tspan>
                  </>
                )}
              {i < bottom.length - 1 && (
                <tspan
                  style={{
                    padding: "0 12px",
                    ...bottomSeparatorStyleAndPortal.style,
                  }}
                  dx={10}
                  alignmentBaseline="middle"
                >
                  {style.bottomSeparator}
                </tspan>
              )}
            </Fragment>
          );
        })}
      </CircularTextPath>
    </svg>
  );
}

function FixedTspan({
  children,
  language,
  ...props
}: React.SVGProps<SVGTSpanElement> & {
  language: string;
  children: string;
}) {
  const canRenderTspanConnectedGlyphs = useCanRenderTspanConnectedGlyphs();
  const canRenderTspanRtlText = useCanRenderTspanRtlText();

  if (
    canRenderTspanConnectedGlyphs !== false &&
    canRenderTspanRtlText !== false
  ) {
    return <tspan {...props}>{children}</tspan>;
  }

  const graphemes = graphemeSplit(children as string, language);
  const hasGraphemeConnectionIssue = graphemes.length !== children.length;

  let usedGraphemes = graphemes;
  if (hasGraphemeConnectionIssue) {
    usedGraphemes = usedGraphemes.map((grapheme) => grapheme[0]);
  }

  if (canRenderTspanRtlText === false) {
    const textDirection = getTextDirection(children);
    if (textDirection === "rtl") {
      usedGraphemes = [...usedGraphemes].reverse();
    }
  }

  return <tspan {...props}>{usedGraphemes.join("")}</tspan>;
}

function accessKeyOrDefault<
  T,
  TObj extends Record<string, T> & { default: T },
  TKey extends keyof TObj
>(obj: TObj, key: TKey): TObj["default"] {
  return key in obj ? obj[key] : obj.default;
}
