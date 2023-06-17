import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  commonjsOptions: {
    esmExternals: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },

  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // cho phép biên dịch javascript trong file less của Ant Design Vue
      },
    },
  },

})
