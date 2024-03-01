import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    current: "currentColor",
    transparent: "transparent",
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[700],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
        tremor: {
          brand: {
            faint: "var(--primary-lightest)",
            muted: "var(--primary-lighter)",
            subtle: "var(--primary-light)",
            DEFAULT: "var(--primary-base)",
            emphasis: "var(--primary-dark)",
            inverted: "var(--primary-foreground)",
          },
          background: {
            muted: "var(--weak)",
            subtle: "var(--soft)",
            DEFAULT: "var(--background)",
            emphasis: "var(--sub)",
          },
          border: {
            DEFAULT: "var(--sub-stroke)",
          },
          ring: {
            DEFAULT: "var(--primary-base)",
          },
          content: {
            subtle: "var(--weak-foreground)",
            DEFAULT: "var(--soft-foreground)",
            emphasis: "var(--sub-foreground)",
            strong: "var(--foreground)",
            inverted: "var(--background)",
          },
        },
        "gradients/primary/base": "#3b76f6",
        "gradients/secondary/base": "#667a91",
        primary: {
          focus: "var(--primary-focus)",
          darkest: "var(--primary-darkest)",
          foreground: "var(--primary-foreground)",
          darker: "var(--primary-darker)",
          dark: "var(--primary-dark)",
          DEFAULT: "var(--primary-base)",
          light: "var(--primary-light)",
          lighter: "var(--primary-lighter)",
          lightest: "var(--primary-lightest)",
        },
        secondary: {
          focus: "var(--secondary-focus)",
          darkest: "var(--secondary-darkest)",
          foreground: "var(--secondary-foreground)",
          darker: "var(--secondary-darker)",
          dark: "var(--secondary-dark)",
          DEFAULT: "var(--secondary-base)",
          light: "var(--secondary-light)",
          lighter: "var(--secondary-lighter)",
          lightest: "var(--secondary-lightest)",
        },
        danger: {
          focus: "var(--danger-focus)",
          darkest: "var(--danger-darkest)",
          foreground: "var(--danger-foreground)",
          darker: "var(--danger-darker)",
          dark: "var(--danger-dark)",
          DEFAULT: "var(--danger-base)",
          light: "var(--danger-light)",
          lighter: "var(--danger-lighter)",
          lightest: "var(--danger-lightest)",
        },
        state: {
          success: "var(--state-success)",
          foreground: "var(--state-foreground)",
          warning: "var(--state-warning)",
          error: "var(--state-error)",
          information: "var(--state-information)",
          away: "var(--state-away)",
          feature: "var(--state-feature)",
          neutral: "var(--state-neutral)",
          verified: "var(--state-verified)",
        },
        soft: {
          DEFAULT: "var(--soft)",
          foreground: "var(--soft-foreground)",
          stroke: "var(--soft-stroke)",
        },
        weak: {
          DEFAULT: "var(--weak)",
          foreground: "var(--weak-foreground)",
          stroke: "var(--weak-stroke)",
        },
        sub: {
          DEFAULT: "var(--sub)",
          foreground: "var(--sub-foreground)",
          stroke: "var(--sub-stroke)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "tremor-label": [
          "0.75rem",
          {
            lineHeight: "1rem",
          },
        ],
        "tremor-default": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
          },
        ],
        "tremor-title": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        "tremor-metric": [
          "1.875rem",
          {
            lineHeight: "2.25rem",
          },
        ],
      },
      borderRadius: {
        "radius-none": "var(--radius-none)",
        "radius-xs": "var(--radius-xs)",
        "radius-sm": "var(--radius-sm)",
        radius: "var(--radius-base)",
        "radius-md": "var(--radius-md)",
        "radius-lg": "var(--radius-lg)",
        "radius-full": "var(--radius-full)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      boxShadow: {
        shadow:
          "0px 2px 4px 0px rgba(0, 0, 0, 0.03), 0px 6px 6px 0px rgba(0, 0, 0, 0.03),0px 15px 20px 0px rgba(0, 0, 0, 0.03), 0px 30px 40px 0px rgba(0, 0, 0, 0.03),0px 40px 70px 0px rgba(0, 0, 0, 0.03), 0px 4px 30px 0px rgba(0, 0, 0, 0.03), 0px 0px 8px 0px rgba(0, 0, 0, 0.03)",
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    },
    safelist: [
      {
        pattern:
          /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        variants: ["hover", "ui-selected"],
      },
      {
        pattern:
          /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        variants: ["hover", "ui-selected"],
      },
      {
        pattern:
          /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        variants: ["hover", "ui-selected"],
      },
      {
        pattern:
          /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      },
      {
        pattern:
          /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      },
      {
        pattern:
          /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      },
    ],
    plugins: [
      require("@headlessui/tailwindcss"),
      require("@tailwindcss/forms"),
    ],
  },
};
export default config;
