import HttpUtil from "@/utils/HttpUtil";

export const doLogin = (params) => {
    return HttpUtil.post("/service/music/login/", params)
}

export const register = (params) => {
    return HttpUtil.post("/service/music/register/", params)
}

export const getUserData = () => {
    return HttpUtil.get("/service/music/getUserData/");
}
