import HttpUtil from "@/utils/HttpUtil";
export function getHotKey() {
  	return HttpUtil.get("service/music/getHotKey/");
}


export function search(query, page, zhida, perpage) {
	const data = {
        catZhida:zhida ? 1 : 0,
        p:page,
        n:perpage,
        w: query,
    }

	return HttpUtil.get("/service/music/search/", {params:data})
}
