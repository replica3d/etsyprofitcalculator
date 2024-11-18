import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: {
        toplevel: true,
        safari10: true
      },
      format: {
        comments: false
      },
      nameCache: null
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          calculator: [
            '/src/components/Calculator.tsx',
            '/src/components/InputField.tsx',
            '/src/components/ProfitGraph.tsx',
            '/src/components/ProfitSection.tsx',
            '/src/components/RevenueSection.tsx',
            '/src/components/EtsyFeesSection.tsx',
            '/src/components/OtherCostsSection.tsx',
            '/src/components/AdvancedSettings.tsx',
            '/src/components/Tooltip.tsx'
          ]
        }
      }
    }
  }
});