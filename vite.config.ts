import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/posture-training-pwa/',
  plugins: [react()],
});
