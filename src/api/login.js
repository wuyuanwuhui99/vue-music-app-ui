import axios from "axios";
import HttpUtil from "@/utils/HttpUtil";

export function doLogin(params){
    return axios.post("/service/music/login/",params)
}

export function register(params){
    return axios.post("/service/music/register/",params)
}

export function getUserData(){
    return HttpUtil.get("/service/music/getUserData/");
}
