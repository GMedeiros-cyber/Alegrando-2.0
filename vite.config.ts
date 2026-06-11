import path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// No build: (1) inlina o CSS purgado (~7KB gzip) no <head> e remove o <link>
// render-blocking; (2) injeta <link rel=preload> para os 2 woff2 críticos do
// above-the-fold (H1 do Hero: Montserrat 700 + Playfair itálico), casando com o
// nome hasheado gerado pelo Vite.
const CRITICAL_FONTS = [
  'montserrat-latin-700-normal',
  'playfair-display-latin-400-italic',
];

function optimizeHtml(): Plugin {
  return {
    name: 'optimize-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find(
        (a): a is Extract<typeof a, { type: 'asset' }> => a.type === 'asset' && a.fileName === 'index.html'
      );
      if (!html || typeof html.source !== 'string') return;
      let src = html.source;

      // (1) inline do CSS
      for (const asset of Object.values(bundle)) {
        if (asset.type === 'asset' && asset.fileName.endsWith('.css')) {
          const base = asset.fileName.split('/').pop();
          const linkRe = new RegExp(`<link[^>]*href="[^"]*${base}"[^>]*>`);
          src = src.replace(linkRe, `<style>${asset.source}</style>`);
          delete bundle[asset.fileName];
        }
      }

      // (2) preload das fontes críticas
      const preloads = Object.values(bundle)
        .filter((a) => a.fileName.endsWith('.woff2') && CRITICAL_FONTS.some((f) => a.fileName.includes(f)))
        .map((a) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${a.fileName}">`)
        .join('\n  ');
      if (preloads) src = src.replace('</head>', `  ${preloads}\n</head>`);

      html.source = src;
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), imagetools(), optimizeHtml()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Separa libs estáveis em chunks próprios (melhor cache entre deploys).
        // Supabase e ícones lucide ficam com seus chunks lazy naturais.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-router') ||
              id.includes('/react-dom/') ||
              id.includes('/react/') ||
              id.includes('/scheduler/')
            ) {
              return 'react-vendor';
            }
            if (
              id.includes('framer-motion') ||
              id.includes('motion-dom') ||
              id.includes('motion-utils')
            ) {
              return 'framer';
            }
          }
        },
      },
    },
  },
});
