import axios from "axios";
export function doLogin(params){
    return axios.post("/service/music/login/",params)
}

export function register(params){
    return axios.post("/service/music/register/",params)
}

export function getUserData(){
    return axios.get("/service/music/getUserData/");
}
