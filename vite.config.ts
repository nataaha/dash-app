import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import { VitePWA } from 'vite-plugin-pwa';
import zipPack from "vite-plugin-zip-pack";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
        react({
          jsxImportSource: "@emotion/react"
        }),
        checker({
            overlay: false,
            typescript: true,
        }),
        svgr({
            svgrOptions: {
              icon: true,
              // ...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
        VitePWA({ 
            registerType: 'autoUpdate',
            includeAssets: [
              'favicon.ico', 
              'apple-touch-icon.png', 
              'masked-icon.svg',
              'robots.txt',
              'logo192.png'
            ], 
            manifest: {
              theme_color: '#000000',
            },
            devOptions: {
                enabled: true,
            },
            workbox: {
                globPatterns: [
                  '**/*.{svg,png,jpg,gif,ico,js,css,html}'
                ],
            },
        }),
        zipPack({
          inDir: 'build',
          outDir: 'dist'
        })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
      sourcemap: true,
      minify: false
    },
    define: {
    }
  };
});