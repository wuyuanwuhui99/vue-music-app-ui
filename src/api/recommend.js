import {commonParams} from './config';
import HttpUtil from "@/utils/HttpUtil";
export function getRecommend() {
	return HttpUtil.get("/service/music/getRecommend/")
}

export function getDiscList() {
	const url='/service/music/getDiscList/';
	return HttpUtil.get(url).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function getSongList(disstid) {
	const url='/service/music/getSongList/';
	return HttpUtil.get(url,{
		params:{disstid}
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}
