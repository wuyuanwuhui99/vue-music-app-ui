import HttpUtil from "@/utils/HttpUtil";

export function getTopList(){
	return HttpUtil.get("/service/music/getTopList/")
}

export function getMusicList(topid) {
  	return HttpUtil.get("/service/music/getMusicList/", {params:{topid}})
}

