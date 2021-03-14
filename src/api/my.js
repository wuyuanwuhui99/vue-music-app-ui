import HttpUtil from "@/utils/HttpUtil";

export const updateUser = (userData) => {
    return HttpUtil.put("/service/music/updateUser/", userData)
}

export const updatePassword = (userData) => {
    return HttpUtil.put("/service/music/updatePassword/", userData)
}

export const logout = () => {
    return HttpUtil.get("/service/music/logout/")
}

export const uploadImg = (formData,headers)=>{
    return HttpUtil.post("/service/music/upload",formData,headers)
}
