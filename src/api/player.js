import {commonParams} from './config'
import HttpUtil from "@/utils/HttpUtil";

export const getAudioUrl=(currentSong,filename) =>{
    let data  = {
        songmid:currentSong.mid,
        filename:filename
    }
  	return HttpUtil.get("service/music/getAudioUrl/", {params:data})
}

export const getSingleSong=(songmid)=> {
    return HttpUtil.get("/service/music/getSingleSong/", {params:{songmid}})
}

