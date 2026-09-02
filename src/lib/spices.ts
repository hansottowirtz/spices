import { Language } from "@/components/label-settings-provider";

export const appLanguage: Language = "en";

export type Spice = {
  id: string;
  imageId?: string;
  type: "natural" | "chemical";
  cuisines?: string[];
  etymologicalOrigin?: Language;
  names: {
    lang: Language;
    value: string;
    romanized?: string;
  }[];
  binomialName?: string;
  chemicalFormula?: string;
  eCode?: string;
};

export const spices: Spice[] = [
  {
    id: "agar-agar",
    type: "natural",
    cuisines: ["Japanese"],
    names: [
      {
        lang: "en",
        value: "Agar-agar",
      },
      {
        lang: "es",
        value: "Agar-agar",
      },
      {
        lang: "ja",
        value: "寒天",
        romanized: "kanten",
      },
      {
        lang: "nl",
        value: "Agar-agar",
      }
    ],
    binomialName: "Gracilaria",
  },
  {
    id: "allspice",
    type: "natural",
    cuisines: ["Caribbean"],
    names: [
      {
        lang: "en",
        value: "Allspice",
      },
      {
        lang: "es",
        value: "Pimienta de Jamaica",
      },
      {
        lang: "es-MX",
        value: "Pimienta gorda",
      },
      {
        lang: "nl",
        value: "Piment",
      }
    ],
    binomialName: "Pimenta dioica",
  },
  {
    id: "amchoor",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Amchoor",
      },
      {
        lang: "es",
        value: "Polvo de mango",
      },
      {
        lang: "hi",
        value: "अमचूर",
        romanized: "amchur",
      },
      {
        lang: "nl",
        value: "Amchoor",
      }
    ],
    binomialName: "Mangifera indica",
  },
  {
    id: "anardana-powder",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Anardana powder",
      },
      {
        lang: "es",
        value: "Polvo de granada",
      },
      {
        lang: "hi",
        value: "अनारदाना पाउडर",
        romanized: "anāradānā pāudar",
      },
      {
        lang: "nl",
        value: "Anardana poeder",
      }
    ],
    binomialName: "Punica granatum",
  },
  {
    id: "asafoetida",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Asafoetida",
      },
      {
        lang: "es",
        value: "Asafétida",
      },
      {
        lang: "hi",
        value: "हींग",
        romanized: "hīng",
      },
      {
        lang: "nl",
        value: "Asafoetida",
      }
    ],
    binomialName: "Ferula assa-foetida",
  },
  {
    id: "baking-soda",
    type: "chemical",
    cuisines: [],
    chemicalFormula: "NaHCO3",
    eCode: "E500",
    names: [
      {
        lang: "en",
        value: "Baking soda",
      },
      {
        lang: "es",
        value: "Bicarbonato de sodio",
      },
      {
        lang: "nl",
        value: "Bakpoeder",
      }
    ],
  },
  {
    id: "basil",
    imageId: "basil",
    type: "natural",
    cuisines: ["Italian", "Thai"],
    names: [
      {
        lang: "en",
        value: "Basil",
      },
      {
        lang: "es",
        value: "Albahaca",
      },
      {
        lang: "nl",
        value: "Basilicum",
      }
    ],
    binomialName: "Ocimum basilicum",
  },
  {
    id: "bay-leaf",
    type: "natural",
    cuisines: [],
    names: [
      {
        lang: "en",
        value: "Bay leaf",
      },
      {
        lang: "es",
        value: "Hoja de laurel",
      },
      {
        lang: "nl",
        value: "Laurierblaadje",
      }
    ],
    binomialName: "Laurus nobilis",
  },
  {
    id: "black-cardamom",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Black cardamom",
      },
      {
        lang: "es",
        value: "Cardamomo negro",
      },
      {
        lang: "nl",
        value: "Zwarte kardemom"
      }
    ],
    binomialName: "Amomum subulatum",
  },
  {
    id: "black-mustard-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Black mustard seeds",
      },
      {
        lang: "es",
        value: "Semillas de mostaza negra",
      },
      {
        lang: "nl",
        value: "Zwart mosterdzaad"
      }
    ],
    binomialName: "Brassica nigra",
  },
  {
    id: "black-sesame-seeds",
    type: "natural",
    cuisines: [],
    names: [
      {
        lang: "en",
        value: "Black sesame seeds",
      },
      {
        lang: "es",
        value: "Semillas de sésamo negro",
      },
      {
        lang: "es-MX",
        value: "Ajonjolí negro",
      },
      {
        lang: "nl",
        value: "Zwart sesamzaad"
      }
    ],
    binomialName: "Sesamum indicum",
  },
  {
    id: "brown-mustard-seeds",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Brown mustard seeds",
      },
      {
        lang: "es",
        value: "Semillas de mostaza parda",
      },
      {
        lang: "nl",
        value: "Bruin mosterdzaad"
      }
    ],
    binomialName: "Brassica juncea",
  },
  {
    id: "cassia-cinnamon",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Cassia cinnamon",
      },
      {
        lang: "es",
        value: "Canela cassia",
      },
      {
        lang: "nl",
        value: "Cassia kaneel"
      }
    ],
    binomialName: "Cinnamomum cassia",
  },
  {
    id: "cayenne-pepper",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Cayenne pepper",
      },
      {
        lang: "es",
        value: "Pimienta de cayena",
      },
      {
        lang: "nl",
        value: "Cayennepeper"
      }
    ],
    binomialName: "Capsicum annuum",
  },
  {
    id: "ceylon-cinnamon",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Ceylon cinnamon",
      },
      {
        lang: "es",
        value: "Canela de Ceilán",
      },
      {
        lang: "nl",
        value: "Ceylon kaneel"
      }
    ],
    binomialName: "Cinnamomum verum",
  },
  {
    id: "chinese-five-spice",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "en",
        value: "Chinese five spice",
      },
      {
        lang: "es",
        value: "Cinco especias chinas",
      },
      {
        lang: "zh-CN",
        value: "五香粉",
        romanized: "wǔxiāng fěn",
      },
      {
        lang: "zh-TW",
        value: "五香粉",
        romanized: "wǔxiāng fěn",
      },
      {
        lang: "nl",
        value: "Chinees vijfkruidenpoeder"
      }
    ],
    binomialName: "Zingiberaceae",
  },
  {
    id: "chives",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Chives",
      },
      {
        lang: "es",
        value: "Cebollino",
      },
      {
        lang: "nl",
        value: "Bieslook"
      }
    ],
    binomialName: "Allium schoenoprasum",
  },
  {
    id: "citric-acid",
    type: "chemical",
    cuisines: [],
    chemicalFormula: "C6H8O7",
    eCode: "E330",
    names: [
      {
        lang: "en",
        value: "Citric acid",
      },
      {
        lang: "es",
        value: "Ácido cítrico",
      },
      {
        lang: "nl",
        value: "Citroenzuur"
      }
    ],
  },
  {
    id: "cloves",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Cloves",
      },
      {
        lang: "es",
        value: "Clavos de olor",
      },
      {
        lang: "es-MX",
        value: "Clavo de olor",
      },
      {
        lang: "nl",
        value: "Kruidnagels"
      }
    ],
    binomialName: "Syzygium aromaticum",
  },
  {
    id: "coriander-leaves",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Coriander leaves",
      },
      {
        lang: "es",
        value: "Hojas de cilantro",
      },
      {
        lang: "es-MX",
        value: "Cilantro",
      },
      {
        lang: "hi",
        value: "हरा धनिया",
        romanized: "harā dhaniya",
      },
      {
        lang: "nl",
        value: "Korianderblaadjes"
      }
    ],
    binomialName: "Coriandrum sativum",
  },
  {
    id: "coriander-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Coriander seeds",
      },
      {
        lang: "hi",
        value: "धनिया",
        romanized: "dhaniya",
      },
      {
        lang: "nl",
        value: "Korianderzaad"
      }
    ],
    binomialName: "Coriandrum sativum",
  },
  {
    id: "cumin-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Cumin seeds",
      },
      {
        lang: "es",
        value: "Comino",
      },
      {
        lang: "hi",
        value: "जीरा",
        romanized: "jeera",
      },
      {
        lang: "zh-CN",
        value: "孜然",
        romanized: "zīrán",
      },
      {
        lang: "zh-TW",
        value: "孜然",
        romanized: "zīrán",
      },
      {
        lang: "nl",
        value: "Komijnzaad"
      }
    ],
    binomialName: "Cuminum cyminum",
  },
  {
    id: "dill-seeds",
    type: "natural",
    cuisines: [],
    names: [
      {
        lang: "en",
        value: "Dill seeds",
      },
      {
        lang: "es",
        value: "Semillas de eneldo",
      },
      {
        lang: "nl",
        value: "Dillezaad"
      }
    ],
    binomialName: "Anethum graveolens",
  },
  {
    id: "fennel-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Fennel seeds",
      },
      {
        lang: "es",
        value: "Semillas de hinojo",
      },
      {
        lang: "hi",
        value: "सौंफ",
        romanized: "saunf",
      },
      {
        lang: "nl",
        value: "Venkelzaad"
      }
    ],
    binomialName: "Foeniculum vulgare",
  },
  {
    id: "fenugreek-leaves",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Fenugreek leaves",
      },
      {
        lang: "es",
        value: "Hojas de alholva",
      },
      {
        lang: "hi",
        value: "कसूरी मेथी",
        romanized: "kasūrī methī",
      },      {
        lang: "nl",
        value: "Fenegriekblaadjes"
      }
    ],
    binomialName: "Trigonella foenum-graecum",
  },
  {
    id: "fenugreek-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Fenugreek seeds",
      },
      {
        lang: "es",
        value: "Semillas de alholva",
      },
      {
        lang: "hi",
        value: "मेथी दाना",
        romanized: "methī dānā",
      },
      {
        lang: "nl",
        value: "Fenegriekzaad"
      }
    ],
    binomialName: "Trigonella foenum-graecum",
  },
  {
    id: "galangal-powder",
    type: "natural",
    cuisines: ["Thai"],
    names: [
      {
        lang: "en",
        value: "Galangal powder",
      },
      {
        lang: "es",
        value: "Polvo de galanga",
      },
      {
        lang: "nl",
        value: "Galangalpoeder"
      }
    ],
    binomialName: "Alpinia galanga",
  },
  {
    id: "garam-masala",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Garam masala",
      },
      {
        lang: "es",
        value: "Garam masala",
      },
      {
        lang: "hi",
        value: "गरम मसाला",
        romanized: "garam masālā",
      },
      {
        lang: "nl",
        value: "Garam masala"
      }
    ],
  },
  {
    id: "garlic-powder",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Garlic powder",
      },
      {
        lang: "es",
        value: "Ajo en polvo",
      },
      {
        lang: "nl",
        value: "Knoflookpoeder"
      }
    ],
    binomialName: "Allium sativum",
  },
  {
    id: "ginger-powder",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Ginger powder",
      },
      {
        lang: "es",
        value: "Jengibre en polvo",
      },
      {
        lang: "nl",
        value: "Gemberpoeder"
      }
    ],
    binomialName: "Zingiber officinale",
  },
  {
    id: "gochugaru",
    type: "natural",
    cuisines: ["Korean"],
    etymologicalOrigin: "ko",
    names: [
      {
        lang: "en",
        value: "Gochugaru",
      },
      {
        lang: "es",
        value: "Gochugaru",
      },
      {
        lang: "ko",
        value: "고추가루",
        romanized: "gochugaru",
      },
      {
        lang: "nl",
        value: "Gochugaru"
      }
    ],
    binomialName: "Capsicum annuum",
  },
  {
    id: "green-cardamom",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Green cardamom",
      },
      {
        lang: "es",
        value: "Cardamomo verde",
      },
      {
        lang: "nl",
        value: "Groene kardemom"
      }
    ],
    binomialName: "Elettaria cardamomum",
  },
  {
    id: "green-sichuan-pepper",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "en",
        value: "Green Sichuan pepper",
      },
      {
        lang: "es",
        value: "Pimienta de Sichuan verde",
      },
      {
        lang: "zh-CN",
        value: "青花椒",
        romanized: "qīng huājiāo",
      },
      {
        lang: "zh-TW",
        value: "青花椒",
        romanized: "qīng huājiāo",
      },
      {
        lang: "nl",
        value: "Groene Sichuanpeper"
      }
    ],
    binomialName: "Zanthoxylum armatum",
  },
  {
    id: "ground-cassia-cinnamon",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Ground cassia cinnamon",
      },
      {
        lang: "es",
        value: "Canela cassia molida",
      },
      {
        lang: "nl",
        value: "Gemalen cassia kaneel"
      }
    ],
    binomialName: "Cinnamomum cassia",
  },
  {
    id: "ground-ceylon-cinnamon",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Ground ceylon cinnamon",
      },
      {
        lang: "es",
        value: "Canela de Ceilán molida",
      },
      {
        lang: "nl",
        value: "Gemalen Ceylon kaneel"
      }
    ],
    binomialName: "Cinnamomum verum",
  },
  {
    id: "ground-coriander-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Ground coriander seeds",
      },
      {
        lang: "es",
        value: "Semillas de cilantro molidas",
      },
      {
        lang: "es-MX",
        value: "Cilantro molido",
      },
      {
        lang: "hi",
        value: "धनिया पाउडर",
        romanized: "dhaniya pāudar",
      },
      {
        lang: "nl",
        value: "Gemalen korianderzaad"
      }
    ],
    binomialName: "Coriandrum sativum",
  },
  {
    id: "ground-cumin-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Ground cumin seeds",
      },
      {
        lang: "es",
        value: "Comino molido",
      },
      {
        lang: "hi",
        value: "जीरा पाउडर",
        romanized: "jeera pāudar",
      },
      {
        lang: "nl",
        value: "Gemalen komijnzaad"
      }
    ],
    binomialName: "Cuminum cyminum",
  },
  {
    id: "ground-fennel-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Ground fennel seeds",
      },
      {
        lang: "es",
        value: "Semillas de hinojo molidas",
      },
      {
        lang: "hi",
        value: "सौंफ पाउडर",
        romanized: "saunf pāudar",
      },
      {
        lang: "nl",
        value: "Gemalen venkelzaad"
      }
    ],
    binomialName: "Foeniculum vulgare",
  },
  {
    id: "ground-mace",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Ground mace",
      },
      {
        lang: "es",
        value: "Macis molido",
      },
      {
        lang: "nl",
        value: "Gemalen foelie"
      }
    ],
    binomialName: "Myristica fragrans",
  },
  {
    id: "ground-nutmeg",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Ground nutmeg",
      },
      {
        lang: "es",
        value: "Nuez moscada molida",
      },
      {
        lang: "nl",
        value: "Gemalen nootmuskaat"
      }
    ],
    binomialName: "Myristica fragrans",
  },
  {
    id: "hyssop",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Hyssop",
      },
      {
        lang: "es",
        value: "Hisopo",
      },
      {
        lang: "nl",
        value: "Hyssop"
      }
    ],
    binomialName: "Hyssopus officinalis",
  },
  {
    id: "juniper-berries",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Juniper berries",
      },
      {
        lang: "es",
        value: "Bayas de enebro",
      },
      {
        lang: "nl",
        value: "Jeneverbessen"
      }
    ],
    binomialName: "Juniperus communis",
  },
  {
    id: "lemongrass",
    type: "natural",
    cuisines: ["Thai"],
    names: [
      {
        lang: "en",
        value: "Lemongrass",
      },
      {
        lang: "es",
        value: "Hierba de limón",
      },
      {
        lang: "th",
        value: "ตะไคร้",
        romanized: "takhrai",
      },
      {
        lang: "nl",
        value: "Citroengras"
      }
    ],
    binomialName: "Cymbopogon",
  },
  {
    id: "mace",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Mace",
      },
      {
        lang: "es",
        value: "Macis",
      },
      {
        lang: "nl",
        value: "Foelie"
      }
    ],
    binomialName: "Myristica fragrans",
  },
  {
    id: "monosodium-glutamate",
    type: "chemical",
    cuisines: ["Chinese", "Japanese", "Korean"],
    chemicalFormula: "C5H8NO4Na",
    eCode: "E621",
    names: [
      {
        lang: "en",
        value: "Monosodium glutamate",
      },
      {
        lang: "es",
        value: "Glutamato monosódico",
      },
      {
        lang: "zh-CN",
        value: "味精",
        romanized: "wèijīng",
      },
      {
        lang: "zh-TW",
        value: "味精",
        romanized: "wèijīng",
      },
      {
        lang: "nl",
        value: "Monosodiumglutamaat"
      }
    ],
  },
  {
    id: "nigella-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Nigella seeds",
      },
      {
        lang: "es",
        value: "Semillas de nigella",
      },
      {
        lang: "hi",
        value: "कलौंजी",
        romanized: "kalauṅjī",
      },
      {
        lang: "nl",
        value: "Zwarte komijnzaad"
      }
    ],
    binomialName: "Nigella sativa",
  },
  {
    id: "nutmeg",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Nutmeg",
      },
      {
        lang: "es",
        value: "Nuez moscada",
      },
      {
        lang: "nl",
        value: "Nootmuskaat"
      }
    ],
    binomialName: "Myristica fragrans",
  },
  {
    id: "oregano",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Oregano",
      },
      {
        lang: "es",
        value: "Orégano",
      },
      {
        lang: "nl",
        value: "Oregano"
      }
    ],
    binomialName: "Origanum vulgare",
  },
  {
    id: "paprika",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Paprika",
      },
      {
        lang: "es",
        value: "Pimentón",
      },
      {
        lang: "nl",
        value: "Paprika"
      }
    ],
    binomialName: "Capsicum annuum",
  },
  {
    id: "parsley",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Parsley",
      },
      {
        lang: "es",
        value: "Perejil",
      },
      {
        lang: "nl",
        value: "Peterselie"
      }
    ],
    binomialName: "Petroselinum crispum",
  },
  {
    id: "ras-el-hanout",
    type: "natural",
    cuisines: ["Tunisian", "Algerian", "Moroccan"],
    etymologicalOrigin: "ar",
    names: [
      {
        lang: "en",
        value: "Ras el hanout",
      },
      {
        lang: "es",
        value: "Ras el hanout",
      },
      {
        lang: "ar",
        value: "رأس الحانوت",
        romanized: "raʾs al-ḥānūt",
      },
      {
        lang: "nl",
        value: "Ras el hanout"
      }
    ],
  },
  {
    id: "red-sichuan-pepper",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "en",
        value: "Red Sichuan pepper",
      },
      {
        lang: "es",
        value: "Pimienta de Sichuan roja",
      },
      {
        lang: "zh-CN",
        value: "红花椒",
        romanized: "hóng huājiāo",
      },
      {
        lang: "zh-TW",
        value: "紅花椒",
        romanized: "hóng huājiāo",
      },
      {
        lang: "nl",
        value: "Rode Sichuanpeper"
      }
    ],
    binomialName: "Zanthoxylum bungeaneum",
  },
  {
    id: "rose-pepper",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Rose pepper",
      },
      {
        lang: "es",
        value: "Pimienta rosa",
      },
      {
        lang: "nl",
        value: "Roze peper"
      }
    ],
    binomialName: "Schinus terebinthifolia",
  },
  {
    id: "rosemary",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Rosemary",
      },
      {
        lang: "es",
        value: "Romero",
      },
      {
        lang: "nl",
        value: "Rozemarijn"
      }
    ],
    binomialName: "Rosmarinus officinalis",
  },
  {
    id: "saffron",
    type: "natural",
    cuisines: ["Indian"],
    etymologicalOrigin: "fa",
    names: [
      {
        lang: "en",
        value: "Saffron",
      },
      {
        lang: "es",
        value: "Azafrán",
      },
      {
        lang: "fa",
        value: "زعفران",
        romanized: "za'farān",
      },
      {
        lang: "nl",
        value: "Saffraan"
      }
    ],
    binomialName: "Crocus sativus",
  },
  {
    id: "sage",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Sage",
      },
      {
        lang: "es",
        value: "Salvia",
      },
      {
        lang: "nl",
        value: "Salie"
      }
    ],
    binomialName: "Salvia officinalis",
  },
  {
    id: "salt",
    type: "chemical",
    chemicalFormula: "NaCl",
    eCode: "E621",
    names: [
      {
        lang: "en",
        value: "Salt",
      },
      {
        lang: "es",
        value: "Sal",
      },
      {
        lang: "nl",
        value: "Zout"
      }
    ],
  },
  {
    id: "star-anise",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "en",
        value: "Star anise",
      },
      {
        lang: "es",
        value: "Anís estrellado",
      },
      {
        lang: "zh-CN",
        value: "八角",
        romanized: "bājiǎo",
      },
      {
        lang: "zh-TW",
        value: "八角",
        romanized: "bājiǎo",
      },
      {
        lang: "nl",
        value: "Steranijs"
      }
    ],
    binomialName: "Illicium verum",
  },
  {
    id: "sumac",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Sumac",
      },
      {
        lang: "es",
        value: "Zumaque",
      },
      {
        lang: "nl",
        value: "Sumak"
      }
    ],
    binomialName: "Rhus coriaria",
  },
  {
    id: "table-sugar",
    type: "chemical",
    chemicalFormula: "C12H22O11",
    names: [
      {
        lang: "en",
        value: "Table sugar",
      },
      {
        lang: "es",
        value: "Azúcar de mesa",
      },
      {
        lang: "nl",
        value: "Tafelsuiker"
      }
    ],
  },
  {
    id: "tarragon",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Tarragon",
      },
      {
        lang: "es",
        value: "Estragón",
      },
      {
        lang: "nl",
        value: "Dragon"
      }
    ],
    binomialName: "Artemisia dracunculus",
  },
  {
    id: "thyme",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Thyme",
      },
      {
        lang: "es",
        value: "Tomillo",
      },
      {
        lang: "nl",
        value: "Tijm"
      }
    ],
    binomialName: "Thymus vulgaris",
  },
  {
    id: "turmeric",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "en",
        value: "Turmeric",
      },
      {
        lang: "es",
        value: "Cúrcuma",
      },
      {
        lang: "hi",
        value: "हल्दी",
        romanized: "haldī",
      },
      {
        lang: "nl",
        value: "Kurkuma"
      }
    ],
    binomialName: "Curcuma longa",
  },
  {
    id: "vanilla",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Vanilla",
      },
      {
        lang: "es",
        value: "Vainilla",
      },
      {
        lang: "nl",
        value: "Vanille"
      }
    ],
    binomialName: "Vanilla planifolia",
  },
  {
    id: "white-pepper",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "White pepper",
      },
      {
        lang: "es",
        value: "Pimienta blanca",
      },
      {
        lang: "nl",
        value: "Witte peper"
      }
    ],
    binomialName: "Piper nigrum",
  },
  {
    id: "white-sesame-seeds",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "White sesame seeds",
      },
      {
        lang: "es",
        value: "Semillas de sésamo blanco",
      },
      {
        lang: "es-MX",
        value: "Ajonjolí blanco",
      },
      {
        lang: "nl",
        value: "Wit sesamzaad"
      }
    ],
    binomialName: "Sesamum indicum",
  },
  {
    id: "xylitol",
    type: "chemical",
    chemicalFormula: "C5H12O5",
    eCode: "E967",
    names: [
      {
        lang: "en",
        value: "Xylitol",
      },
      {
        lang: "es",
        value: "Xilitol",
      },
      {
        lang: "nl",
        value: "Xylitol"
      }
    ],
  },
  {
    id: "yellow-mustard-seeds",
    type: "natural",
    names: [
      {
        lang: "en",
        value: "Yellow mustard seeds",
      },
      {
        lang: "es",
        value: "Semillas de mostaza amarilla",
      },
      {
        lang: "nl",
        value: "Geel mosterdzaad"
      }
    ],
    binomialName: "Sinapis alba",
  },
  {
    id: "za'atar",
    type: "natural",
    cuisines: ["Levantine"],
    etymologicalOrigin: "ar",
    names: [
      {
        lang: "en",
        value: "Za'atar",
      },
      {
        lang: "es",
        value: "Za'atar",
      },
      {
        lang: "ar",
        value: "زَعْتَر",
        romanized: "za'tar",
      },
      {
        lang: "nl",
        value: "Za'atar"
      }
    ],
  },
];

export const cuisineLanguages: Record<string, Language[]> = {
  Caribbean: ["en"],
  Indian: ["hi"],
  Chinese: ["zh-CN", "zh-TW"],
  Japanese: ["ja"],
  Korean: ["ko"],
};

export const languages: Language[] = [
  "en",
  "en-US",
  "ar",
  "es",
  "es-MX",
  "fa",
  "hi",
  "ja",
  "ko",
  "nl",
  "th",
  "zh-CN",
  "zh-TW",
];

export const languagesWithRomanized: Language[] = [
  "ar",
  "fa",
  "hi",
  "ja",
  "ko",
  "th",
  "zh-CN",
  "zh-TW"
]