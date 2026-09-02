"use client";

import { useState, useMemo } from "react";
import { spices, Spice, languages } from "@/lib/spices";
import { collectionState } from "@/components/collection-provider";
import { useSnapshot } from "valtio";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaletteIcon,
  PrinterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LanguagesSections,
  ElementsSections,
  FontsSections,
} from "@/components/label-style-configurator";
import { LabelRenderer } from "@/components/LabelRenderer";
import Image from "next/image";
import {
  labelStyleState,
  Language,
} from "@/components/label-settings-provider";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Step = {
  id: string;
  label: string;
  parentLabel?: string;
  icon: typeof SparklesIcon;
  pickPreferredSpices?: (spices: Spice[]) => Spice[];
};

function pickOneOfEach(
  spices: Spice[],
  criteria: ((s: Spice) => boolean)[],
): Spice[] {
  const picked = new Set<string>();
  for (const criterion of criteria) {
    const match = spices.find((s) => criterion(s) && !picked.has(s.id));
    if (match) picked.add(match.id);
  }
  return spices.filter((s) => picked.has(s.id));
}

const steps: Step[] = [
  { id: "select", label: "Select spices", icon: SparklesIcon },
  {
    id: "languages",
    label: "Languages",
    parentLabel: "General styling",
    icon: PaletteIcon,
    pickPreferredSpices: (spices) =>
      pickOneOfEach(spices, [
        (s) => s.names.length > 3,
        (s) => s.names.some((n) => n.romanized !== undefined),
        (s) => !!s.etymologicalOrigin,
        (s) => s.names.length > 2,
      ]),
  },
  {
    id: "elements",
    label: "Elements",
    parentLabel: "General styling",
    icon: PaletteIcon,
    pickPreferredSpices: (spices) =>
      pickOneOfEach(spices, [
        (s) => !!s.binomialName,
        (s) => !!s.cuisines?.length,
        (s) => !!s.eCode,
        (s) => !!s.chemicalFormula,
      ]),
  },
  {
    id: "fonts",
    label: "Fonts",
    parentLabel: "General styling",
    icon: PaletteIcon,
    pickPreferredSpices: (spices) =>
      pickOneOfEach(spices, [
        (s) => s.names.length > 3,
        (s) => s.names.some((n) => n.romanized !== undefined),
        (s) =>
          s.names.some((n) =>
            ["ar", "fa", "hi", "ja", "ko", "zh-CN", "zh-TW"].includes(n.lang),
          ),
        (s) => s.names.length > 2,
      ]),
  },
  {
    id: "offsets",
    label: "Offsets",
    parentLabel: "General styling",
    icon: SlidersHorizontalIcon,
    pickPreferredSpices: (spices) =>
      pickOneOfEach(spices, [
        (s) => !!s.binomialName && !!s.cuisines?.length,
        (s) => !!s.binomialName,
        (s) => !!s.cuisines?.length,
        (s) => s.names.length > 2,
      ]),
  },
  { id: "order", label: "Order or print", icon: PrinterIcon },
];

type ProgressGroup = {
  label: string;
  icon: typeof SparklesIcon;
  startIndex: number;
  endIndex: number;
};

function getProgressGroups(): ProgressGroup[] {
  const groups: ProgressGroup[] = [];
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const label = step.parentLabel ?? step.label;
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.endIndex = i;
    } else {
      groups.push({ label, icon: step.icon, startIndex: i, endIndex: i });
    }
  }
  return groups;
}

