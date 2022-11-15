import { C_AUTH_ERR_MAP, C_NET_WORK_ERROR } from "./const"

export const handleRequestHeader = (config: any) => {
    config["xxxx"] = "xxx"

    return config
}

export const handleAuth = (config: any) => {
    config.header["token"] = localStorage.getItem("token") || 123 || ""
    return config
}

type errStatusType = keyof typeof C_NET_WORK_ERROR
// 网络错误
export const handleNetworkError = (errStatus: errStatusType) => {
    let errMessage = "未知错误"
    if (errStatus) {
        // switch (errStatus) {
        //     case 400:
        //         errMessage = "错误的请求"
        //         break
        //     case 401:
        //         errMessage = "未授权，请重新登录"
        //         break
        //     case 403:
        //         errMessage = "拒绝访问"
        //         break
        //     case 404:
        //         errMessage = "请求错误,未找到该资源"
        //         break
        //     case 405:
        //         errMessage = "请求方法未允许"
        //         break
        //     case 408:
        //         errMessage = "请求超时"
        //         break
        //     case 500:
        //         errMessage = "服务器端出错"
        //         break
        //     case 501:
        //         errMessage = "网络未实现"
        //         break
        //     case 502:
        //         errMessage = "网络错误"
        //         break
        //     case 503:
        //         errMessage = "服务不可用"
        //         break
        //     case 504:
        //         errMessage = "网络超时"
        //         break
        //     case 505:
        //         errMessage = "http版本不支持该请求"
        //         break
        //     default:
        //         errMessage = `其他连接错误 --${errStatus}`
        // }
        errMessage =
            C_NET_WORK_ERROR[errStatus] || `其他连接错误 --${errStatus}`
    } else {
        errMessage = `无法连接到服务器！`
    }

    // message.error(errMessage)
}

type errno = keyof typeof C_AUTH_ERR_MAP
// 授权错误
export const handleAuthError = (errno: errno) => {
    if (C_AUTH_ERR_MAP[errno]) {
        // message.error(C_AUTH_ERR_MAP[errno])
        // 授权错误，登出账户
        // logout()
        return false
    }

    return true
}

// 普通请求报错
type errorType = {
    errno: string | number
    errmsg: string
}
export const handleGeneralError = (err: errorType) => {
    if (err.errno !== "0") {
        // meessage.error(err.errmsg)
        return false
    }

    return true
}

export const axiosHoc = (axios: any) => {
    axios.interceptors.request.use((config: any) => {
        config = handleRequestHeader(config)
        config = handleAuth(config)
        return config
    })

    axios.axios.interceptors.response.use(
        (response: any) => {
            if (response.status !== 200) return Promise.reject(response.data)
            handleAuthError(response.data.errno)
            handleGeneralError({
                errno: response.data.errno,
                errmsg: response.data.errmsg,
            })
            return Promise.reject(response.data)
        },
        (err: any) => {
            handleNetworkError(err.response.status)
            Promise.reject(err.response)
        }
    )
}
