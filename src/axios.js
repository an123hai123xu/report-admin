import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
})
instance.interceptors.request.use((config) => {
        console.log(config)
        if (config.url.includes('passport')) {
            return config
        }
    }, (err) => {
        return Promise.reject(err);
    })
    // 响应拦截
instance.interceptors.response.use((response) => {
    if (response.data.status === 'fail') {
        return Promise.reject(response.data.msg);
    } else {
        return response.data.data
    }
}, (error) => {
    return Promise.reject(error);
});

export default instance