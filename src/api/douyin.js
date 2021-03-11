import axios from "axios";
import HttpUtil from "@/utils/HttpUtil";
//获取抖音歌曲列表
export function getDouyinList(){
    return HttpUtil.get("/service/music/getDouyinList/")
}
