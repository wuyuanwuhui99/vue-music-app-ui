import axios from "axios";

export default class HttpUtil {

    /**
     * 利用 Promise 的 get 方式请求
     * @param url
     * @returns {Promise}
     */
    static get(url,config={}) {
        return new Promise((resolve, reject) => {
            axios.get(url,config).then((res)=>{
                if(res.data.status=="success"){
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
            axios.post(url, data, options).then((res)=>{
                if(res.data.status=="success"){
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
            axios.delete(url, data, options).then((res)=>{
                if(res.data.status=="success"){
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
            axios.put(url, data, options).then((res) => {
                if (res.data.status == "success") {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
        })
    }
}
