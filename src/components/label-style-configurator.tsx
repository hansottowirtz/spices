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
        <div>Family</div>
        <FontFamilySelect
          value={fontSettingsSnapshot.family}
          onValueChange={(value) => (fontSettings.family = value)}
        />
      </div>
      {fontSettingsSnapshot.size === undefined ? (
        <div className="my-2 flex flex-row space-x-2">
          <div>Size</div>
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
        <div>Weight</div>
        <Input
          value={fontSettingsSnapshot.weight}
          onChange={(e) => (fontSettings.weight = e.target.value)}
        />
      </div>
      <div className="my-2 flex flex-row space-x-2">
        <div>Spacing</div>
        <Input
          value={fontSettingsSnapshot.spacing}
          onChange={(e) => (fontSettings.spacing = Number(e.target.value))}
        />
      </div>
      <div className="my-2 flex flex-row space-x-2">
        <div>Style</div>
        <Input
          value={fontSettingsSnapshot.style}
          onChange={(e) => (fontSettings.style = e.target.value)}
        />
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
      <div className="flex flex-row items-center relative h-8">
        <Input
          type="text"
          value={inputState}
          onChange={handleInput}
          className="w-20 h-full"
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

  const fonts = [
    "serif",
    "sans-serif",
    "monospace",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Palatino Linotype",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
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
          {value ? fonts.find((font) => value === font) : "Select framework..."}
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
                  {localFonts.query.data?.map((font) => (
                    <CommandItem
                      key={font.postscriptName}
                      value={font.postscriptName}
                      onSelect={(currentValue) => {
                        onValueChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === font.postscriptName
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {font.postscriptName}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Web fonts">
              {fonts.map((font) => (
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
