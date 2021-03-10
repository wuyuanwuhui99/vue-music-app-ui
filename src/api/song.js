import {commonParams} from './config'
import axios from 'axios'
import store from '@/store';
export function getLyric(mid) {
  const data = {...commonParams, ...{
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  }}

  return axios.get('/service/music/lyric/', {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addFavorite(params){
  return axios.post("/service/music/addFavorite/",{...params,userId:store.state.userData.userId,lyric:encodeURIComponent(params.lyric)});
}

export function deleteFavorite(params){
  return axios.post("/service/music/deleteFavorite/",{...params,userId:store.state.userData.userId});
}

export function getFavorite(userId){
  return axios.get("/service/music/getFavorite/",{params:{userId}})
}

//查询是否已经收藏了该歌曲
export function queryFavorite(params){
  return axios.get("/service/music/queryFavorite/",{params})
}

//记录播放次数
export function setRecord(item){
  return axios.post("/service/music/record/",item)
}

