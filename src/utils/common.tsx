import regex from '@navdeep/utils/regex'
import Snackbar from 'react-native-snackbar'
import Config from 'react-native-config';
import axios from 'axios'

const axiosInstance: any = axios.create({
    baseURL: Config.BASE_URL_CONSOLE,
    timeout: 30000,
})

const setAuthorizationToken = (token: string) => {
    if (token) {
        axiosInstance.defaults.headers.Authorization = `${token}`;
    }
};

const validateInput = (type: any, payload: any) => {
    let errorType = '';
    if (type === 'signup') {
        if (!regex.namePattern.test(payload?.name))
            errorType = 'Name'
        else if (!regex.emailPattern.test(payload?.email))
            errorType = 'Email'
        else if (!regex.numberPattern.test(payload?.number))
            errorType = 'Contact Number'
        else if (!regex.passwordPattern.test(payload?.password))
            errorType = 'Password'
    }
    else {
        if (!regex.emailPattern.test(payload?.email))
            errorType = 'Email'
        else if (!regex.passwordPattern.test(payload?.password))
            errorType = 'Password'
    }
    return errorType
}

const snackBar = (text: any, isInfinite?: any) => {
    Snackbar.show({
        text,
        duration: isInfinite ? Snackbar.LENGTH_INDEFINITE : 2000,
    });
}


export default {
    validateInput,
    snackBar,
    setAuthorizationToken,
    axiosInstance,
}