import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebarColor: 'rgb(27,47,85)', // 自定义颜色
        boxColor: 'rgb(159,184,210)',
      },
    },
  },
  plugins: [],
};
export default config;
