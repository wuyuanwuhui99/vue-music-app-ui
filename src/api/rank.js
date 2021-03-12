import {commonParams} from './config'
import HttpUtil from "@/utils/HttpUtil";

export function getTopList(){
	const data = {...commonParams,...{
	    uin: 0,
	    needNewCode: 1,
	    platform: 'h5'
	}};
	return HttpUtil.get("/service/music/getTopList/", {params:data})
}

export function getMusicList(topid) {
  	const data = {...commonParams, ...{
	    topid,
	    needNewCode: 1,
	    uin: 0,
	    tpl: 3,
	    page: 'detail',
	    type: 'top',
	    platform: 'h5'
	}}
  	return HttpUtil.get("/service/music/getMusicList/", {params:data})
}

