import path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Inlina o CSS (pequeno, ~7KB gzip) no <head> do index.html e remove o arquivo
// separado — elimina 1 requisição render-blocking, melhorando o FCP.
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find(
        (a): a is Extract<typeof a, { type: 'asset' }> => a.type === 'asset' && a.fileName === 'index.html'
      );
      if (!html || typeof html.source !== 'string') return;
      let src = html.source;
      for (const asset of Object.values(bundle)) {
        if (asset.type === 'asset' && asset.fileName.endsWith('.css')) {
          const base = asset.fileName.split('/').pop();
          const linkRe = new RegExp(`<link[^>]*href="[^"]*${base}"[^>]*>`);
          src = src.replace(linkRe, `<style>${asset.source}</style>`);
          delete bundle[asset.fileName];
        }
      }
      html.source = src;
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), inlineCss()],
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
