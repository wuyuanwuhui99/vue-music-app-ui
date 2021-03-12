import {commonParams} from './config';
import HttpUtil from "@/utils/HttpUtil";
export function getRecommend() {
	const data={...commonParams, ...{
	    platform: 'h5',
	    uin: 0,
	    needNewCode: 1
	}}
	return HttpUtil.get("/service/music/getRecommend/", {params:data})
}

export function getDiscList() {
	const url='/service/music/getDiscList/';
	const data={...commonParams,...{
		platform: 'yqq',
	    hostUin: 0,
	    sin: 0,
	    ein: 29,
	    sortId: 5,
	    needNewCode: 0,
	    categoryId: 10000000,
	    rnd: Math.random(),
	    format: 'json'
	}};
	return HttpUtil.get(url,{
		params:data	
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function getSongList(disstid) {
	const url='/service/music/getSongList/';
	const data = {...commonParams, ...{
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		disstid,
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		platform:"yqq",
		needNewCode:0,
	}};
	return HttpUtil.get(url,{
		params:data	
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}
