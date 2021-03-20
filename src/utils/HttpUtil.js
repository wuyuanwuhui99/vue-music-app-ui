import axios from "axios";

export default class HttpUtil {

    static token = "";

    static getToken(){
        if(!this.token)this.token = localStorage.getItem("token")
        return this.token;
    };

    /**
     * 利用 Promise 的 get 方式请求
     * @param url
     * @returns {Promise}
     */
    static get(url,options={}) {
        return new Promise((resolve, reject) => {
            if(!options.headers)options.headers = {}
            options.headers.Authorization = this.getToken();
            axios.get(url,options).then((res)=>{
                if(res.data.status=="SUCCESS"){
                    if(res.data.token){
                        this.token = res.data.token;
                        localStorage.getItem("token")
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
            options.headers.Authorization = this.getToken();
            axios.post(url, data, options).then((res)=>{
                if(res.data.status=="SUCCESS"){
                    if(res.data.token){
                        this.token = res.data.token;
                        localStorage.getItem("token")
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
            options.headers.Authorization = this.getToken();
            axios.delete(url, data, options).then((res)=>{
                if(res.data.status=="SUCCESS"){
                    if(res.data.token){
                        this.token = res.data.token;
                        localStorage.getItem("token")
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
            options.headers.Authorization = this.getToken();
            axios.put(url, data, options).then((res) => {
                if (res.data.status == "SUCCESS") {
                    if(res.data.token){
                        this.token = res.data.token;
                        localStorage.getItem("token")
                    }
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            })
        })
    }
}
