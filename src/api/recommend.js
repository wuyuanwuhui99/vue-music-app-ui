import HttpUtil from "@/utils/HttpUtil";

export const getRecommend = () => {
    return HttpUtil.get("/service/music/getRecommend/")
}

export const getDiscList = () => {
    const url = '/service/music/getDiscList/';
    return HttpUtil.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

export const getSongList = (disstid) => {
    const url = '/service/music/getSongList/';
    return HttpUtil.get(url, {
        params: {disstid}
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
