import axios from "axios"
import { axiosHoc } from "./tool"
import { VITE_AUTH } from "@/utils/const"

export const authInstance = axiosHoc(
    axios.create({
        baseURL: VITE_AUTH,
        timeout: 1000,
    })
)
