<template>
	<div class="singer" ref="singer">
		<list-view @select="selectSinger" :data="singers" ref="list"></list-view>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getSingerList} from 'api/singer';
	import Singer from 'common/js/singer'
	import {ERR_OK} from 'api/config';
	import listView from 'base/listview/listview';
	import {mapMutations} from 'vuex'
	import {playlistMixin} from 'common/js/mixin'
	
	const HOT_SINGER_LEN = 10;
  	const HOT_NAME = '热门';
	export default {
		mixins:[playlistMixin],
		data(){
			return {
				singers: []
			}
		},
		created(){
			this._getSingerList()
		},
		methods:{
			handlePlaylist(playlist){
				const bottom = playlist.length > 0 ? '60px' : ''
        		this.$refs.singer.style.bottom = bottom
        		this.$refs.list.refresh()
			},
			
			selectSinger(singer){
				this.$router.push({
					path:`/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			async _getSingerList() {
                let res = await getSingerList();
                this.singers = this._normalizeSinger(res.data.list);
            },
			_normalizeSinger(list){
				let map={
					hot:{
						title:HOT_NAME,
						items:[]
					}
				}
				list.forEach((items,index)=>{
					if (index < HOT_SINGER_LEN) {
		            	map.hot.items.push(new Singer({
		              		name: items.Fsinger_name,
		              		id: items.Fsinger_mid
		            	}))
		          	}
		          	const key = items.Findex
		          	if (!map[key]) {
		            	map[key] = {
		              		title: key,
		              		items: []
		            	}
		          	}
		          	map[key].items.push(new Singer({
		            	name: items.Fsinger_name,
		            	id: items.Fsinger_mid
		          	}))
				});
				let ret = []
        		let hot = []
        		for (let key in map) {
		          	let val = map[key]
		          	if (val.title.match(/[a-zA-Z]/)) {
		            	ret.push(val)
		          	} else if (val.title === HOT_NAME) {
		            	hot.push(val)
		          	}
		        }
        		ret.sort((a, b) => {
		          	return a.title.charCodeAt(0) - b.title.charCodeAt(0)
		        })
        		
        		return hot.concat(ret)
			},
			...mapMutations({
	        	setSinger: 'SET_SINGER'
	      	})
		},
		components:{
			listView
		}
	}
</script>

<style scoped lang="less">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}

</style>
