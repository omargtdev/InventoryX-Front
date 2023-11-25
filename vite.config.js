import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const baseConfig =  {
		server: {
			port: 5500
		},
		plugins: [react()],
	}

	if(command === 'build') {
		return {
			...baseConfig,
			base: '/InventoryX-Front/'
		}
	}

	return baseConfig;
})
