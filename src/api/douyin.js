import axios from "axios";
import HttpUtil from "@/utils/HttpUtil";
//获取抖音歌曲列表
export const getDouyinList = () => {
    return HttpUtil.get("/service/music/getDouyinList/")
}
