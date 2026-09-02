import { useMutation } from "@tanstack/react-query";
import { Spice } from "./spices";
import { LabelStyle } from "@/components/label-settings-provider";
import { inlineFontsCssFile } from "./inlined-fonts-css-files-query";
import ReactDOM from "react-dom/client";
import { LabelRenderer } from "@/components/LabelRenderer";

export function useExportAndDownloadMutation({
  spice,
  fontUrls,
}: {
  spice: Spice;
  fontUrls: string[];
}) {
  const exportMutation = useMutation({
    mutationKey: ["export", spice.id],
    onError: (error) => {
      console.error(error);
    },
    mutationFn: async ({
      scale,
      style,
    }: {
      scale: number;
      style: LabelStyle;
    }) => {
      const blob = await exportLabel(spice, scale, style, fontUrls);
      downloadBlob(blob, `${spice.id}.png`);
      return blob;
    },
  });
  return exportMutation;
}

export async function exportLabel(
  spice: Spice,
  scale: number,
  style: LabelStyle,
  fontUrls: string[],
  signal?: AbortSignal
): Promise<Blob> {
  const container = document.createElement("div");
  const placer = document.createElement("div");
  placer.style.position = "absolute";
  placer.style.bottom = "16px";
  placer.style.right = "16px";
  placer.style.transform = "scale(0.1)";
  placer.style.transformOrigin = "bottom right";


  placer.appendChild(container);
  document.body.appendChild(placer); // needs to be in body, otherwise styles are not applied

  const containerRoot = ReactDOM.createRoot(container);
  containerRoot.render(
    <LabelRenderer
      spice={spice}
      style={style}
      noBrowserDetection
      hideSkeleton
    />
  );
  await new Promise((resolve) => setTimeout(resolve, 200));
  for (const child of Array.from(container.childNodes)) {
    if (child instanceof HTMLElement || child instanceof SVGElement) {
      await inlineElement(child);
    }
  }
  let inlinedFontsCss = "";
  for (const fontUrl of fontUrls) {
    inlinedFontsCss += await inlineFontsCssFile(fontUrl);
  }
  const labelRendererInlined = new XMLSerializer().serializeToString(container);
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

  // const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  // window.location.href = dataUrl;
  // debugger;
  // const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  // downloadBlob(svgBlob, `${spice.id}.svg`);

  // console.log(svgBlob);

  containerRoot.unmount();
  container.remove();

  signal?.throwIfAborted();

  const canvas = document.createElement("canvas");
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
  return await new Promise<Blob>((resolve) => {
    img.addEventListener("load", () => {
      // ctx.drawImage(img, 0, 0, 600, 600, 0, 0, 600 * SCALE, 600 * SCALE);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Failed to create blob");
        }
        resolve(blob);
        // downloadBlob(blob, `${spice.id}.png`);
      });
    });
    img.addEventListener("error", (e) => {
      console.error(e);
    });
    img.src =
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      canvas.remove();
    });
  });
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
