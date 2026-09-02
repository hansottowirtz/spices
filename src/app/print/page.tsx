"use client";

import { collectionState } from "@/components/collection-provider";
import { proxy, useSnapshot } from "valtio";
import { Fragment, useContext, useEffect, useState } from "react";
import { getSpiceStyle } from "@/lib/use-spice-style-proxy";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PrinterIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { skipToken, useQuery } from "@tanstack/react-query";
import { exportLabel } from "@/lib/use-export-mutation";
import { labelStyleState } from "@/components/label-settings-provider";
import { GlobalFontsContext } from "@/components/global-fonts-provider";
import { experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { LabeledSlider } from "@/components/label-style-configurator";

const paperSizes = {
  A4: {
    width: 210,
    height: 297,
  },
  A5: {
    width: 148,
    height: 210,
  },
  '10x15': {
    width: 100,
    height: 150,
  },
  '100mmx148mm': {
    width: 100,
    height: 148,
  },
};

const presets: { name: string; settings: PageLayoutSettings }[] = [
  {
    name: "OnlineLabels EU30095WJ",
    settings: {
      columns: 4,
      rows: 5,
      spacing: 5,
      paperSize: "A4",
      labelSize: 45,
      dpi: 1440,
      bleed: 1.5,
    },
  }
]

type PageLayoutSettings = {
  columns: number;
  rows: number;
  spacing: number;
  paperSize: keyof typeof paperSizes;
  labelSize: number;
  dpi: number;
  bleed: number;
};

const pageLayoutSettings = proxy<PageLayoutSettings>({
  columns: 4,
  rows: 5,
  spacing: 5,
  paperSize: "A4",
  /** Actual label size in mm, without bleed */
  labelSize: 45,
  dpi: 1440,
  /** Bleed in mm */
  bleed: 1.5,
});

type Page = {
  items: SpiceWithoutQuantity[];
  paddingItems: null[];
};

type SpiceWithoutQuantity = Omit<
  (typeof collectionState.items)[number],
  "quantity"
>;

function expandItems(
  items: typeof collectionState.items
): SpiceWithoutQuantity[] {
  return items.flatMap((item) =>
    Array.from({ length: item.quantity }, () => ({
      spice: item.spice,
      style: item.style,
    }))
  );
}

export default function CollectionPage() {
  const collection = useSnapshot(collectionState) as typeof collectionState;
  const settingsSnap = useSnapshot(pageLayoutSettings);
  const fontUrls = useContext(GlobalFontsContext).fontUrls;

  const labelsPerPage = settingsSnap.columns * settingsSnap.rows;

  const expandedItems = expandItems(collection.items);

  const pages = Math.ceil(expandedItems.length / labelsPerPage);

  const pagesArr = Array.from({ length: pages }, (_, i) => {
    const start = i * labelsPerPage;
    const end = start + labelsPerPage;
    const items = expandedItems.slice(start, end);
    const paddingItems = Array.from(
      { length: labelsPerPage - items.length },
      () => null
    );
    const page: Page = {
      items,
      paddingItems,
    };
    return page;
  });

  useEffect(() => {
    document.body.classList.add("printable-page");
    return () => {
      document.body.classList.remove("printable-page");
    };
  }, []);

  const labelStyle = useSnapshot(labelStyleState);

  const labelWidthInches = settingsSnap.labelSize / 25.4;
  const totalDots = labelWidthInches * settingsSnap.dpi;
  const scale = totalDots / 600;

  const allLabelsRenderedQuery = useQuery({
    queryKey: ["allLabelsRendered", 2, collection, labelStyle, fontUrls, scale],
    queryFn:
      collection.items.length === 0
        ? skipToken
        : streamedQuery({
            streamFn: async function* generate({ signal }) {
              for (const item of collection.items) {
                signal.throwIfAborted();
                const style = getSpiceStyle(
                  item.spice,
                  collection,
                  labelStyle
                );
                yield [item, await exportLabel(item.spice, scale, style, fontUrls, signal)] as const;
              }
            },
          }),
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [collectionBlobUrls, setCollectionBlobUrls] = useState<[SpiceWithoutQuantity, string][]>([]);
  useEffect(() => {
    if (!allLabelsRenderedQuery.data) return;
    const blobUrls =
      allLabelsRenderedQuery.data.map(([item, blob]) => [item, URL.createObjectURL(blob)] as [SpiceWithoutQuantity, string]) ??
      [];
    setCollectionBlobUrls(blobUrls);
    return () => {
      blobUrls.forEach(([, url]) => URL.revokeObjectURL(url));
    };
  }, [allLabelsRenderedQuery.data]);

  return (
    <>
      <div className="max-w-[1500px] mx-auto px-2">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 my-4">
          Print
        </h1>
        {allLabelsRenderedQuery.isPending &&
          allLabelsRenderedQuery.isEnabled && (
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
        {/* eslint-disable-next-line valtio/state-snapshot-rule */}
        <SettingsEditor settingsProxy={pageLayoutSettings} />
        <div className="my-4">
          <Button
            onClick={() => window.print()}
            disabled={
              !allLabelsRenderedQuery.isSuccess ||
              allLabelsRenderedQuery.fetchStatus === "fetching"
            }
          >
            Print <PrinterIcon className="size-4" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-row gap-4 mb-4">
            {pagesArr.map((page, i) => (
              <Page
                key={i}
                page={page}
                settings={settingsSnap}
                pageIndex={i}
                labelsPerPage={labelsPerPage}
                collectionBlobUrls={collectionBlobUrls}
                isPreview
                showOutlines
              />
            ))}
          </div>
        </div>
      </div>
      {typeof window !== "undefined" &&
        collectionBlobUrls.length > 0 &&
        createPortal(
          <div className="hidden print:block">
            {allLabelsRenderedQuery.isPending &&
            allLabelsRenderedQuery.isEnabled ? (
              <div
                className="text-black flex items-center justify-center"
                style={{
                  width: paperSizes[settingsSnap.paperSize].width + "mm",
                  height: paperSizes[settingsSnap.paperSize].height + "mm",
                }}
              >
                Rendering labels...
              </div>
            ) : (
              pagesArr.map((page, i) => (
                <Page
                  key={i}
                  page={page}
                  settings={settingsSnap}
                  pageIndex={i}
                  labelsPerPage={labelsPerPage}
                  collectionBlobUrls={collectionBlobUrls}
                  showOutlines={false}
                />
              ))
            )}
          </div>,
          document.body
        )}
      <style>{`
        @page {
          size: ${paperSizes[settingsSnap.paperSize].width}mm ${
        paperSizes[settingsSnap.paperSize].height
      }mm;
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

function calculateLabelPosition(
  index: number,
  settings: PageLayoutSettings,
  ignoreBleed: boolean = false
) {
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
      topLeftOrigin.x +
      column * (settings.labelSize + settings.spacing) -
      (ignoreBleed ? 0 : settings.bleed) +
      "mm",
    top:
      topLeftOrigin.y +
      row * (settings.labelSize + settings.spacing) -
      (ignoreBleed ? 0 : settings.bleed) +
      "mm",
  };
}

function Page({
  page,
  settings,
  pageIndex,
  labelsPerPage,
  collectionBlobUrls,
  showOutlines = false,
  isPreview = false,
}: {
  page: Page;
  settings: PageLayoutSettings;
  pageIndex: number;
  labelsPerPage: number;
  collectionBlobUrls: [SpiceWithoutQuantity, string][];
  showOutlines?: boolean;
  isPreview?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 relative shrink-0",
        !isPreview && "break-after-page",
        isPreview && "border-2 border-black dark:border-white bg-white"
      )}
      style={{
        width: paperSizes[settings.paperSize].width + "mm",
        height: paperSizes[settings.paperSize].height + "mm",
      }}
    >
      <div className="absolute top-2 left-2 right-2 font-header text-center font-bold text-black">
        <div className="font-bold text-black font-header">
          <span>Spices</span>
          <span className="text-[0.6em] text-gray-500 font-light">
            .
          </span>
          <span className="text-[0.6em] text-gray-500 font-mono font-light">
            app
          </span>
        </div>
      </div>
      {[...page.items, ...page.paddingItems].map((item, index) => {
        // const totalIndex = pageIndex * labelsPerPage + index;
        const blobUrl = item ? collectionBlobUrls.find(([spice]) => spice.spice.id === item.spice.id)?.[1] : undefined;
        return (
          <Fragment key={index}>
            {item && (
              <div
                key={index}
                className="rounded-full text-black flex items-center justify-center"
                style={{
                  width: settings.labelSize + settings.bleed * 2 + "mm",
                  height: settings.labelSize + settings.bleed * 2 + "mm",
                  position: "absolute",
                  ...calculateLabelPosition(index, settings),
                }}
              >
                {blobUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blobUrl}
                    alt={item.spice.id}
                    className="size-full"
                  />
                ) : (
                  <Loader2Icon className="animate-spin" />
                )}
              </div>
            )}
            {showOutlines && (
              <div
                className="rounded-full outline-2 outline-red-500 outline-dotted text-black flex items-center justify-center"
                style={{
                  width: settings.labelSize + "mm",
                  height: settings.labelSize + "mm",
                  position: "absolute",
                  ...calculateLabelPosition(index, settings, true),
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function SettingsEditor({
  settingsProxy,
}: {
  settingsProxy: PageLayoutSettings;
}) {
  const snapshot = useSnapshot(settingsProxy, { sync: true });

  return (
    <div className="flex flex-col gap-2 max-w-[400px]">
      <div>
        <div className="my-1 flex flex-row space-x-4">
          <div className="min-w-16">Preset</div>
          <Select
            value=""
            onValueChange={(v) => {
              const preset = presets[Number(v)];
              if (!preset) return;
              Object.assign(settingsProxy, preset.settings);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Load a preset..." />
            </SelectTrigger>
            <SelectContent>
              {presets.map((preset, i) => (
                <SelectItem key={i} value={String(i)}>
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <div className="my-1 flex flex-row space-x-4">
          <div className="min-w-16">Paper size</div>
          <Select
            value={snapshot.paperSize}
            onValueChange={(v) =>
              (settingsProxy.paperSize = v as keyof typeof paperSizes)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select paper size" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(paperSizes).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {key} ({value.width}mm x {value.height}mm)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <LabeledSlider
          label="Label size"
          value={snapshot.labelSize}
          onValueChange={(v) => (settingsProxy.labelSize = v)}
          unit="mm"
          min={10}
          max={100}
          step={0.1}
        />
      </div>
      <div>
        <LabeledSlider
          label="Columns"
          value={snapshot.columns}
          onValueChange={(v) => (settingsProxy.columns = v)}
          min={1}
          max={100}
          step={1}
          // unit="x"
          decimalPlaces={0}
        />
      </div>
      <div>
        <LabeledSlider
          label="Rows"
          value={snapshot.rows}
          onValueChange={(v) => (settingsProxy.rows = v)}
          min={1}
          max={100}
          step={1}
          // unit="x"
          decimalPlaces={0}
        />
      </div>
      <div>
        <LabeledSlider
          label="Spacing"
          value={snapshot.spacing}
          onValueChange={(v) => (settingsProxy.spacing = v)}
          unit="mm"
          min={0}
          max={10}
          step={0.1}
        />
      </div>
      <div>
        <LabeledSlider
          label="Bleed"
          value={snapshot.bleed}
          onValueChange={(v) => (settingsProxy.bleed = v)}
          unit="mm"
          min={0}
          max={10}
          step={0.1}
        />
      </div>
      <div>
        <LabeledSlider
          label="DPI"
          value={snapshot.dpi}
          onValueChange={(v) => (settingsProxy.dpi = v)}
          min={100}
          max={3000}
          step={100}
          decimalPlaces={0}
        />
      </div>
    </div>
  );
}
