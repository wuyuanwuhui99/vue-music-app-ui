import {commonParams} from './config'
import store from '@/store';
import HttpUtil from "@/utils/HttpUtil";

export const getLyric=(songmid)=> {
  return HttpUtil.get('/service/music/getLyric/', {
    params: {songmid}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export const addFavorite=(params)=>{
  return HttpUtil.post("/service/music-getway/addFavorite/",{...params,userId:store.state.userData.userId,lyric:encodeURIComponent(params.lyric)});
}

export const deleteFavorite=(params)=>{
  return HttpUtil.post("/service/music-getway/deleteFavorite/",{...params,userId:store.state.userData.userId});
}

export const getFavorite=(userId)=>{
  return HttpUtil.get("/service/music-getway/getFavorite/",{params:{userId}})
}

//查询是否已经收藏了该歌曲
export const queryFavorite=(params)=>{
  return HttpUtil.get("/service/music-getway/queryFavorite/",{params})
}

//记录播放次数
export const setRecord=(item)=>{
  return HttpUtil.post("/service/music/record/",item)
}

