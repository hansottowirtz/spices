import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import valtio from "eslint-plugin-valtio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  valtio.configs["flat/recommended"],
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
