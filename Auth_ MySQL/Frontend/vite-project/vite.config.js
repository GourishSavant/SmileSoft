import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// export default {
//     plugins: [react({ fastRefresh: true })],
// };
