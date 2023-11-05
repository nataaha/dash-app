// vite.config.ts
import path from "path";
import { defineConfig } from "file:///home/mickie/development/dash-app/node_modules/vite/dist/node/index.js";
import react from "file:///home/mickie/development/dash-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgrPlugin from "file:///home/mickie/development/dash-app/node_modules/vite-plugin-svgr/dist/index.mjs";
import checker from "file:///home/mickie/development/dash-app/node_modules/vite-plugin-checker/dist/esm/main.js";
import { VitePWA } from "file:///home/mickie/development/dash-app/node_modules/vite-plugin-pwa/dist/index.mjs";
import zipPack from "file:///home/mickie/development/dash-app/node_modules/vite-plugin-zip-pack/dist/esm/index.mjs";
import { nodePolyfills } from "file:///home/mickie/development/dash-app/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "/home/mickie/development/dash-app";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      nodePolyfills({
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true
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
        typescript: true
      }),
      svgrPlugin({
        svgrOptions: {
          icon: true
          // ...svgr options (https://react-svgr.com/docs/options/)
        }
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg", "robots.txt", "logo192.ng"],
        devOptions: {
          enabled: false
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"]
        }
      }),
      zipPack({
        inDir: "build",
        outDir: "dist"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      port: 3e3
    },
    build: {
      outDir: "build",
      sourcemap: true
    },
    define: {}
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taWNraWUvZGV2ZWxvcG1lbnQvZGFzaC1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pY2tpZS9kZXZlbG9wbWVudC9kYXNoLWFwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taWNraWUvZGV2ZWxvcG1lbnQvZGFzaC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbi8vaW1wb3J0IGVudkNvbXBhdGlibGUgZnJvbSBcInZpdGUtcGx1Z2luLWVudi1jb21wYXRpYmxlXCI7XG5pbXBvcnQgc3ZnclBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuaW1wb3J0IGNoZWNrZXIgZnJvbSBcInZpdGUtcGx1Z2luLWNoZWNrZXJcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuaW1wb3J0IHppcFBhY2sgZnJvbSBcInZpdGUtcGx1Z2luLXppcC1wYWNrXCI7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuXG5jb25zdCBFTlZfUFJFRklYID0gXCJSRUFDVF9BUFBfXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgICAgICAvLyBXaGV0aGVyIHRvIHBvbHlmaWxsIGBub2RlOmAgcHJvdG9jb2wgaW1wb3J0cy5cbiAgICAgICAgICBwcm90b2NvbEltcG9ydHM6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFjdCh7XG4gICAgICAgICAganN4SW1wb3J0U291cmNlOiBcIkBlbW90aW9uL3JlYWN0XCIsXG4gICAgICAgICAgYmFiZWw6IHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICBcIkBlbW90aW9uL2JhYmVsLXBsdWdpblwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBjaGVja2VyKHtcbiAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHN2Z3JQbHVnaW4oe1xuICAgICAgICAgICAgc3Znck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgaWNvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgLy8gLi4uc3ZnciBvcHRpb25zIChodHRwczovL3JlYWN0LXN2Z3IuY29tL2RvY3Mvb3B0aW9ucy8pXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgVml0ZVBXQSh7IFxuICAgICAgICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICAgICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uaWNvJywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJywgJ21hc2tlZC1pY29uLnN2ZycsJ3JvYm90cy50eHQnLCdsb2dvMTkyLm5nJ10sIFxuICAgICAgICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWx9JywgJyoqLyoue3N2ZyxwbmcsanBnLGdpZn0nXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgICB6aXBQYWNrKHtcbiAgICAgICAgICBpbkRpcjogJ2J1aWxkJyxcbiAgICAgICAgICBvdXREaXI6ICdkaXN0J1xuICAgICAgICB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogXCJidWlsZFwiLFxuICAgICAgc291cmNlbWFwOiB0cnVlXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICB9XG4gIH07XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLE9BQU8sVUFBVTtBQUN0UyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFFbEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFDcEIsU0FBUyxxQkFBcUI7QUFSOUIsSUFBTSxtQ0FBbUM7QUFhekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ0wsY0FBYztBQUFBO0FBQUEsUUFFWixpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQUEsTUFDRCxNQUFNO0FBQUEsUUFDSixpQkFBaUI7QUFBQSxRQUNqQixPQUFPO0FBQUEsVUFFSCxTQUFTO0FBQUEsWUFDUDtBQUFBLFVBQ0Y7QUFBQSxRQUNKO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsTUFDaEIsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1AsYUFBYTtBQUFBLFVBQ1gsTUFBTTtBQUFBO0FBQUEsUUFFUjtBQUFBLE1BQ0osQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLFFBQ0osY0FBYztBQUFBLFFBQ2QsZUFBZSxDQUFDLGVBQWUsd0JBQXdCLG1CQUFrQixjQUFhLFlBQVk7QUFBQSxRQUNsRyxZQUFZO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDYjtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ0wsY0FBYyxDQUFDLHNCQUFzQix3QkFBd0I7QUFBQSxRQUNqRTtBQUFBLE1BQ0osQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUFBLElBQ0w7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsUUFBUSxDQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
