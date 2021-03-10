import axios from "axios";

//获取抖音歌曲列表
export function getDouyinList(){
    return axios.get("/service/music/getDouyinList/")
}
