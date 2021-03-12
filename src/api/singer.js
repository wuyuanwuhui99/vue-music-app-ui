import {commonParams} from './config';
import HttpUtil from "@/utils/HttpUtil";
export function getSingerList(){
	const data = Object.assign({}, commonParams, {
	    channel: 'singer',
	    page: 'list',
	    key: 'all_all_all',
	    pagesize: 100,
	    pagenum: 1,
	    hostUin: 0,
	    needNewCode: 0,
		platform: 'yqq',
	})
	return HttpUtil.get("/service/music/getSingerList/",{
		params:data
	})
}

export function getSingerDetail(singerId) {
	const data = Object.assign({}, commonParams, {
	    hostUin: 0,
	    needNewCode: 0,
	    platform: 'yqq',
	    order: 'listen',
	    begin: 0,
	    num: 80,
	    songstatus: 1,
		singermid: singerId,
	})

	return HttpUtil.get("/service/music/getSingerDetail/",{
		params:data
	})  
}


