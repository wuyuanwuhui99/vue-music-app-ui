import {commonParams} from './config'
import HttpUtil from "@/utils/HttpUtil";
export function getHotKey() {
  	const data = {...commonParams,... {
    	uin: 0,
    	needNewCode: 1,
		platform: 'h5',
  	}};

  	return HttpUtil.get("service/music/getHotKey/",{params:data});
}


export function search(query, page, zhida, perpage) {
	const data = Object.assign({}, commonParams, {
	    ct:24,
		qqmusic_ver:1298,
		new_json:1,
		remoteplace:"txt.yqq.center",
		searchid:37276201631470542,
		t:0,
		aggr:1,
		cr:1,
		catZhida:zhida ? 1 : 0,
		lossless:0,
		flag_qc:0,
		p:page,
		n:perpage,
		w: query,
		loginUin:0,
		hostUin:0,
		notice:0,
		platform:"yqq",
		needNewCode:1,
	})

	return HttpUtil.get("/service/music/search/", {params:data})
}
