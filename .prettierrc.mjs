/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  printWidth: 95,
  singleQuote: true,
  quoteProps: 'consistent',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'cva'],
  tailwindStylesheet: './src/app/globals.css',
  importOrder: [
    '<TYPES>',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^@base-ui/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^[#](([a-z]|[-])+)?',
    '^[#](([a-z]|[-])+)?',
    '<TYPES>^(~|@)/',
    '^(~|@)/',
    '',
    '<TYPES>^([.]{1,2})/',
    '^([.]{1,2})/',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  overrides: [
    {
      files: '*.tsx',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
