import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
    },
    include: [
      'pages/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      'components/**/*.{test,spec}.?(c|m)[jt]s?(x)',
    ],
  },
});
