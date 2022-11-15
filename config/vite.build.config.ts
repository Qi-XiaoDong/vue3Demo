// https://vitejs.dev/config/
import { defineConfig } from "vite"
import baseConfig from "../vite.config"
import { merge } from "lodash"
const buildConfig = {
    mode: "production",

}

export default defineConfig(merge(baseConfig, buildConfig))
