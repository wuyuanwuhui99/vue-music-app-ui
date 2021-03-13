import {commonParams} from './config'
import store from '@/store';
import HttpUtil from "@/utils/HttpUtil";

export function getLyric(songmid) {
  return HttpUtil.get('/service/music/getLyric/', {
    params: {songmid}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addFavorite(params){
  return HttpUtil.post("/service/music/addFavorite/",{...params,userId:store.state.userData.userId,lyric:encodeURIComponent(params.lyric)});
}

export function deleteFavorite(params){
  return HttpUtil.post("/service/music/deleteFavorite/",{...params,userId:store.state.userData.userId});
}

export function getFavorite(userId){
  return HttpUtil.get("/service/music/getFavorite/",{params:{userId}})
}

//查询是否已经收藏了该歌曲
export function queryFavorite(params){
  return HttpUtil.get("/service/music/queryFavorite/",{params})
}

//记录播放次数
export function setRecord(item){
  return HttpUtil.post("/service/music/record/",item)
}

