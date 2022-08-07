import common from "./common"

const getAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.get(endPoint, { params: body })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error?.response);
        })
}

const postAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.get(endPoint, { params: body })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error?.response);
        })
}

const putAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.put(endPoint, { params: body })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error?.response);
        })
}

export {
    getAPI,
    postAPI,
    putAPI
}