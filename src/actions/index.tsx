import { getAPI, putAPI, postAPI } from "@navdeep/utils/api";
import endpoint from "@navdeep/utils/endpoint";
import common from "@navdeep/utils/common";
import Config from 'react-native-config';
import base64 from 'react-native-base64';
import actionNames from "@navdeep/utils/actionNames";
import axios from 'axios'

export function getAccessToken() {
    return (dispatch: Function, getState: Function) => {
        const base64credentials = base64?.encode('4af7c29975824de3b17abb10cb8471ae' + ':' + '1b8e875ab6434c56b0d8e4638eca3c7f')

        fetch(`${Config.BASE_URL_TOKEN}${endpoint.token}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${base64credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('response of get access token ', responseJson);
                common?.setAuthorizationToken(`${responseJson?.token_type} ${responseJson?.access_token}`)
                dispatch({
                    type: actionNames?.AUTH_REDUCER,
                    payload: {
                        accessToken: responseJson?.access_token ?? '',
                        tokenType: responseJson?.token_type ?? ''
                    }
                })
            }).catch((error) => {
                console.log('error of get access token ', error);
                common?.snackBar(error?.data?.error?.message)
            })
    }
}

export function getLocationList(payload: any, callback = (data: any) => { }) {
    return (dispatch: Function, getState: Function) => {
        axios.get('https://autosuggest.search.hereapi.com/v1/autosuggest', {
            params: {
                at: `${payload?.latitude},${payload?.longitude}`,
                limit: 5,
                lang: 'en',
                q: payload?.searchText,
                apiKey: Config?.HERE_MAP_API_KEY
            }
        })
            .then(response => {
                console.log('response of Here Map location list : ', response);
                let arr = response?.data?.items?.map((item: any) => ({
                    title: item?.address?.label,
                    coordinate: {
                        latitude: item?.position?.lat ?? 0,
                        longitude: item?.position?.lng ?? 0,
                    }
                }))
                callback(arr)
            })
            .catch(error => {
                console.log('error of Here Map location list : ', error);
                //common?.snackBar(error?.data?.error?.message ?? '')
            })
    }
}

export function getSearchList(payload: any, callback = (data: any) => { }) {
    return (dispatch: Function, getState: Function) => {
        getAPI(
            endpoint?.search,
            payload,
            (response: any) => {
                console.log('response of search list : ', response);
                callback(response?.data)
            },
            (error: any) => {
                console.log('error of search list : ', error);
                common?.snackBar(error?.data?.error?.message)
            }
        )
    }
}

export function getBrowseCategoriesList(payload: any, callback = (data: any) => { }) {
    return (dispatch: Function, getState: Function) => {
        getAPI(
            endpoint?.browseCategories,
            payload,
            (response: any) => {
                console.log('response of Browse Categories list : ', response);
                callback(response?.data)
            },
            (error: any) => {
                console.log('error of Browse Categories list : ', error);
                common?.snackBar(error?.data?.error?.message)
            }
        )
    }
}

export function setLoaderState(state: any) {
    return (dispatch: Function) => {
        dispatch({
            type: actionNames?.AUTH_REDUCER,
            payload: {
                isLoading: state
            }
        })
    }
}