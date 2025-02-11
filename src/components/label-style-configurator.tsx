"use client";

import { Spice } from "@/lib/spices";
import { Slider } from "./ui/slider";
import {
  FontSettings,
  LabelStyle,
  labelStyleState,
  Language,
} from "./label-settings-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSnapshot } from "valtio";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCallback, useEffect, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useLocalFontsQuery } from "@/hooks/use-local-fonts-query";

export function LabelStyleConfigurator({}: { spice: Spice }) {
  const labelStyleSnapshot = useSnapshot(labelStyleState);

  const settingsArr = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "binomial",
      label: "Binomial",
    },
    {
      key: "bottom",
      label: "Bottom",
    },
  ] as const;

  return (
    <div>
      <div className="my-2">
        {/* <div className="font-bold mb-2">Wireframe</div> */}
        <label className="font-bold mb-2 flex flex-row items-center space-x-2">
          <span>Wireframe</span>
          <Checkbox
            checked={labelStyleSnapshot.wireframe}
            onCheckedChange={(v) => (labelStyleState.wireframe = !!v)}
          />
        </label>
      </div>
      <div className="my-2">
        <div className="font-bold mb-2">Bleed</div>
        <LabeledSliderManaged
          label="Bleed"
          min={0}
          max={0.5}
          object={labelStyleState}
          objectKey="bleed"
          step={0.001}
          isPercentage
          unit="%"
        />
      </div>
      <div className="my-2">
        <div className="font-bold mb-2">Offsets</div>
        {settingsArr.map(({ key, label }) => {
          const setting = labelStyleState.textOffsets[key];
          return (
            <div className="my-1" key={key}>
              <LabeledSliderManaged
                label={label}
                min={0}
                max={1}
                object={setting}
                objectKey="margin"
                step={0.005}
                isPercentage
                unit="%"
              />
            </div>
          );
        })}
      </div>
      <div className="my-2">
        <div className="font-bold mb-2">Primary Language</div>
        <LanguageSelect
          value={labelStyleSnapshot.primaryLanguage}
          onValueChange={(v: Language) => (labelStyleState.primaryLanguage = v)}
        />
      </div>
      <div className="my-2">
        <div className="font-bold mb-2">Secondary Language</div>
        <LanguageSelect
          value={labelStyleSnapshot.secondaryLanguage}
          onValueChange={(v: Language) =>
            (labelStyleState.secondaryLanguage = v)
          }
        />
      </div>
      <div className="my-2">
        <div className="font-bold mb-2">Language fonts</div>
        {Object.entries(labelStyleSnapshot.languageFonts).map(([lang]) => {
          const font = labelStyleState.languageFonts[lang as Language]!;
          return (
            <LanguageFontsEditor
              key={lang}
              language={lang as Language}
              languageFontSettings={font}
            />
          );
        })}
      </div>
    </div>
  );
}

const languages: Language[] = [
  "English",
  "Arabic",
  "Binomial",
  "Chinese Simplified",
  "Chinese Traditional",
  "Dutch",
  "Hindi",
  "Japanese",
  "Korean",
  "Persian",
  "Spanish",
  "Thai",
];

function LanguageFontsEditor({
  language: lang,
  languageFontSettings,
}: {
  language: Language;
  languageFontSettings: LabelStyle["languageFonts"][Language] & object;
}) {
  const snap = useSnapshot(languageFontSettings);
  return (
    <div className="border-b py-4 last-of-type:border-0">
      <div className="font-bold mb-2 underline">{lang}</div>
      <div className="font-bold mb-2">Default</div>
      <FontEditor fontSettings={languageFontSettings.default} />
      <div className="font-bold mb-2 flex flex-row items-center space-x-2">
        <div className="flex-1">Heading</div>
        {snap.heading && (
          <Button
            className="size-8"
            onClick={() => (languageFontSettings.heading = undefined)}
          >
            <X />
          </Button>
        )}
      </div>
      {snap.heading ? (
        <FontEditor fontSettings={languageFontSettings.heading!} />
      ) : (
        <Button
          onClick={() => (languageFontSettings.heading = { ...snap.default })}
        >
          Add Heading style
        </Button>
      )}
    </div>
  );
}

