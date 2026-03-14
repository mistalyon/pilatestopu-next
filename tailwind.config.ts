import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
                "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
                  ],
                    theme: {
                        extend: {
                              colors: {
                                      primary: {
                                                DEFAULT: "#730EC3",
                                                          50: "#F3E8FF",
                                                                    100: "#E9D5FF",
                                                                              200: "#D8B4FE",
                                                                                        300: "#C084FC",
                                                                                                  400: "#A855F7",
                                                                                                            500: "#730EC3",
                                                                                                                      600: "#6B0FB3",
                                                                                                                                700: "#5B0D99",
                                                                                                                                          800: "#4C0B80",
                                                                                                                                                    900: "#3B0764",
                                                                                                                                                            },
                                                                                                                                                                    accent: {
                                                                                                                                                                              DEFAULT: "#E91E90",
                                                                                                                                                                                        light: "#FF6BC1",
                                                                                                                                                                                                  dark: "#C2185B",
                                                                                                                                                                                                          },
                                                                                                                                                                                                                  teal: {
                                                                                                                                                                                                                            DEFAULT: "#00D4AA",
                                                                                                                                                                                                                                      light: "#5DFFD4",
                                                                                                                                                                                                                                                dark: "#00A080",
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                    fontFamily: {
                                                                                                                                                                                                                                                                            sans: ["Inter", "system-ui", "sans-serif"],
                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                        backgroundImage: {
                                                                                                                                                                                                                                                                                                "hero-gradient": "linear-gradient(135deg, #730EC3 0%, #E91E90 100%)",
                                                                                                                                                                                                                                                                                                        "card-gradient": "linear-gradient(180deg, rgba(115,14,195,0.05) 0%, rgba(233,30,144,0.05) 100%)",
                                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                      plugins: [require("tailwindcss-animate")],
                                                                                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                                                                                      export default config;