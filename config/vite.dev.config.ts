// https://vitejs.dev/config/
import { defineConfig } from "vite"
import baseConfig from "../vite.config"
import { merge } from "lodash"
const devConfig = {
    mode: "develpment",
    server: {
        host: "0.0.0.0",
        port: "5100",
        proxy: {},
    },
}

export default defineConfig(merge(baseConfig, devConfig))
