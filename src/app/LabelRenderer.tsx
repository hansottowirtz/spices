"use client";

import { Fragment, useId } from "react";
import { Spice } from "@/lib/spices";

const SIZE = 600;

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
}: {
  radius: number;
  startAngle: number;
  endAngle: number;
  invert?: boolean;
  children: React.ReactNode;
  strokeStyles?: React.CSSProperties[];
}) {
  const id = useId();
  return (
    <>
      <defs>
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
        />
      </defs>
      <text>
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

export function LabelRenderer({ spice }: { spice: Spice }) {
  const imageId = spice.imageId ?? spice.id;

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <BackgroundLayerSvg className="absolute top-0 left-0" />
      <div className="absolute top-0 left-0 w-full h-full">
        <img src={`/spices/${imageId}.png`} className="w-full h-full" />
      </div>
      <TextLayerSvg className="absolute top-0 left-0" spice={spice} />
    </div>
  );
}

function BackgroundLayerSvg({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
    >
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
  names: Array<{ lang: string; value: string }>,
  language: string
) => names.find((x) => x.lang === language);

const preferredSecondaryLanguage = "Chinese Simplified";

function TextLayerSvg({
  className,
  spice,
}: {
  className: string;
  spice: Spice;
}) {
  const title = findName(spice.names, "English")?.value;
  const binomial = findName(spice.names, "Binomial")?.value;

  const etymologicalOriginName = spice.etymologicalOrigin
    ? findName(spice.names, spice.etymologicalOrigin!)
    : undefined;
  const mainCuisine = spice.cuisines?.[0];
  const cuisineName = mainCuisine
    ? findName(spice.names, mainCuisine)
    : undefined;
  const chemicalName = spice.eCode;
  const secondaryName = preferredSecondaryLanguage
    ? findName(spice.names, preferredSecondaryLanguage)
    : undefined;

  const bottom = [
    ...(etymologicalOriginName
      ? [
          {
            type: "local" as const,
            lang: etymologicalOriginName.lang,
            value: etymologicalOriginName.value,
          },
        ]
      : []),
    ...(cuisineName && cuisineName.lang !== etymologicalOriginName?.lang
      ? [
          {
            type: "local" as const,
            lang: cuisineName.lang,
            value: cuisineName.value,
          },
        ]
      : []),
    ...(secondaryName &&
    secondaryName.lang !== etymologicalOriginName?.lang &&
    secondaryName.lang !== cuisineName?.lang
      ? [
          {
            type: "local" as const,
            lang: secondaryName.lang,
            value: secondaryName.value,
          },
        ]
      : []),
    ...(chemicalName
      ? [
          {
            type: "chemical" as const,
            value: chemicalName!,
          },
        ]
      : []),
  ];

  return (
    <svg
      className={className}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
    >
      <CircularTextPath
        radius={SIZE * 0.35}
        startAngle={Math.PI * (-1 / 8)}
        endAngle={Math.PI * (9 / 8)}
        strokeStyles={strokeStyles}
      >
        <tspan
          style={{
            fontFamily: "Glegoo",
            fontSize: "60px",
            fontWeight: "bold",
            letterSpacing: "-4px",
          }}
        >
          {title}
        </tspan>
      </CircularTextPath>
      <CircularTextPath
        radius={SIZE * 0.35}
        startAngle={Math.PI * (9 / 8)}
        endAngle={Math.PI * (-1 / 8)}
        invert
        strokeStyles={strokeStyles}
      >
        <tspan
          style={{
            fontFamily: "Petit Formal Script",
            fontSize: "20px",
          }}
        >
          {binomial}
        </tspan>
      </CircularTextPath>
      <CircularTextPath
        radius={SIZE * 0.43}
        startAngle={Math.PI * (9 / 8)}
        endAngle={Math.PI * (-1 / 8)}
        invert
        strokeStyles={strokeStyles}
      >
        {bottom.map((x, i) => {
          return (
            <Fragment key={i}>
              <tspan
                style={{
                  fontSize: "40px",
                  ...(x.type === "chemical"
                    ? {
                        fontFamily: "Courier Prime",
                      }
                    : bottomLanguageFontStyles[x.lang]),
                }}
                dx={i > 0 ? 10 : 0}
              >
                {x.value}
              </tspan>
              {i < bottom.length - 1 && (
                <tspan
                  style={{ fontSize: "35px", padding: "0 10px" }}
                  dx={10}
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
};

const bottomLanguageFontStyles: Record<string, React.CSSProperties> = {
  "Chinese Simplified": {
    fontFamily: "serif",
  },
  "Chinese Traditional": {
    fontFamily: "serif",
  },
  Korean: {
    fontFamily: "sans-serif",
  },
  Japanese: {
    fontFamily: "serif",
  },
  Persian: {
    fontFamily: "Noto Sans Arabic",
  },
  Arabic: {
    fontFamily: "Noto Sans Arabic",
  },
};
