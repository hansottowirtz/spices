"use client";

import { collectionState } from "@/components/collection-provider";
import { proxy, useSnapshot } from "valtio";
import { useContext, useEffect, useState } from "react";
import { getSpiceStyle } from "@/lib/use-spice-style-proxy";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PrinterIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { exportLabel } from "@/lib/use-export-mutation";
import { labelStyleState } from "@/components/label-settings-provider";
import { GlobalFontsContext } from "@/components/global-fonts-provider";
import { experimental_streamedQuery as streamedQuery } from '@tanstack/react-query'

type PageLayoutSettings = {
  columns: number;
  rows: number;
  spacing: number;
  paperSize: "A4";
  labelSize: number;
  dpi: number;
};

const pageLayoutSettings = proxy<PageLayoutSettings>({
  columns: 4,
  rows: 5,
  spacing: 6.5,
  paperSize: "A4",
  labelSize: 45,
  dpi: 300,
});

export default function CollectionPage() {
  const collection = useSnapshot(collectionState) as typeof collectionState;
  const settings = useSnapshot(pageLayoutSettings);
  const fontUrls = useContext(GlobalFontsContext).fontUrls;

  const labelsPerPage = settings.columns * settings.rows;

  const pages = Math.ceil(collection.items.length / labelsPerPage);

  const pagesArr = Array.from({ length: pages }, (_, i) => {
    const start = i * labelsPerPage;
    const end = start + labelsPerPage;
    const items = collection.items.slice(start, end);
    const paddingItems = Array.from({ length: labelsPerPage - items.length }, () => null);
    return {
      items,
      paddingItems,
    }
  });

  useEffect(() => {
    document.body.classList.add("printable-page");
    return () => {
      document.body.classList.remove("printable-page");
    };
  }, []);

  const labelStyle = useSnapshot(labelStyleState);
  const allLabelsRenderedQuery = useQuery({
    queryKey: ["allLabelsRendered", 2, collection, labelStyle, fontUrls],
    queryFn: streamedQuery({
      streamFn: async function* generate() {
        const labelWidthInches = settings.labelSize / 25.4;
        const totalDots = labelWidthInches * settings.dpi;
        const scale = totalDots / 600;
        for (const page of pagesArr) {
          for (const item of page.items) {
            const style = getSpiceStyle(item.spice, collection, labelStyle);
            yield await exportLabel(item.spice, scale, style, fontUrls);
          }
        }
      },
    }),
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [blobUrls, setBlobUrls] = useState<string[]>([]);
  useEffect(() => {
    if (!allLabelsRenderedQuery.data) return;
    const blobUrls = allLabelsRenderedQuery.data.map((blob) => URL.createObjectURL(blob)) ?? [];
    setBlobUrls(blobUrls);
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [allLabelsRenderedQuery.data]);

  return (
    <>
      <div className="max-w-[1500px] mx-auto px-2">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 my-4">
          Collection
        </h1>
        {allLabelsRenderedQuery.isPending && (
          <div className="text-gray-500 dark:text-gray-400 my-4 flex flex-row gap-2 items-center">
            <Loader2Icon className="animate-spin" />
            Rendering labels...
          </div>
        )}
        {collection.items.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 my-4">
            No items in collection
          </div>
        )}
        <div className="my-4">
          <Button onClick={() => window.print()} disabled={!allLabelsRenderedQuery.isSuccess || allLabelsRenderedQuery.fetchStatus === 'fetching'}>
            Print <PrinterIcon className="size-4" />
          </Button>
        </div>
        <div className="overflow-x-auto">
        <div className="flex flex-row gap-4 mb-4">
          {pagesArr.map((page, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 border-2 border-black dark:border-white bg-white p-4 relative shrink-0"
              style={{
                width: paperSizes[settings.paperSize].width + "mm",
                height: paperSizes[settings.paperSize].height + "mm",
              }}
            >
              {[...page.items, ...page.paddingItems].map((item, index) => {
                const totalIndex = i * labelsPerPage + index;
                return <div
                  key={item?.spice.id ?? index}
                  className="rounded-full outline-2 outline-black text-black flex items-center justify-center"
                  style={{
                    width: settings.labelSize + "mm",
                    height: settings.labelSize + "mm",
                    position: "absolute",
                    ...calculateLabelPosition(index, settings),
                  }}
                >
                  {blobUrls[totalIndex] && item ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={blobUrls[totalIndex]!} alt={item.spice.id} className="size-full" />
                  ) : (
                    item ? (
                      <Loader2Icon className="animate-spin" />
                    ) : null
                  )}
                </div>
              })}
            </div>
          ))}
        </div>
        </div>
      </div>
      {typeof window !== "undefined" && blobUrls.length > 0 &&
        createPortal(
          <div className="hidden print:block">
            {pagesArr.map((page, i) => (
              <div
                key={i}
                className="relative break-after-page"
                style={{
                  width: paperSizes[settings.paperSize].width + "mm",
                  height: paperSizes[settings.paperSize].height + "mm",
                }}
              >
                <div className="absolute top-2 left-2 right-2 font-header print:font-black text-center">
                  Spices.app
                </div>
                {page.items.map((item, index) => {
                  const totalIndex = i * labelsPerPage + index;
                  return <div
                    key={item.spice.id}
                    className="rounded-full text-black flex items-center justify-center"
                    style={{
                      width: settings.labelSize + "mm",
                      height: settings.labelSize + "mm",
                      position: "absolute",
                      ...calculateLabelPosition(index, settings),
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blobUrls[totalIndex]!} alt={item.spice.id} className="size-full" />
                  </div>
                })}
              </div>
            ))}
          </div>,
          document.body
        )}
      <style>{`
        @page {
          size: ${paperSizes[settings.paperSize].width}mm ${paperSizes[settings.paperSize].height}mm;
          margin: 0;
          padding: 0;
          border: 0;
          box-sizing: border-box;
          font-family: sans-serif;
          font-size: 12px;
          color: black;
          background-color: white;
        }
      `}</style>
    </>
  );
}

function calculateLabelPosition(index: number, settings: PageLayoutSettings) {
  const row = Math.floor(index / settings.columns);
  const column = index % settings.columns;
  const pageSize = paperSizes[settings.paperSize];
  const totalLabelsSize = {
    width:
      settings.columns * settings.labelSize +
      (settings.columns - 1) * settings.spacing,
    height:
      settings.rows * settings.labelSize +
      (settings.rows - 1) * settings.spacing,
  };
  const topLeftOrigin = {
    x: (pageSize.width - totalLabelsSize.width) / 2,
    y: (pageSize.height - totalLabelsSize.height) / 2,
  };
  return {
    left:
      topLeftOrigin.x + column * (settings.labelSize + settings.spacing) + "mm",
    top: topLeftOrigin.y + row * (settings.labelSize + settings.spacing) + "mm",
  };
}

const paperSizes = {
  A4: {
    width: 210,
    height: 297,
  },
};
