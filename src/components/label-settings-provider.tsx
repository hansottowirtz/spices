import { PartialExceptDefault } from "@/lib/partial-except-default";
import { proxy } from "valtio";

export type Language =
  | "English"
  | "Binomial"
  | "Chinese Simplified"
  | "Spanish"
  | "Persian"
  | "Arabic"
  | "Chinese Traditional"
  | "Dutch"
  | "Korean"
  | "Japanese"
  | "Hindi"
  | "Thai";

export type BuiltinFontSettings = {
  type: "builtin";
  family: string;
  weight?: string;
  style?: string;
  spacing?: number;
  size?: number;
};

export type LocalFontSettings = {
  type: "local";
  familyFullName: string;
  familyPostscriptName: string;
  spacing?: number;
  size?: number;
};

export type FontSettings =
  | BuiltinFontSettings
  | LocalFontSettings

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

export type LabelStyle = {
  wireframe?: boolean;
  primaryLanguage: Language;
  secondaryLanguage: Language;
  bleed: number;
  textOffsets: TextOffsets;
  languageFonts: PartialExceptDefault<
    Record<
      Language | "default",
      {
        heading?: FontSettings;
        default: FontSettings;
      }
    >
  >;
  chemicalFont: FontSettings;
  binomialFont: FontSettings;
};

export const labelStyleState = proxy<LabelStyle>({
  primaryLanguage: "English",
  secondaryLanguage: "Chinese Simplified",
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
        weight: "bold",
      },
      default: {
        type: "builtin",
        family: "serif",
      },
    },
    Arabic: {
      default: { type: "builtin", family: "Noto Sans Arabic" },
    },
    Persian: {
      default: { type: "builtin", family: "Noto Sans Arabic" },
    },
    "Chinese Simplified": {
      default: { type: "builtin", family: "serif" },
    },
    "Chinese Traditional": {
      default: { type: "builtin", family: "serif" },
    },
    Dutch: {
      default: { type: "builtin", family: "serif" },
    },
    Korean: {
      default: { type: "builtin", family: "sans-serif" },
    },
    Spanish: {
      default: { type: "builtin", family: "serif" },
    },
    Hindi: {
      default: { type: "builtin", family: "sans-serif" },
    },
    Japanese: {
      default: { type: "builtin", family: "serif" },
    },
  },
  chemicalFont: { type: "builtin", family: "Courier Prime" },
  binomialFont: { type: "builtin", family: "Petit Formal Script" },
});

export function LabelSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
