
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on current mode (dev/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // ensures process.env.API_KEY is replaced with your actual key during development/build
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || '')
    },
    server: {
      host: '127.0.0.1',
      port: 3005
    }
  };
});