function FontEditor({ fontSettings }: { fontSettings: FontSettings }) {
  const fontSettingsSnapshot = useSnapshot(fontSettings, { sync: true });
  return (
    <div>
      <div className="my-2 flex flex-row space-x-2 items-center">
        <div className="min-w-16">Family</div>
        <FontFamilySelect
          value={fontSettingsSnapshot.family}
          onValueChange={(value) => (fontSettings.family = value)}
        />
      </div>
      <div className="my-2 flex flex-row space-x-2">
        <div className="min-w-16">Weight</div>
        <Select
          value={fontSettingsSnapshot.weight}
          onValueChange={(v) => (fontSettings.weight = v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Weight</SelectLabel>
              {["normal", "bold"].map((weight) => (
                <SelectItem key={weight} value={weight}>
                  {weight}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="my-2 flex flex-row space-x-2">
        <div className="min-w-16">Style</div>
        <Select
          value={fontSettingsSnapshot.style}
          onValueChange={(v) => (fontSettings.style = v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Style</SelectLabel>
              {["normal", "italic"].map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {fontSettingsSnapshot.size === undefined ? (
        <div className="my-2 flex flex-row space-x-2">
          <div className="min-w-16">Size</div>
          <Button onClick={() => (fontSettings.size = 1)}>Add Size</Button>
        </div>
      ) : (
        <LabeledSliderManaged
          label="Size"
          min={0}
          max={4}
          object={fontSettings as Record<"size", number>}
          objectKey="size"
          step={0.01}
          unit="em"
        />
      )}
      <div className="my-2 flex flex-row space-x-2">
        {fontSettings.spacing === undefined ? (
          <>
            <div className="min-w-16">Spacing</div>
            <Button onClick={() => (fontSettings.spacing = 0)}>
              Add Spacing
            </Button>
          </>
        ) : (
          <div className="flex-1">
            <LabeledSliderManaged
              label="Spacing"
              min={-0.2}
              max={0.2}
              object={fontSettings}
              objectKey="spacing"
              step={0.0001}
              unit="em"
              decimalPlaces={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function LanguageSelect({
  value,
  onValueChange,
}: {
  value: Language;
  onValueChange: (v: Language) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {languages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type NumberProperties<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
};

function LabeledSliderManaged<
  TObj extends object,
  TKey extends keyof NumberProperties<TObj>
>({
  label,
  object,
  objectKey,
  min,
  max,
  step,
  unit,
  isPercentage,
  decimalPlaces,
}: {
  label: string;
  object: TObj;
  objectKey: TKey;
  min: number;
  max: number;
  step: number;
  unit?: string;
  isPercentage?: boolean;
  decimalPlaces?: number;
}) {
  const snap = useSnapshot(object, { sync: true }) as Record<TKey, number>;

  return (
    <LabeledSlider
      label={label}
      value={snap[objectKey] as number}
      onValueChange={(v) => ((object as Record<TKey, number>)[objectKey] = v)}
      min={min}
      max={max}
      step={step}
      unit={unit}
      isPercentage={isPercentage}
      decimalPlaces={decimalPlaces}
    />
  );
}

function LabeledSlider({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  unit,
  isPercentage,
  decimalPlaces,
}: {
  label: string;
  value: number;
  onValueChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  isPercentage?: boolean;
  decimalPlaces?: number;
}) {
  const valueToInput = useCallback(
    (v: number) => {
      if (isPercentage) {
        return `${(v * 100).toFixed(decimalPlaces ?? 0)}`;
      }
      return `${v.toFixed(decimalPlaces ?? 2)}`;
    },
    [decimalPlaces, isPercentage]
  );
  const [inputState, setInputState] = useState(valueToInput(value));
  const [isFocused, setIsFocused] = useState(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputState(inputValue);
    const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(inputValue);
    if (!isValidNumber) return;
    const value = Number(inputValue) / 100;
    const clampedValue = Math.min(max, Math.max(min, value));
    onValueChange(clampedValue);
  };

  useEffect(() => {
    if (!isFocused) {
      setInputState(valueToInput(value));
    }
  }, [value, isFocused, valueToInput]);

  const totalNumbers = Math.max(`${max}`.length, `${min}`.length) + (decimalPlaces ?? 0);

  return (
    <div className="flex flex-row gap-4">
      <div className="min-w-16">{label}</div>
      <Slider
        min={min}
        max={max}
        value={[value]}
        onValueChange={([v]) => onValueChange(v)}
        step={step}
      />
      {/* {formatValue ? formatValue(value) : value} */}
      <div className="flex flex-row items-center relative h-8 font-mono">
        <Input
          type="text"
          value={inputState}
          onChange={handleInput}
          className="h-full"
          style={{ width: totalNumbers * 4 + (unit ? (unit.length * 8) + 70 : 0) }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {unit && (
          <span className="absolute right-[5px] border-l pl-2 pr-1 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function FontFamilySelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const [loadLocalFonts, setLoadLocalFonts] = useState(false);

  const localFonts = useLocalFontsQuery({ enabled: loadLocalFonts });

  const builtInFonts = [
    // "serif",
    // "sans-serif",
    // "monospace",
    // "Comic Sans MS",
    // "Courier New",
    // "Georgia",
    // "Lucida Console",
    // "Lucida Sans Unicode",
    // "Palatino Linotype",
    // "Tahoma",
    // "Times New Roman",
    // "Trebuchet MS",
    // "Verdana",
    "serif",
    "sans-serif",
    "monospace",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Glegoo",
    "Noto Sans Arabic",
    "Noto Sans Syriac",
    "Petit Formal Script",
    "Courier Prime",
  ];

  const uniqueLocalFontFamilies = unique(
    localFonts.query.data ?? [],
    (f) => f.family
  );

  const allFonts = [
    ...builtInFonts,
    ...(uniqueLocalFontFamilies.map((f) => f.family) ?? []),
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? allFonts.find((font) => value === font)
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search font..." />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup heading="Local fonts">
              {/* <CommandItem disabled>
                Local fonts access not allowed.
              </CommandItem> */}
              {!localFonts.browserSupport ? (
                <CommandItem disabled>
                  Local fonts access not available.
                </CommandItem>
              ) : localFonts.isPermissionRejected ? (
                <CommandItem disabled>Local fonts access rejected.</CommandItem>
              ) : !localFonts.query.data && !loadLocalFonts ? (
                <CommandItem onSelect={() => setLoadLocalFonts(true)}>
                  Load local fonts
                </CommandItem>
              ) : (
                <>
                  {uniqueLocalFontFamilies.map((font) => (
                    <CommandItem
                      key={font.family}
                      value={font.family}
                      onSelect={(currentValue) => {
                        onValueChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === font.family ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {font.family}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Builtin fonts">
              {builtInFonts.map((font) => (
                <CommandItem
                  key={font}
                  value={font}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue)
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === font ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {font}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// export function ComboboxDemo() {

// }

function unique<T>(arr: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
