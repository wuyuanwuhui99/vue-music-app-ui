import axios from "axios";
import store from "../store";
import {TOKEN} from "../store/mutation-types"

axios.interceptors.request.use(config => {
    //config是axios配置对象
    //每次发送请求前都会进入此拦截器处理函数，可以在此处统一携带上token，每次请求都会带有
    config.headers.common.Authorization = store.state.token || localStorage.getItem('token');
    return config
},err => {
    //请求出错的处理函数
    return Promise.reject(err)
});

axios.interceptors.response.use((res)=> {
    if(res.data.status=="SUCCESS" && res.data.token){
        store.commit(TOKEN, res.data.token)
        localStorage.setItem("token",res.data.token);
    }
    return res.data;
},err => {
    // 在请求错误时要做的事儿
    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err)
})

export default class HttpUtil {

    /**
     * 利用 Promise 的 get 方式请求
     * @param url
     * @returns {Promise}
     */
    static get(url,options={}) {
        return new Promise((resolve) => {
            axios.get(url,options).then((res)=>{
                resolve(res);
            });
        });
    }

    /**
     * 利用 Promise 的 post 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static post(url, data,options={}) {
        return new Promise((resolve) => {
            axios.post(url, data, options).then((res)=>{
                resolve(res);
            })
        })
    }

    /**
     * 利用 Promise 的 post 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static delete(url, data,options={}) {
        return new Promise((resolve) => {
            axios.delete(url, data, options).then((res)=>{
                resolve(res);
            });
        });
    }

    /**
     * 利用 Promise 的 post 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static put(url, data,options={}) {
        return new Promise((resolve, reject) => {
            axios.put(url, data, options).then((res) => {
                resolve(res);
            })
        })
    }
}
