import { Language } from "@/components/label-settings-provider";

export type Spice = {
  id: string;
  imageId?: string;
  type: "natural" | "chemical";
  cuisines?: string[];
  etymologicalOrigin?: string;
  names: {
    lang: Language;
    value: string;
    romanised?: string;
  }[];
  chemicalFormula?: string;
  eCode?: string;
}

export const spices: Spice[] = [
  {
    id: "agar-agar",
    type: "natural",
    cuisines: ["Japanese"],
    names: [
      {
        lang: "English",
        value: "Agar-agar",
      },
      {
        lang: "Japanese",
        value: "寒天",
        romanised: "kanten",
      },
      {
        lang: "Binomial",
        value: "Gracilaria",
      }
    ]
  },
  {
    id: "allspice",
    type: "natural",
    cuisines: ["Caribbean"],
    names: [
      {
        lang: "English",
        value: "Allspice",
      },
      {
        lang: "Spanish",
        value: "Pimienta de Jamaica",
      },
      {
        lang: "Binomial",
        value: "Pimenta dioica",
      }
    ]
  },
  {
    id: "amchoor",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Amchoor",
      },
      {
        lang: "Hindi",
        value: "अमचूर",
        romanised: "amchur",
      },
      {
        lang: "Binomial",
        value: "Mangifera indica",
      }
    ]
  },
  {
    id: "anardana-powder",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Anardana powder",
      },
      {
        lang: "Hindi",
        value: "अनारदाना पाउडर",
        romanised: "anāradānā pāudar",
      },
      {
        lang: "Binomial",
        value: "Punica granatum",
      }
    ]
  },
  {
    id: "asafoetida",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Asafoetida",
      },
      {
        lang: "Spanish",
        value: "Asafétida",
      },
      {
        lang: "Binomial",
        value: "Ferula assa-foetida",
      },
      {
        lang: "Hindi",
        value: "हींग",
        romanised: "hīng",
      }
    ]
  },
  {
    id: "baking-soda",
    type: "chemical",
    cuisines: [],
    chemicalFormula: "NaHCO3",
    eCode: "E500",
    names: [
      {
        lang: "English",
        value: "Baking soda",
      },
      {
        lang: "Spanish",
        value: "Bicarbonato de sodio",
      },
    ]
  },
  {
    id: "bay-leaf",
    type: "natural",
    cuisines: [],
    names: [
      {
        lang: "English",
        value: "Bay leaf",
      },
      {
        lang: "Spanish",
        value: "Hoja de laurel",
      },
      {
        lang: "Binomial",
        value: "Laurus nobilis",
      }
    ]
  },
  {
    id: "black-cardamom",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Black cardamom",
      },
      {
        lang: "Spanish", 
        value: "Cardamomo negro",
      },
      {
        lang: "Binomial",
        value: "Amomum subulatum"
      }
    ]
  },
  {
    id: "black-mustard-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Black mustard seeds"
      },
      {
        lang: "Binomial",
        value: "Brassica nigra"
      }
    ]
  },
  {
    id: "black-sesame-seeds",
    type: "natural",
    cuisines: [],
    names: [
      {
        lang: "English",
        value: "Black sesame seeds"
      },
      {
        lang: "Binomial",
        value: "Sesamum indicum"
      }
    ] 
  },
  {
    id: "brown-mustard-seeds",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Brown mustard seeds"
      },
      {
        lang: "Binomial",
        value: "Brassica juncea"
      }
    ]
  },
  {
    id: "cassia-cinnamon",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Cassia cinnamon"
      },
      {
        lang: "Binomial",
        value: "Cinnamomum cassia"
      }
    ]
  },
  {
    id: "cayenne-pepper",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Cayenne pepper"
      },
      {
        lang: "Binomial",
        value: "Capsicum annuum"
      }
    ]
  },
  {
    id: "ceylon-cinnamon",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Ceylon cinnamon"
      },
      {
        lang: "Binomial",
        value: "Cinnamomum verum"
      }
    ]
  },
  {
    id: "chinese-five-spice",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "English",
        value: "Chinese five spice"
      },
      {
        lang: "Chinese Simplified",
        value: "五香粉",
        romanised: "wǔxiāng fěn"
      },
      {
        lang: "Chinese Traditional",
        value: "五香粉",
        romanised: "wǔxiāng fěn"
      },
      {
        lang: "Binomial",
        value: "Zingiberaceae"
      }
    ]
  },
  {
    id: "chives",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Chives"
      },
      {
        lang: "Binomial",
        value: "Allium schoenoprasum"
      }
    ]
  },
  {
    id: "citric-acid",
    type: "chemical",
    cuisines: [],
    chemicalFormula: "C6H8O7",
    eCode: "E330",
    names: [
      {
        lang: "English",
        value: "Citric acid"
      },
      {
        lang: "Spanish",
        value: "Ácido cítrico"
      }
    ]
  },
  {
    id: "cloves",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Cloves"
      },
      {
        lang: "Spanish",
        value: "Clavos de olor"
      },
      {
        lang: "Binomial",
        value: "Syzygium aromaticum"
      }
    ]
  },
  {
    id: "coriander-leaves",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Coriander leaves"
      },
      {
        lang: "Binomial",
        value: "Coriandrum sativum"
      },
      {
        lang: "Hindi",
        value: "हरा धनिया",
        romanised: "harā dhaniya"
      }
    ]
  },
  {
    id: "coriander-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Coriander seeds"
      },
      {
        lang: "Binomial",
        value: "Coriandrum sativum"
      },
      {
        lang: "Hindi",
        value: "धनिया",
        romanised: "dhaniya"
      }
    ]
  },
  {
    id: "cumin-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Cumin seeds",
      },
      {
        lang: "Spanish",
        value: "Comino",
      },
      {
        lang: "Binomial",
        value: "Cuminum cyminum",
      },
      {
        lang: "Hindi",
        value: "जीरा",
        romanised: "jeera",
      },
      {
        lang: "Chinese Simplified",
        value: "孜然",
        romanised: "zīrán",
      },
      {
        lang: "Chinese Traditional",
        value: "孜然",
        romanised: "zīrán",
      }
    ]
  },
  // {
  //   id: "curry-leaves",
  //   type: "natural",
  //   cuisines: ["Indian"],
  //   names: [
  //     {
  //       lang: "English",
  //       value: "Curry leaves"
  //     },
  //     {
  //       lang: "Binomial",
  //       value: "Murraya koenigii"
  //     },
  //     {
  //       lang: "Hindi",
  //       value: "करी पत्ते",
  //       romanised: "karī patte"
  //     }
  //   ]
  // },
  {
    id: "dill-seeds",
    type: "natural",
    cuisines: [],
    names: [
      {
        lang: "English",
        value: "Dill seeds"
      },
      {
        lang: "Binomial",
        value: "Anethum graveolens"
      }
    ]
  },
  {
    id: "fennel-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Fennel seeds"
      },
      {
        lang: "Binomial",
        value: "Foeniculum vulgare"
      },
      {
        lang: "Hindi",
        value: "सौंफ",
        romanised: "saunf"
      }
    ]
  },
  {
    id: "fenugreek-leaves",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Fenugreek leaves"
      },
      {
        lang: "Binomial",
        value: "Trigonella foenum-graecum"
      },
      {
        lang: "Hindi",
        value: "कसूरी मेथी",
        romanised: "kasūrī methī"
      }
    ]
  },
  {
    id: "fenugreek-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Fenugreek seeds"
      },
      {
        lang: "Binomial",
        value: "Trigonella foenum-graecum"
      },
      {
        lang: "Hindi",
        value: "मेथी दाना",
        romanised: "methī dānā"
      }
    ]
  },
  {
    id: "galangal-powder",
    type: "natural",
    cuisines: ["Thai"],
    names: [
      {
        lang: "English",
        value: "Galangal powder"
      },
      {
        lang: "Binomial",
        value: "Alpinia galanga"
      }
    ]
  },
  {
    id: "garam-masala",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Garam masala"
      },
      {
        lang: "Hindi",
        value: "गरम मसाला",
        romanised: "garam masālā"
      }
    ]
  },
  {
    id: "garlic-powder",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Garlic powder"
      },
      {
        lang: "Binomial",
        value: "Allium sativum"
      }
    ]
  },
  {
    id: "ginger-powder",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Ginger powder"
      },
      {
        lang: "Binomial",
        value: "Zingiber officinale"
      }
    ]
  },
  {
    id: "gochugaru",
    type: "natural",
    cuisines: ["Korean"],
    etymologicalOrigin: "Korean",
    names: [
      {
        lang: "English",
        value: "Gochugaru",
      },
      {
        lang: "Korean",
        value: "고추가루",
        romanised: "gochugaru",
      },
      {
        lang: "Binomial",
        value: "Capsicum annuum",
      }
    ]
  },
  {
    id: "green-cardamom",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Green cardamom"
      },
      {
        lang: "Spanish",
        value: "Cardamomo verde"
      },
      {
        lang: "Binomial",
        value: "Elettaria cardamomum"
      }
    ]
  },
  {
    id: "green-sichuan-pepper",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "English",
        value: "Green Sichuan pepper"
      },
      {
        lang: "Chinese Simplified",
        value: "青花椒",
        romanised: "qīng huājiāo"
      },
      {
        lang: "Chinese Traditional",
        value: "青花椒",
        romanised: "qīng huājiāo"
      },
      {
        lang: "Binomial",
        value: "Zanthoxylum armatum"
      }
    ]
  },
  {
    id: "ground-cassia-cinnamon",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Ground cassia cinnamon"
      },
      {
        lang: "Binomial",
        value: "Cinnamomum cassia"
      }
    ]
  },
  {
    id: "ground-ceylon-cinnamon",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Ground ceylon cinnamon"
      },
      {
        lang: "Binomial",
        value: "Cinnamomum verum"
      }
    ]
  },
  {
    id: "ground-coriander-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Ground coriander seeds"
      },
      {
        lang: "Binomial",
        value: "Coriandrum sativum"
      },
      {
        lang: "Hindi",
        value: "धनिया पाउडर",
        romanised: "dhaniya pāudar"
      }
    ]
  },
  {
    id: "ground-cumin-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Ground cumin seeds"
      },
      {
        lang: "Binomial",
        value: "Cuminum cyminum"
      },
      {
        lang: "Hindi",
        value: "जीरा पाउडर",
        romanised: "jeera pāudar"
      }
    ]
  },
  {
    id: "ground-fennel-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Ground fennel seeds"
      },
      {
        lang: "Binomial",
        value: "Foeniculum vulgare"
      },
      {
        lang: "Hindi",
        value: "सौंफ पाउडर",
        romanised: "saunf pāudar"
      }
    ]
  },
  {
    id: "ground-mace",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Ground mace"
      },
      {
        lang: "Binomial",
        value: "Myristica fragrans"
      }
    ]
  },
  {
    id: "ground-nutmeg",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Ground nutmeg"
      },
      {
        lang: "Binomial",
        value: "Myristica fragrans"
      },
    ]
  },
  {
    id: "hyssop",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Hyssop"
      },
      {
        lang: "Binomial",
        value: "Hyssopus officinalis"
      }
    ]
  },
  {
    id: "juniper-berries",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Juniper berries"
      },
      {
        lang: "Binomial",
        value: "Juniperus communis"
      }
    ]
  },
  {
    id: "lemongrass",
    type: "natural",
    cuisines: ["Thai"],
    names: [
      {
        lang: "English",
        value: "Lemongrass",
      },
      {
        lang: "Spanish",
        value: "Hierba de limón",
      },
      {
        lang: "Binomial",
        value: "Cymbopogon",
      },
      {
        lang: "Thai",
        value: "ตะไคร้",
        romanised: "takhrai",
      }
    ]
  },
  {
    id: "mace",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Mace"
      },
      {
        lang: "Spanish",
        value: "Macis"
      },
      {
        lang: "Binomial",
        value: "Myristica fragrans"
      }
    ]
  },
  {
    id: "monosodium-glutamate",
    type: "chemical",
    cuisines: [
      "Chinese",
      "Japanese",
      "Korean"
    ],
    chemicalFormula: "C5H8NO4Na",
    eCode: "E621",
    names: [
      {
        lang: "English",
        value: "Monosodium glutamate",
      },
      {
        lang: "Spanish",
        value: "Glutamato monosódico",
      },
      {
        lang: "Chinese Simplified",
        value: "味精",
        romanised: "wèijīng",
      },
      {
        lang: "Chinese Traditional",
        value: "味精",
        romanised: "wèijīng",
      }
    ],
  },
  {
    id: "nigella-seeds",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Nigella seeds"
      },
      {
        lang: "Binomial",
        value: "Nigella sativa"
      },
      {
        lang: "Hindi",
        value: "कलौंजी",
        romanised: "kalauṅjī"
      }
    ]
  },
  {
    id: "nutmeg",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Nutmeg"
      },
      {
        lang: "Spanish",
        value: "Nuez moscada"
      },
      {
        lang: "Binomial",
        value: "Myristica fragrans"
      }
    ]
  },
  {
    id: "oregano",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Oregano"
      },
      {
        lang: "Spanish",
        value: "Orégano"
      },
      {
        lang: "Binomial",
        value: "Origanum vulgare"
      }
    ]
  },
  {
    id: "paprika",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Paprika"
      },
      {
        lang: "Spanish",
        value: "Pimentón"
      },
      {
        lang: "Binomial",
        value: "Capsicum annuum"
      }
    ]
  },
  {
    id: "parsley",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Parsley"
      },
      {
        lang: "Spanish",
        value: "Perejil"
      },
      {
        lang: "Binomial",
        value: "Petroselinum crispum"
      }
    ]
  },
  {
    id: "ras-el-hanout",
    type: "natural",
    cuisines: [
      "Tunisian",
      "Algerian",
      "Moroccan"
    ],
    etymologicalOrigin: "Arabic",
    names: [
      {
        lang: "English",
        value: "Ras el hanout",
      },
      {
        lang: "Spanish",
        value: "Ras el hanout",
      },
      {
        lang: "Arabic",
        value: "رأس الحانوت",
        romanised: "raʾs al-ḥānūt",
      }
    ],
  },
  {
    id: "red-sichuan-pepper",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "English",
        value: "Red Sichuan pepper"
      },
      {
        lang: "Chinese Simplified",
        value: "红花椒",
        romanised: "hóng huājiāo"
      },
      {
        lang: "Chinese Traditional",
        value: "紅花椒",
        romanised: "hóng huājiāo"
      },
      {
        lang: "Binomial",
        value: "Zanthoxylum bungeaneum"
      }
    ]
  },
  {
    id: "rose-pepper",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Rose pepper"
      },
      {
        lang: "Spanish",
        value: "Pimienta rosa"
      },
      {
        lang: "Binomial",
        value: "Schinus terebinthifolia"
      }
    ]
  },
  {
    id: "rosemary",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Rosemary"
      },
      {
        lang: "Spanish",
        value: "Romero"
      },
      {
        lang: "Binomial",
        value: "Rosmarinus officinalis"
      }
    ]
  },
  {
    id: "saffron",
    type: "natural",
    cuisines: ["Indian"],
    etymologicalOrigin: "Persian",
    names: [
      {
        lang: "English",
        value: "Saffron",
      },
      {
        lang: "Spanish",
        value: "Azafrán",
      },
      {
        lang: "Binomial",
        value: "Crocus sativus",
      },
      {
        lang: "Persian",
        value: "زعفران",
        romanised: "za'farān",
      }
    ]
  },
  {
    id: "sage",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Sage"
      },
      {
        lang: "Spanish",
        value: "Salvia"
      },
      {
        lang: "Binomial",
        value: "Salvia officinalis"
      }
    ] 
  },
  {
    id: "salt",
    type: "chemical",
    chemicalFormula: "NaCl",
    eCode: "E621",
    names: [
      {
        lang: "English",
        value: "Salt"
      },
      {
        lang: "Spanish",
        value: "Sal"
      }
    ]
  },
  {
    id: "star-anise",
    type: "natural",
    cuisines: ["Chinese"],
    names: [
      {
        lang: "English",
        value: "Star anise"
      },
      {
        lang: "Spanish",
        value: "Anís estrellado"
      },
      {
        lang: "Binomial",
        value: "Illicium verum"
      },
      {
        lang: "Chinese Simplified",
        value: "八角",
        romanised: "bājiǎo"
      },
      {
        lang: "Chinese Traditional",
        value: "八角",
        romanised: "bājiǎo"
      }
    ]
  },
  {
    id: "sumac",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Sumac"
      },
      {
        lang: "Spanish",
        value: "Zumaque"
      },
      {
        lang: "Binomial",
        value: "Rhus coriaria"
      }
    ]
  },
  {
    id: "table-sugar",
    type: "chemical",
    chemicalFormula: "C12H22O11",
    eCode: "E621",
    names: [
      {
        lang: "English",
        value: "Table sugar"
      },
      {
        lang: "Spanish",
        value: "Azúcar de mesa"
      }
    ] 
  },
  {
    id: "tarragon",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Tarragon"
      },
      {
        lang: "Spanish",
        value: "Estragón"
      },
      {
        lang: "Binomial",
        value: "Artemisia dracunculus"
      }
    ]
  },
  {
    id: "thyme",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Thyme"
      },
      {
        lang: "Spanish",
        value: "Tomillo"
      },
      {
        lang: "Binomial",
        value: "Thymus vulgaris"
      }
    ]
  },
  {
    id: "turmeric",
    type: "natural",
    cuisines: ["Indian"],
    names: [
      {
        lang: "English",
        value: "Turmeric"
      },
      {
        lang: "Spanish",
        value: "Cúrcuma"
      },
      {
        lang: "Binomial",
        value: "Curcuma longa"
      },
      {
        lang: "Hindi",
        value: "हल्दी",
        romanised: "haldī"
      }
    ]
  },
  {
    id: "vanilla",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Vanilla"
      },
      {
        lang: "Spanish",
        value: "Vainilla"
      },
      {
        lang: "Binomial",
        value: "Vanilla planifolia"
      }
    ]
  },
  {
    id: "white-pepper",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "White pepper"
      },
      {
        lang: "Spanish",
        value: "Pimienta blanca"
      },
      {
        lang: "Binomial",
        value: "Piper nigrum"
      }
    ]
  },
  {
    id: "white-sesame-seeds",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "White sesame seeds"
      },
      {
        lang: "Binomial",
        value: "Sesamum indicum"
      }
    ]
  },
  {
    id: "xylitol",
    type: "chemical",
    chemicalFormula: "C5H12O5",
    eCode: "E967",
    names: [
      {
        lang: "English",
        value: "Xylitol"
      },
      {
        lang: "Spanish",
        value: "Xilitol"
      }
    ]
  },
  {
    id: "yellow-mustard-seeds",
    type: "natural",
    names: [
      {
        lang: "English",
        value: "Yellow mustard seeds"
      },
      {
        lang: "Binomial",
        value: "Sinapis alba"
      }
    ]
  },
  {
    id: "za'atar",
    type: "natural",
    cuisines: ["Levantine"],
    etymologicalOrigin: "Arabic",
    names: [
      {
        lang: "English",
        value: "Za'atar",
      },
      {
        lang: "Arabic",
        value: "زَعْتَر",
        romanised: "za'tar",
      }
    ]
  }
];

export const cuisineLanguages: Record<string, string> = {
  Caribbean: "English",
  Indian: "Hindi",
  Chinese: "Chinese Simplified",
  Japanese: "Japanese",
  Korean: "Korean"
};