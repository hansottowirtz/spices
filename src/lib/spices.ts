export type Spice = {
  id: string;
  imageId?: string;
  type: "natural" | "chemical";
  cuisines: string[];
  etymologicalOrigin?: string;
  names: {
    lang: string;
    value: string;
    romanised?: string;
  }[];
  chemicalFormula?: string;
  eCode?: string;
}

export const spices: Spice[] = [
  {
    id: "cumin seeds",
    type: "natural",
    cuisines: ["India"],
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
  {
    id: "saffron",
    type: "natural",
    cuisines: ["India"],
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
        romanised: "za'faran",
      }
    ]
  },
  {
    id: "monosodium glutamate",
    type: "chemical",
    cuisines: [],
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
    id: "gochugaru",
    imageId: "capsicum annuum",
    type: "natural",
    cuisines: ["Korea"],
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
  }
]