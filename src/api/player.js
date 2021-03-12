import {commonParams} from './config'
import HttpUtil from "@/utils/HttpUtil";

export function getAudioUrl(currentSong,filename) {
	const data = {...commonParams, ...{
	    g_tk:5381,
		loginUin:0,
		hostUin:0,
		notice:0,
		platform:"yqq",
		needNewCode:0,
		//cid:currentSong.id,
		cid:"205361747",
		uin:0,
		songmid:currentSong.mid,
		filename:filename,
		guid:"3397254710",
	}}
  	return HttpUtil.get("service/music/getAudioUrl/", {params:data})
}

export function getSingleSong(songmid) {
	// const data = {
    //     "-":"getplaysongvkey"+(Math.random()+"").replace("0.",""),
    //     g_tk:5381,
    //     loginUin:275018723,
    //     hostUin:0,
    //     format:"json",
    //     inCharset:"utf8",
    //     outCharset:"utf-8",
    //     notice:0,
    //     platform:"yqq.json",
    //     needNewCode:0,
    //     data:JSON.stringify({
    //         "req":{
    //             "module":"CDN.SrfCdnDispatchServer",
    //             "method":"GetCdnDispatch",
    //             "param":{
    //                 "guid":"2807659112",
    //                 "calltype":0,
    //                 "userip":""
    //             }
    //         },
    //         "req_0":{
    //             "module":"vkey.GetVkeyServer",
    //             "method":"CgiGetVkey",
    //             "param":{
    //                 "guid":"2807659112",
    //                 "songmid":[songmid],
    //                 "songtype":[0],
    //                 "uin":"275018723",
    //                 "loginflag":1,
    //                 "platform":"20"
    //             }
    //         },
    //         "comm":{
    //             "uin":275018723,
    //             "format":"json",
    //             "ct":24,
    //             "cv":0
    //         }
    //     })
	// }
    //
	// return axios.get("/service/music/getSingleSong/", {params:data})
    return HttpUtil.get("/service/music/getSingleSong/", {params:{mid:songmid}})
}

