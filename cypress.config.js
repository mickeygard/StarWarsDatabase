import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
  },
  viewportWidth: 1024,
  viewportHeighçt: 768,
  video: false,
});
