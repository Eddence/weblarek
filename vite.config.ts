import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
  define: {
    'import.meta.env.VITE_API_ORIGIN': JSON.stringify('https://larek-api.nomoreparties.co')
  }
})