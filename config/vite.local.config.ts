// https://vitejs.dev/config/
import { defineConfig } from "vite"
import devConfig from "./vite.dev.config"
import { merge } from "lodash"
const localConfig = {
    server: {
        host: "0.0.0.0",
        proxy: {},
    },
}

export default defineConfig(merge(devConfig, localConfig))
