import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import envCompatible from "vite-plugin-env-compatible";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import { VitePWA } from 'vite-plugin-pwa';
import zipPack from "vite-plugin-zip-pack";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const ENV_PREFIX = "REACT_APP_";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
        nodePolyfills({
          // Whether to polyfill `node:` protocol imports.
          protocolImports: true,
        }),
        react({
          jsxImportSource: "@emotion/react",
          babel: {
              
              plugins: [
                "@emotion/babel-plugin"
              ]
          }
        }),
        checker({
            overlay: false,
            typescript: true,
        }),
        svgrPlugin({
            svgrOptions: {
              icon: true,
              // ...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
        VitePWA({ 
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg','robots.txt','logo192.ng'], 
            devOptions: {
                enabled: false,
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
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
      minify:false
    },
    define: {
      global: {},
    }
  };
});