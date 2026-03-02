import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
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
