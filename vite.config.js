import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/weighted-techniques-react/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Thought Smasher',
        short_name: 'ThoughtSmasher',
        description: 'My Vite React app as a PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/weighted-techniques-react/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/weighted-techniques-react/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/weighted-techniques-react/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: true, // Enable PWA support in development
      },
    }),
  ],
});
