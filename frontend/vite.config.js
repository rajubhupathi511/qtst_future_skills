import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // lottie-react's "browser" field points to a UMD build whose default
      // export breaks under Vite's ESM interop; force the ES build instead.
      'lottie-react': 'lottie-react/build/index.es.js',
    },
  },
})
