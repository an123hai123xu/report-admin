import Cookies from 'js-cookie'

/**
 * @description: 
 * @param {*} info
 * @return {*}
 */
function setCookie(info) {
    const arr = Object.entries(info)
    for (let i = 0; i < arr.length; i++) {
        Cookies.set(arr[i][0], arr[i][1])
    }
    return true
}

function getUserCookie() {
    return {
        username: Cookies.get('username'),
        appkey: Cookies.get('appkey'),
        role: Cookies.get('role'),
        email: Cookies.get('email'),
    }
}

/**
 * @description: 删除Cookie
 * @param {}
 * @return {}
 */
function removeCookie() {
    Cookies.remove('username');
    Cookies.remove('appkey');
    Cookies.remove('role');
    Cookies.remove('email');
    return true;
}
export default {
    setCookie,
    getUserCookie,
    removeCookie
}