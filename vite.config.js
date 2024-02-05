import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/privaatsuspoliitika-generaator/', // Replace with your GitHub repo name
  plugins: [react()],
});
