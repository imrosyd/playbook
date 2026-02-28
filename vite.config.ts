import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 29145,
        proxy: {
            '/api': {
                target: 'http://localhost:17482',
                changeOrigin: true,
            },
        },
    },
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
});