const progressGroups = getProgressGroups();

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const collection = useSnapshot(collectionState);
  const canGoNext = currentStep === 0 ? collection.items.length > 0 : true;

  const currentStepDef = steps[currentStep];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="sticky top-0 z-20 bg-background pt-6 pb-4 border-b border-border">
        <ProgressBar currentStep={currentStep} />
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 0}
            className={cn(currentStep === 0 && "invisible")}
          >
            <ChevronLeftIcon className="size-4" />
            Back
          </Button>
          <span className="text-sm font-medium">{currentStepDef.label}</span>
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canGoNext}
            >
              Next
              <ChevronRightIcon className="size-4" />
            </Button>
          ) : (
            <div className="invisible">
              <Button>Next</Button>
            </div>
          )}
        </div>
      </div>
      <div className="py-6">
        {currentStepDef.id === "select" && <SelectSpicesStep />}
        {currentStepDef.id === "languages" && (
          <StylingSubstep
            section="languages"
            pickPreferredSpices={currentStepDef.pickPreferredSpices}
          />
        )}
        {currentStepDef.id === "elements" && (
          <StylingSubstep
            section="elements"
            pickPreferredSpices={currentStepDef.pickPreferredSpices}
          />
        )}
        {currentStepDef.id === "fonts" && (
          <StylingSubstep
            section="fonts"
            pickPreferredSpices={currentStepDef.pickPreferredSpices}
          />
        )}
        {currentStepDef.id === "offsets" && (
          <StylingSubstep
            section="offsets"
            pickPreferredSpices={currentStepDef.pickPreferredSpices}
          />
        )}
        {currentStepDef.id === "order" && <OrderStep />}
      </div>
    </div>
  );
}

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between">
      {progressGroups.map((group, i) => {
        const completed = currentStep > group.endIndex;
        const active =
          currentStep >= group.startIndex && currentStep <= group.endIndex;
        const Icon = group.icon;

        const substepCount = group.endIndex - group.startIndex + 1;
        const substepProgress = active ? currentStep - group.startIndex : 0;

        return (
          <div
            key={group.label}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center justify-center size-10 rounded-full border-2 transition-colors",
                  completed &&
                    "bg-primary border-primary text-primary-foreground",
                  active && "border-primary text-primary",
                  !completed &&
                    !active &&
                    "border-muted-foreground/40 text-muted-foreground/40",
                )}
              >
                {completed ? (
                  <CheckIcon className="size-5" />
                ) : (
                  <Icon className="size-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium text-center whitespace-nowrap",
                  active && "text-foreground",
                  completed && "text-foreground",
                  !active && !completed && "text-muted-foreground/60",
                )}
              >
                {group.label}
              </span>
              {active && substepCount > 1 && (
                <div className="flex gap-1">
                  {Array.from({ length: substepCount }, (_, j) => (
                    <div
                      key={j}
                      className={cn(
                        "size-1.5 rounded-full transition-colors",
                        j <= substepProgress
                          ? "bg-primary"
                          : "bg-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
            {i < progressGroups.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3 -mt-5",
                  completed ? "bg-primary" : "bg-muted-foreground/20",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SelectSpicesStep() {
  const collection = useSnapshot(collectionState);
  const [search, setSearch] = useState("");

  const selectedMap = useMemo(
    () =>
      new Map(collection.items.map((item) => [item.spice.id, item.quantity])),
    [collection.items],
  );

  const filteredSpices = useMemo(() => {
    if (!search.trim()) return spices;
    const q = search.toLowerCase();
    return spices.filter(
      (s) =>
        s.names.some((n) => n.value.toLowerCase().includes(q)) ||
        s.id.toLowerCase().includes(q),
    );
  }, [search]);

  function toggleSpice(spice: Spice) {
    if (selectedMap.has(spice.id)) {
      collectionState.items = collectionState.items.filter(
        (item) => item.spice.id !== spice.id,
      );
    } else {
      collectionState.items.push({
        spice,
        style: "global",
        quantity: 1,
      });
    }
  }

  function setQuantity(spiceId: string, quantity: number) {
    collectionState.items = collectionState.items.map((item) => {
      if (item.spice.id === spiceId) {
        return { ...item, quantity };
      }
      return item;
    });
  }

  function selectAll() {
    const unselected = filteredSpices.filter((s) => !selectedMap.has(s.id));
    for (const spice of unselected) {
      collectionState.items.push({ spice, style: "global", quantity: 1 });
    }
  }

  function deselectAll() {
    const filteredIds = new Set(filteredSpices.map((s) => s.id));
    collectionState.items = collectionState.items.filter(
      (item) => !filteredIds.has(item.spice.id),
    );
  }

  const allFilteredSelected =
    filteredSpices.length > 0 &&
    filteredSpices.every((s) => selectedMap.has(s.id));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Which spices do you have?</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select the spices you want to create labels for.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search spices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={allFilteredSelected ? deselectAll : selectAll}
        >
          {allFilteredSelected ? "Deselect all" : "Select all"}
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {filteredSpices.map((spice) => {
          const checked = selectedMap.has(spice.id);
          const quantity = selectedMap.get(spice.id) ?? 1;
          const primaryName =
            spice.names.find((n) => n.lang === "en")?.value ??
            spice.names[0]?.value ??
            spice.id;
          const imageId = spice.imageId ?? spice.id;

          return (
            <div
              key={spice.id}
              className={cn(
                "relative rounded-lg border overflow-hidden cursor-pointer transition-all",
                checked
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-muted-foreground/50",
              )}
              onClick={() => toggleSpice(spice)}
            >
              <div className="aspect-square bg-muted/30 flex items-center justify-center p-2">
                <Image
                  src={`/spices/${imageId}.png`}
                  alt={primaryName}
                  width={100}
                  height={100}
                  className="object-contain size-full"
                />
              </div>
              <div className="px-2 pt-1 pb-2">
                <div className="text-xs font-medium leading-tight truncate">
                  {primaryName}
                </div>
                {spice.binomialName && (
                  <div className="text-[10px] text-muted-foreground italic leading-tight truncate">
                    {spice.binomialName}
                  </div>
                )}
              </div>
              <div className="absolute top-1.5 left-1.5">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleSpice(spice)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background/80"
                />
              </div>
              {checked && (
                <div
                  className="absolute top-1 right-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Select
                    value={String(quantity)}
                    onValueChange={(v) => setQuantity(spice.id, Number(v))}
                  >
                    <SelectTrigger className="h-6 w-12 text-[10px] bg-background/80 border-0 shadow-sm px-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {filteredSpices.length === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No spices found matching &ldquo;{search}&rdquo;
        </div>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        {selectedMap.size} {selectedMap.size === 1 ? "spice" : "spices"}{" "}
        selected
      </div>
    </div>
  );
}

const PREVIEW_PAGE_SIZE = 4;

const sectionDescriptions: Record<string, string> = {
  languages: "Choose the primary and secondary languages for your labels.",
  elements: "Choose which text elements to show on your labels.",
  fonts: "Customize fonts for each language and text element.",
  offsets: "Fine-tune text positioning on your labels.",
};

function StylingSubstep({
  section,
  pickPreferredSpices,
}: {
  section: "languages" | "elements" | "fonts" | "offsets";
  pickPreferredSpices?: (spices: Spice[]) => Spice[];
}) {
  const collection = useSnapshot(collectionState) as typeof collectionState;
  const [page, setPage] = useState(0);

  const selectedSpices = useMemo(() => {
    const all = collection.items.map((item) => item.spice);
    if (!pickPreferredSpices) return all;
    const preferred = pickPreferredSpices(all);
    const preferredIds = new Set(preferred.map((s) => s.id));
    const rest = all.filter((s) => !preferredIds.has(s.id));
    return [...preferred, ...rest];
  }, [collection.items, pickPreferredSpices]);
  const totalPages = Math.max(
    1,
    Math.ceil(selectedSpices.length / PREVIEW_PAGE_SIZE),
  );
  const clampedPage = Math.min(page, totalPages - 1);
  const pageSpices = selectedSpices.slice(
    clampedPage * PREVIEW_PAGE_SIZE,
    clampedPage * PREVIEW_PAGE_SIZE + PREVIEW_PAGE_SIZE,
  );

  const labelStyleSnapshot = useSnapshot(labelStyleState);
  const allLanguagesSet = useMemo(
    () => new Set<Language>(languages as Language[]),
    [],
  );

  if (selectedSpices.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-muted-foreground">
          No spices selected. Go back and select some spices first.
        </p>
      </div>
    );
  }

  const sectionContent = (() => {
    switch (section) {
      case "languages":
        return (
          <LanguagesSections
            styleProxy={labelStyleState}
            languages={languages}
          />
        );
      case "elements":
        return <ElementsSections styleProxy={labelStyleState} />;
      case "fonts":
        return selectedSpices.length > 0 ? (
          <FontsSections
            spice={selectedSpices[0]}
            labelStyleSnapshot={labelStyleSnapshot as typeof labelStyleState}
            styleProxy={labelStyleState}
            hideUnusedStyles={false}
            usedLanguages={allLanguagesSet}
          />
        ) : null;
      default:
        return (
          <div className="p-4 text-sm text-muted-foreground">
            {sectionDescriptions[section]} (Coming soon)
          </div>
        );
    }
  })();

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 gap-2">
            {pageSpices.map((spice) => (
              <PreviewLabel
                key={spice.id}
                spice={spice}
                forceWireframe={section === "offsets"}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(0, clampedPage - 1))}
                disabled={clampedPage === 0}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground tabular-nums">
                {clampedPage + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage(Math.min(totalPages - 1, clampedPage + 1))
                }
                disabled={clampedPage >= totalPages - 1}
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="lg:w-100 border rounded-lg overflow-y-auto max-h-[70vh]">
          <p className="text-sm text-muted-foreground px-4 py-3">
            {sectionDescriptions[section]}
          </p>
          <Separator />
          {sectionContent}
        </div>
      </div>
    </div>
  );
}

function PreviewLabel({
  spice,
  forceWireframe,
}: {
  spice: Spice;
  forceWireframe?: boolean;
}) {
  const style = useSnapshot(labelStyleState) as typeof labelStyleState;
  const styleWithOverrides = useMemo(() => {
    return {
      ...style,
      wireframe: forceWireframe ?? style.wireframe,
    };
  }, [style, forceWireframe]);

  return (
    <div className="aspect-square">
      <LabelRenderer
        spice={spice}
        style={styleWithOverrides}
        scaleToFit
        outline
        qualitySettings={{ strokes: 1 }}
        expectedImageSize={250}
      />
    </div>
  );
}

function OrderStep() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Order or print</h2>
      <p className="text-sm text-muted-foreground mb-2">Order not available yet.</p>
      <p className="text-sm text-muted-foreground mb-2">
        You can still print your labels at home using a regular printer.
      </p>
      <Button asChild>
        <Link href="/print">
          Print
          <PrinterIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
