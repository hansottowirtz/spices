"use client";

import { useContext, useState } from "react";
import { Button } from "./ui/button";
// import { LabelRenderer } from "@/components/LabelRenderer";
import { Spice } from "@/lib/spices";
import { useSnapshot } from "valtio";
import { labelStyleState } from "./label-settings-provider";
// import { inlineFontsCssFile } from "@/lib/inlined-fonts-css-files-query";
import { GlobalFontsContext } from "./global-fonts-provider";
// import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, Loader2Icon } from "lucide-react";
import { Slider } from "./ui/slider";
import { useExportAndDownloadMutation } from "@/lib/use-export-mutation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function ExportLabelButton({ spice }: { spice: Spice }) {
  const style = useSnapshot(labelStyleState);

  const fontUrls = useContext(GlobalFontsContext).fontUrls;

  const [scale, setScale] = useState(4);

  const exportMutation = useExportAndDownloadMutation({ spice, fontUrls });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Download label
          <DownloadIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle> 
        </DialogHeader>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            exportMutation.mutate({ scale, style });
          }}
        >
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
          {exportMutation.isError && (
            <div className="text-red-600">
              Export error: {exportMutation.error.message}
            </div>
          )}
          <Button disabled={exportMutation.isPending} type="submit">
            Download as PNG
            <DownloadIcon className="size-4" />
            {exportMutation.isPending && (
              <Loader2Icon className="animate-spin" />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
