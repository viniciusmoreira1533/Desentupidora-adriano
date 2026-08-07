import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    {
      name: 'gtm-injector',
      transformIndexHtml(html: string) {
        const gtmScript = `<script>
window.dataLayer=window.dataLayer||[];
window.requestIdleCallback?window.requestIdleCallback(function(){(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5R3B9PKC');},{timeout:2000}):(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5R3B9PKC');
</script>`;
        const htmlWithGtmHead = html.replace(
          '<meta charset="UTF-8" />',
          `<meta charset="UTF-8" />\n${gtmScript}`
        );
        return htmlWithGtmHead.replace(
          '<body>',
          `<body>\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5R3B9PKC" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
        );
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-slot',
          ],
          'embla': ['embla-carousel-react', 'embla-carousel-autoplay'],
          'lucide': ['lucide-react'],
        }
      }
    }
  }
});
