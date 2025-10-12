"use client";

import { useContext, useRef, useState } from "react";
import { Button } from "./ui/button";
import { LabelRenderer } from "@/components/LabelRenderer";
import { Spice } from "@/lib/spices";
import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
import { inlineFontsCssFile } from "@/lib/inlined-fonts-css-files-query";
import { GlobalFontsContext } from "./global-fonts-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Slider } from "./ui/slider";

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function ExportLabelButton({ spice }: { spice: Spice }) {
  const [loaded, setLoaded] = useState(false);
  const labelRendererRef = useRef<HTMLDivElement>(null);
  const stuffRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const style = useSnapshot(labelStyleState);

  const fontUrls = useContext(GlobalFontsContext).fontUrls;

  const [scale, setScale] = useState(4);

  const exportMutation = useMutation({
    mutationKey: ["export", spice.id, style, scale],
    mutationFn: async () => {
      setLoaded(true);
      await delay(1000);
      const labelRendererDiv = labelRendererRef.current;
      if (!labelRendererDiv) {
        throw new Error("labelRendererRef.current is null");
      }
      stuffRef.current!.innerHTML = labelRendererDiv.innerHTML;
      for (const child of Array.from(stuffRef.current!.childNodes)) {
        if (child instanceof HTMLElement || child instanceof SVGElement) {
          await inlineElement(child);
        }
      }
      let inlinedFontsCss = "";
      for (const fontUrl of fontUrls) {
        inlinedFontsCss += await inlineFontsCssFile(fontUrl);
      }
      const labelRendererInlined = new XMLSerializer().serializeToString(
        stuffRef.current!
      );
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <defs>
            <style>
              ${inlinedFontsCss}
            </style>
          </defs>
          <foreignObject width="100%" height="100%">
            ${labelRendererInlined}
          </foreignObject>
        </svg>`;
      // const blob = new Blob([svg], { type: "image/svg+xml" });
      // downloadBlob(blob, `${spice.id}.svg`);

      // setSvg(svg);
      const canvas = canvasRef.current!;
      canvas.width = 600 * scale;
      canvas.height = 600 * scale;
      canvas.style.width = "200px";
      canvas.style.height = "200px";
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get 2d context");
      }
      ctx.scale(scale, scale);
      const img = new Image();
      img.addEventListener("load", () => {
        // ctx.drawImage(img, 0, 0, 600, 600, 0, 0, 600 * SCALE, 600 * SCALE);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) {
            throw new Error("Failed to create blob");
          }
          downloadBlob(blob, `${spice.id}.png`);
        });
      });
      img.addEventListener("error", (e) => {
        console.error(e);
      });
      img.src =
        "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      setLoaded(false);
    },
  });

  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <Button
          onClick={() => exportMutation.mutate()}
          disabled={exportMutation.isPending}
        >
          Export
          {exportMutation.isPending && <Loader2Icon className="animate-spin" />}
        </Button>
        <div className="flex flex-row gap-2 items-center">
          <div>Scale</div>
          <Slider
            className="w-32"
            min={1}
            max={12}
            value={[scale]}
            onValueChange={(e) => setScale(e[0])}
          />
          <div>{scale}</div>
          <div>{`(${600 * scale}px x ${600 * scale}px)`}</div>
        </div>
      </div>
      {exportMutation.isError && (
        <div className="text-red-600">
          Export error: {exportMutation.error.message}
        </div>
      )}
      <div className="hidden">
        {loaded && (
          <LabelRenderer
            spice={spice}
            style={style}
            noBrowserDetection
            hideSkeleton
            ref={labelRendererRef}
          />
        )}
      </div>
      <div className="hidden" ref={stuffRef} />
      <canvas className="hidden" ref={canvasRef} />
    </div>
  );
}

async function inlineElement(node: HTMLElement | SVGElement) {
  const style = window.getComputedStyle(node);
  const cssText = Array.from(style)
    .map((key) => `${key}: ${style.getPropertyValue(key)};`)
    .join(" ");
  node.setAttribute("style", cssText);
  node.setAttribute("class", "");
  if (node instanceof HTMLImageElement) {
    // download image and set as data url
    const url = node.src;
    const response = await fetch(url);
    const blob = await response.blob();
    await new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        node.src = reader.result as string;
        resolve();
      };
      reader.readAsDataURL(blob);
    });
  }
  for (const child of Array.from(node.childNodes)) {
    if (child instanceof HTMLElement || child instanceof SVGElement) {
      await inlineElement(child);
    }
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
