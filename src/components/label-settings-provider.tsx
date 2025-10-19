import { PartialExceptDefault } from "@/lib/partial-except-default";
import { languages } from "@/lib/spices";
import { proxy } from "valtio";

export type Language =
  | "en"
  | "en-US"
  | "zh-CN"
  | "zh-TW"
  | "nl"
  | "ko"
  | "ja"
  | "es"
  | "es-MX"
  | "fa"
  | "ar"
  | "hi"
  | "th";

export type BuiltinFontSettings = {
  type: "builtin";
  family: string;
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  style?: string;
  spacing?: number;
  size?: number;
};

export type LocalFontSettings = {
  type: "local";
  familyName: string;
  familyFullName: string;
  familyPostscriptName: string;
  spacing?: number;
  size?: number;
};

export type FontSettings = BuiltinFontSettings | LocalFontSettings;

export type TextOffsets = {
  title: {
    margin: number;
  };
  binomial: {
    margin: number;
  };
  bottom: {
    margin: number;
  };
};

type LanguageFonts = {
  heading?: FontSettings;
  default: FontSettings;
  romanized?: FontSettings;
  showRomanized?: boolean;
};

export type LabelStyle = {
  wireframe?: boolean;
  primaryLanguage: Language;
  secondaryLanguage: Language;
  bleed: number;
  textOffsets: TextOffsets;
  languageFonts: PartialExceptDefault<
    Record<
      Language | "default",
      LanguageFonts
    >
  >;
  chemicalFont: FontSettings;
  binomialFont: FontSettings;
  bottomSeparator: string;
  bottomSeparatorFont: FontSettings;
};

export function getDefaultPrimaryLanguage(): Language {
  return "en";
}

export function getDefaultSecondaryLanguage(navigatorLanguages: Language[] = []): Language {
  const primaryLanguage = getDefaultPrimaryLanguage();
  for (const navLang of navigatorLanguages) {
    const fallbacks = getFallbackLanguages(navLang, languages);
    if (
      languages.includes(navLang) &&
      navLang !== primaryLanguage &&
      !fallbacks.includes(primaryLanguage)
    ) {
      return navLang;
    }
  }
  return "zh-CN";
}

export function getNavigatorLanguages(): Language[] {
  if (typeof navigator !== "undefined") {
    return navigator.languages as Language[];
  }
  return [];
}

export const labelStyleState = proxy<LabelStyle>({
  primaryLanguage: getDefaultPrimaryLanguage(),
  secondaryLanguage: getDefaultSecondaryLanguage(),
  bleed: 0.05,
  textOffsets: {
    title: {
      margin: 0.77,
    },
    binomial: {
      margin: 0.655,
    },
    bottom: {
      margin: 0.8,
    },
  },
  languageFonts: {
    default: {
      heading: {
        type: "builtin",
        family: "Glegoo",
        spacing: -(1 / 60),
        weight: "700",
      },
      default: {
        type: "builtin",
        family: "Barlow Semi Condensed",
      },
    },
    ar: {
      default: { type: "builtin", family: "Noto Sans Arabic" },
      romanized: { type: "builtin", family: "El Messiri" },
    },
    fa: {
      default: { type: "builtin", family: "Noto Sans Arabic" },
    },
    "zh-CN": {
      default: { type: "builtin", family: "serif" },
    },
    "zh-TW": {
      default: { type: "builtin", family: "serif" },
    },
    nl: {
      default: { type: "builtin", family: "Barlow Semi Condensed" },
    },
    ko: {
      default: { type: "builtin", family: "sans-serif" },
    },
    es: {
      default: { type: "builtin", family: "Barlow Semi Condensed" },
    },
    "es-MX": {
      default: { type: "builtin", family: "Barlow Semi Condensed" },
    },
    hi: {
      default: { type: "builtin", family: "Laila" },
      romanized: { type: "builtin", family: "Merienda", weight: "300", size: 0.7 },
    },
    ja: {
      default: { type: "builtin", family: "M PLUS Rounded 1c", weight: "300" },
    },
  },
  chemicalFont: { type: "builtin", family: "Courier Prime" },
  binomialFont: { type: "builtin", family: "Petit Formal Script" },
  bottomSeparator: "•",
  bottomSeparatorFont: { type: "builtin", family: "sans-serif" },
});

export function getFallbackLanguages(
  lang: Language,
  languages: Language[]
): Language[] {
  const [primary, secondary] = lang.split("-") as [Language, Language];
  if (secondary) {
    if (languages.includes(primary as Language)) return [primary];
  }
  return [];
}
