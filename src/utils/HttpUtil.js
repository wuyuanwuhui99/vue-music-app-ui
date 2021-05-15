import axios from "axios";

export default class HttpUtil {

    /**
     * 利用 Promise 的 get 方式请求
     * @param url
     * @returns {Promise}
     */
    static get(url,options={}) {
        return new Promise((resolve, reject) => {
            if(!options.headers)options.headers = {}
            options.headers.Authorization = localStorage.getItem("token");
            axios.get(url,options).then((res)=>{
                if(res.data.status=="SUCCESS"){
                    if(res.data.token){
                        localStorage.setItem("token",HttpUtil.token = res.data.token);
                    }
                    resolve(res.data);
                }else{
                    reject(res.data);
                }
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
        return new Promise((resolve, reject) => {
            if(!options.headers)options.headers = {}
            options.headers.Authorization = localStorage.getItem("token");;
            axios.post(url, data, options).then((res)=>{
                if(res.data.status=="SUCCESS"){
                    if(res.data.token){
                        localStorage.setItem("token",HttpUtil.token = res.data.token);
                    }
                    resolve(res.data);
                }else{
                    reject(res.data);
                }
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
        return new Promise((resolve, reject) => {
            if(!options.headers)options.headers = {}
            options.headers.Authorization = localStorage.getItem("token");;
            axios.delete(url, data, options).then((res)=>{
                if(res.data.status=="SUCCESS"){
                    if(res.data.token){
                        localStorage.setItem("token",HttpUtil.token = res.data.token);
                    }
                    resolve(res.data);
                }else{
                    reject(res.data);
                }
            })
        })


    }

    /**
     * 利用 Promise 的 post 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static put(url, data,options={}) {
        return new Promise((resolve, reject) => {
            if(!options.headers)options.headers = {}
            options.headers.Authorization = localStorage.getItem("token");;
            axios.put(url, data, options).then((res) => {
                if (res.data.status == "SUCCESS") {
                    if(res.data.token){
                        localStorage.setItem("token",HttpUtil.token = res.data.token);
                    }
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
        })
    }
}
