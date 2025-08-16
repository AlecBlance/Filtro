import { defineConfig } from "wxt";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist", // default: ".output"
  manifest: {
    permissions: ["storage"],
    web_accessible_resources: [
      {
        resources: ["productSift.js"],
        matches: ["*://*.producthunt.com/*"],
      },
    ],
  },

  vite: () => {
    process.env.VITE_VERSION = JSON.parse(
      fs.readFileSync("package.json", "utf-8")
    ).version;
    return {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    };
  },
});
