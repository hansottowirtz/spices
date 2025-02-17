"use client";

import { languages, languagesWithRomanized, Spice } from "@/lib/spices";
import { Slider } from "./ui/slider";
import {
  BuiltinFontSettings,
  FontSettings,
  getFallbackLanguages,
  LabelStyle,
  labelStyleState,
  Language,
  TextOffsets,
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
import { ChevronsUpDown, X } from "lucide-react";
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
import { FontData, useLocalFontsQuery } from "@/hooks/use-local-fonts-query";
import { useQuery } from "@tanstack/react-query";
import { getSpiceNames } from "./LabelRenderer";

export function LabelStyleConfigurator({ spice }: { spice: Spice }) {
  const labelStyleSnapshot = useSnapshot(labelStyleState);

  const [hideUnused, setHideUnused] = useState(true);

  const usedLanguages = new Set<string>();
  const names = getSpiceNames(spice, labelStyleSnapshot);
  for (const [, value] of Object.entries(names)) {
    if (!value || typeof value === "string") continue;
    usedLanguages.add(value.lang);
  }

  const offsetSettingsArr: {
    key: keyof TextOffsets;
    label: string;
    unused?: boolean;
  }[] = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "binomial",
      label: "Binomial",
      unused: !spice.binomialName,
    },
    {
      key: "bottom",
      label: "Bottom",
    },
  ] as const;

  const languageFonts = Object.entries(labelStyleSnapshot.languageFonts).filter(
    ([lang]) => lang === "default" || !hideUnused || usedLanguages.has(lang)
  );

  return (
    <div>
      <Section>
        <div>
          <label className="font-bold mb-2 flex flex-row items-center space-x-2">
            <span>Wireframe</span>
            <Checkbox
              checked={labelStyleSnapshot.wireframe}
              onCheckedChange={(v) => (labelStyleState.wireframe = !!v)}
            />
          </label>
        </div>
        <div>
          <label className="font-bold mb-2 flex flex-row items-center space-x-2">
            <span>Hide unused styles</span>
            <Checkbox
              checked={hideUnused}
              onCheckedChange={(v) => setHideUnused(!!v)}
            />
          </label>
        </div>
      </Section>
      <Separator />
      <Section>
        <div className="font-bold my-2">Primary Language</div>
        <LanguageSelect
          value={labelStyleSnapshot.primaryLanguage}
          onValueChange={(v: Language) => (labelStyleState.primaryLanguage = v)}
        />
        <div className="font-bold my-2">Secondary Language</div>
        <LanguageSelect
          value={labelStyleSnapshot.secondaryLanguage}
          onValueChange={(v: Language) =>
            (labelStyleState.secondaryLanguage = v)
          }
        />
      </Section>
      <Separator />
      <Section>
        <div className="font-bold mb-2">Bleed</div>
        <div>
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
        <div className="font-bold mb-2">Offsets</div>
        {offsetSettingsArr
          .filter(({ unused }) => !unused || !hideUnused)
          .map(({ key, label }) => {
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
      </Section>
      <Separator />
      <Section>
        <div className="font-bold mb-2">Language fonts</div>
        <div>
          {languageFonts.map(([lang]) => {
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
      </Section>
      <Separator />
      {(spice.eCode || !hideUnused) && (
        <>
          <Section>
            <div className="font-bold mb-2">Chemical font</div>
            <FontEditor
              value={
                labelStyleSnapshot.chemicalFont && labelStyleState.chemicalFont
              }
              onChange={(v) => (labelStyleState.chemicalFont = v)}
            />
          </Section>
          <Separator />
        </>
      )}
      {(spice.binomialName || !hideUnused) && (
        <Section>
          <div className="font-bold mb-2">Binomial font</div>
          <FontEditor
            value={
              labelStyleSnapshot.binomialFont && labelStyleState.binomialFont
            }
            onChange={(v) => (labelStyleState.binomialFont = v)}
          />
        </Section>
      )}
    </div>
  );
}

function LanguageFontsEditor({
  language: lang,
  languageFontSettings,
}: {
  language: Language;
  languageFontSettings: LabelStyle["languageFonts"][Language] & object;
}) {
  const snap = useSnapshot(languageFontSettings);
  return (
    <div className="border-t py-4 first-of-type:border-0 first-of-type:pt-0">
      <div className="font-bold mb-2 underline">{enDisplayNames.of(lang)}</div>
      <div className="font-bold mb-2">Default</div>
      <FontEditor
        value={languageFontSettings.default}
        onChange={(v) => (languageFontSettings.default = v)}
      />
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
        <FontEditor
          value={languageFontSettings.heading!}
          onChange={(v) => (languageFontSettings.heading = v)}
        />
      ) : (
        <div className="my-2">
          <Button
            onClick={() => (languageFontSettings.heading = { ...snap.default })}
          >
            Add Heading style
          </Button>
        </div>
      )}
      {languagesWithRomanized.includes(lang) && (
        <>
          <div className="font-bold mb-2 flex flex-row items-center space-x-2">
            <div className="flex-1">Romanized</div>
            {snap.romanized && (
              <Button
                className="size-8"
                onClick={() => (languageFontSettings.romanized = undefined)}
              >
                <X />
              </Button>
            )}
          </div>
          <label className="font-bold mb-2 flex flex-row items-center space-x-2">
            <span>Show</span>
            <Checkbox
              checked={languageFontSettings.showRomanized}
              onCheckedChange={(v) =>
                (languageFontSettings.showRomanized = !!v)
              }
            />
          </label>
          {snap.showRomanized && (
            <>
              {snap.romanized ? (
                <FontEditor
                  value={languageFontSettings.romanized!}
                  onChange={(v) => (languageFontSettings.romanized = v)}
                />
              ) : (
                <div className="my-2">
                  <Button
                    onClick={() =>
                      (languageFontSettings.romanized = { ...snap.default })
                    }
                  >
                    Add Romanized style
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// function isFontData(obj: FontData | string): obj is FontData {
//   return typeof obj !== "string";
// }

// // from https://gist.github.com/lukaszgrolik/5849599
// const STYLE_MAP = {
//   // 'Italic': [null, 'italic'],
//   // 'Oblique': [null, 'oblique'],
//   Thin: [100, null],
//   "Ultra Light": [200, null],
//   ExtraLight: [200, null],
//   Light: [300, null],
//   Normal: [400, null],
//   Regular: [400, null],
//   Medium: [500, null],
//   "Demi Bold": [600, null],
//   SemiBold: [600, null],
//   Bold: [700, null],
//   "Extra Bold": [800, null],
//   Heavy: [900, null],
//   Black: [900, null],
//   ExtraBlack: [900, null],
//   Plain: [400, null],
//   // 'Regular': [400, 'normal'],
// };

// function parseStyle(style: string) {
//   // const knownStyles = ['Italic'];
//   // const knownWeights = ['Bold', 'Demi Bold', 'Heavy', 'Medium', ];
// }

function parseFontFullNameToVariation(font: FontData) {
  const name = font.fullName.replace(font.family, "").trim();
  if (!name) return "Regular";
  return name;
}

function fontSettingsToFontFamilySelectValue(
  settings: FontSettings
): FontFamilySelectValue {
  if (settings.type === "builtin") {
    return { type: "builtin", familyName: settings.family };
  } else {
    return {
      type: "local",
      familyName: settings.familyName,
      fullName: settings.familyFullName,
      postscriptName: settings.familyPostscriptName,
    };
  }
}

function FontEditor({
  value,
  onChange,
}: {
  value: FontSettings;
  onChange: (v: FontSettings) => void;
}) {
  const snap = useSnapshot(value, { sync: true });
  const selectedFamily = fontSettingsToFontFamilySelectValue(snap);

  const localFonts = useLocalFontsQuery({
    enabled: selectedFamily?.type === "local",
  });

  const snapPostscriptName =
    snap.type === "local" ? snap.familyPostscriptName : undefined;
  const fontFamilyName =
    snap.type === "builtin"
      ? snap.family
      : localFonts.query.data?.find(
          (f) => f.postscriptName === snapPostscriptName
        )?.family;

  const fontAccessApi = useFontAccessAPI();

  const weightsAndStyles =
    snap.type === "local"
      ? null
      : fontAccessApi.data?.filter((f) => f.family === fontFamilyName);

  const uniqueWeights = unique(weightsAndStyles ?? [], (f) => f.weight);
  const uniqueStyles = unique(weightsAndStyles ?? [], (f) => f.style);

  return (
    <div>
      <div className="my-2 flex flex-row space-x-2 items-center">
        <div className="min-w-16">Family</div>
        <FontFamilySelect
          value={selectedFamily}
          onValueChange={(value) => {
            if (value === null) {
              return;
            }
            if (value.type === "local") {
              onChange({
                type: "local",
                familyName: value.familyName,
                familyFullName: value.fullName,
                familyPostscriptName: value.postscriptName,
                size: snap.size,
                spacing: snap.spacing,
              });
            } else {
              onChange({
                type: "builtin",
                family: value.familyName,
                weight: snap.type === "builtin" ? snap.weight : undefined,
                size: snap.size,
                spacing: snap.spacing,
              });
            }
          }}
        />
      </div>
      {snap.type === "local" && (
        <>
          <div className="my-2 flex flex-row space-x-2">
            <div className="min-w-16">Variation</div>
            <Select
              value={snap.familyPostscriptName}
              onValueChange={(v) => {
                const font = localFonts.query.data!.find(
                  (f) => f.postscriptName === v
                )!;
                onChange({
                  ...snap,
                  familyFullName: font.fullName,
                  familyPostscriptName: font.postscriptName,
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a variation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Variation</SelectLabel>
                  {localFonts.query
                    .data!.filter((x) => x.family === fontFamilyName)
                    .map((font) => (
                      <SelectItem
                        key={font.postscriptName}
                        value={font.postscriptName}
                      >
                        {parseFontFullNameToVariation(font)}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      {snap.type === "builtin" && (
        <>
          <div className="my-2 flex flex-row space-x-2">
            <div className="min-w-16">Weight</div>
            <Select
              value={snap.weight}
              onValueChange={(v) =>
                ((value as BuiltinFontSettings).weight =
                  v as BuiltinFontSettings["weight"])
              }
              disabled={uniqueWeights.length <= 1}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Weight</SelectLabel>
                  {uniqueWeights.map(({ weight }) => (
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
              value={snap.style}
              onValueChange={(v) => ((value as BuiltinFontSettings).style = v)}
              disabled={uniqueStyles.length <= 1}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Style</SelectLabel>
                  {uniqueStyles.map(({ style }) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      {snap.size === undefined ? (
        <div className="my-2 flex flex-row space-x-2">
          <div className="min-w-16">Size</div>
          <Button onClick={() => (value.size = 1)}>Add Size</Button>
        </div>
      ) : (
        <LabeledSliderManaged
          label="Size"
          min={0}
          max={4}
          object={value as Record<"size", number>}
          objectKey="size"
          step={0.01}
          unit="em"
        />
      )}
      <div className="my-2 flex flex-row space-x-2">
        {value.spacing === undefined ? (
          <>
            <div className="min-w-16">Spacing</div>
            <Button onClick={() => (value.spacing = 0)}>Add Spacing</Button>
          </>
        ) : (
          <div className="flex-1">
            <LabeledSliderManaged
              label="Spacing"
              min={-0.2}
              max={0.2}
              object={value}
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

const enDisplayNames = new Intl.DisplayNames(["en"], { type: "language" });

function LanguageSelect({
  value,
  onValueChange,
}: {
  value: Language;
  onValueChange: (v: Language) => void;
}) {
  const fallback = getFallbackLanguages(value, languages);
  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {enDisplayNames.of(language)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fallback.length > 0 && (
        <div className="text-xs text-gray-500">
          Fallback: {fallback.map((lang) => enDisplayNames.of(lang)).join(", ")}
        </div>
      )}
    </>
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
      onValueChange={(v) => {
        (object as Record<TKey, number>)[objectKey] = v;
      }}
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

  const totalNumbers =
    Math.max(`${max}`.length, `${min}`.length) + (decimalPlaces ?? 0);

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
          style={{
            width: totalNumbers * 4 + (unit ? unit.length * 8 + 70 : 0),
          }}
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

type FontFamilySelectValue =
  | {
      type: "local";
      familyName: string;
      fullName: string;
      postscriptName: string;
    }
  | { type: "builtin"; familyName: string };

function FontFamilySelect({
  value,
  onValueChange,
}: {
  value: FontFamilySelectValue;
  onValueChange: (v: FontFamilySelectValue) => void;
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
    "Barlow Semi Condensed",
    "Noto Sans Arabic",
    "Noto Sans Syriac",
    "Petit Formal Script",
    "Courier Prime",
    "M PLUS Rounded 1c"
  ];

  const uniqueLocalFontFamilies = [
    ...new Set<string>(localFonts.query.data?.map((f) => f.family) ?? []),
  ];

  const fontNameMap: Record<string, string> = {};
  for (const fontFamily of builtInFonts) {
    fontNameMap["builtin___" + fontFamily] = fontFamily;
  }
  for (const fontFamily of uniqueLocalFontFamilies) {
    fontNameMap["local___" + fontFamily] = fontFamily;
  }

  const commandValue =
    value.type === "local"
      ? "local___" + value.familyName
      : "builtin___" + value.familyName;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[250px] justify-between"
        >
          {fontNameMap[commandValue] ?? "Select font..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command
          value={commandValue}
          onValueChange={(value) => {
            const [type, fontFamily] = value.split("___");
            if (type === "local") {
              const fontData = findDefaultVariation(
                localFonts.query.data!,
                fontFamily
              )!;
              onValueChange({
                type: "local",
                familyName: fontData.family,
                fullName: fontData.fullName,
                postscriptName: fontData.postscriptName,
              });
            } else {
              onValueChange({ type: "builtin", familyName: fontFamily });
            }
          }}
          disablePointerSelection
        >
          <CommandInput placeholder="Search font..." />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup heading="Builtin fonts">
              {builtInFonts.map((font) => (
                <CommandItem key={font} value={"builtin___" + font}>
                  {font}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Local fonts">
              {!localFonts.browserSupport ? (
                <CommandItem disabled>
                  Local fonts access not available.
                </CommandItem>
              ) : localFonts.isPermissionRejected ? (
                <CommandItem disabled>
                  Local fonts access rejected. You can change it in the browser
                  settings.
                </CommandItem>
              ) : localFonts.query.isLoading ? (
                <CommandItem disabled>Loading local fonts...</CommandItem>
              ) : !localFonts.query.data && !loadLocalFonts ? (
                <CommandItem onSelect={() => setLoadLocalFonts(true)}>
                  Load local fonts
                </CommandItem>
              ) : (
                <>
                  {uniqueLocalFontFamilies.map((fontFamily) => (
                    <CommandItem
                      key={fontFamily}
                      value={"local___" + fontFamily}
                    >
                      {fontFamily}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="px-4 my-4">{children}</div>;
}

function Separator() {
  return <div className="border-t border-gray-200 dark:border-gray-800 my-2" />;
}

function unique<T>(arr: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function useFontAccessAPI() {
  return useQuery({
    queryKey: ["fonts"],
    queryFn: async () => {
      await document.fonts.ready;
      return Array.from(document.fonts.values());
    },
  });
}

function findDefaultVariation(fonts: FontData[], family: string) {
  const familyFonts = fonts.filter((f) => f.family === family);
  if (!familyFonts) return null;
  return familyFonts.find((f) => f.style === "Regular") ?? familyFonts[0];
}
