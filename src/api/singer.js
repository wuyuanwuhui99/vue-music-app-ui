import {commonParams} from './config';
import HttpUtil from "@/utils/HttpUtil";
export function getSingerList(){
	return HttpUtil.get("/service/music/getSingerList/")
}

export function getSingerDetail(singermid) {
	return HttpUtil.get("/service/music/getSingerDetail/",{
		params:{singermid}
	})  
}


