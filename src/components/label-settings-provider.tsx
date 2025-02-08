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

export type FontSettings = {
  family: string;
  spacing?: number;
  size?: number;
  weight?: string;
  style?: string;
};

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
        family: "Glegoo",
        spacing: -(1 / 60),
        weight: "bold",
      },
      default: {
        family: "serif",
      },
    },
    Arabic: {
      default: {
        family: "Noto Sans Arabic",
      },
    },
    Persian: {
      default: {
        family: "Noto Sans Arabic",
      },
    },
    "Chinese Simplified": {
      default: {
        family: "serif",
      },
    },
    "Chinese Traditional": {
      default: {
        family: "serif",
      },
    },
    Dutch: {
      default: {
        family: "serif",
      },
    },
    Korean: {
      default: {
        family: "sans-serif",
      },
    },
    Spanish: {
      default: {
        family: "serif",
      },
    },
    Hindi: {
      default: {
        family: "sans-serif",
      },
    },
    Japanese: {
      default: {
        family: "serif",
      },
    },
  },
  chemicalFont: {
    family: "Courier Prime",
  },
  binomialFont: {
    family: "Petit Formal Script",
  },
});

export function LabelSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
