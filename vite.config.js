// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/not-a-toast.js"),
      name: "toast",
      fileName: "not-a-toast",
    },
    rollupOptions: { },
  },
});
