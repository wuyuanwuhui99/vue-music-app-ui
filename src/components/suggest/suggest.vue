<template>
  	<Scroll ref="suggest" class="suggest" 
  		:data="result" 
  		:pullup="pullup" 
  		@scrollToEnd="searchMore"
        @beforeScroll="listScroll"
  	>
    	<ul class="suggest-list">
      		<li class="suggest-item" @click="selectItem(item)" v-for="item in result">
        		<div class="icon">
          			<i :class="getIconCls(item)"></i>
        		</div>
        		<div class="name">
          			<p class="text" v-html="getDisplayName(item)"></p>
        		</div>
      		</li>
      		<loading v-show="hasMore" title=""></loading>
    	</ul>
    	<div v-show="!hasMore && !result.length" class="no-result-wrapper">
      		<no-result title="抱歉，暂无搜索结果"></no-result>
    	</div>
  	</Scroll>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import NoResult from 'base/no-result/no-result'
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {createSong,filterSinger} from 'common/js/song'
	import {mapMutations, mapActions} from 'vuex'
	import Singer from 'common/js/singer'

  	const TYPE_SINGER = 'singer'
  	const perpage = 20

  	export default {
	    props: {
	      	showSinger: {
	        	type: Boolean,
	        	default: true
	      	},
	      	query: {
	        	type: String,
	        	default: ''
	      	}
	    },
	    data() {
	      	return {
	        	page: 1,
	        	pullup: true,
	        	beforeScroll: true,
	        	hasMore: true,
	        	result: []
	      	}
	    },
	    methods: {
	      	refresh() {
	        	this.$refs.suggest.refresh()
	      	},
	      	search() {
	        	this.page = 1
	        	this.hasMore = true
	        	this.$refs.suggest.scrollTo(0, 0)
	        	search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    this.result = this._genResult(res.data);
                    this._checkMore(res.data)
		        })
	      	},
	      	searchMore() {
		        if (!this.hasMore) {
		          return
		        }
	        	this.page++
	       	 	search(this.query, this.page, this.showSinger, perpage).then((res) => {
	          		if (res.data.code === ERR_OK) {
	            		this.result = this.result.concat(this._genResult(res.data.data))
	            		this._checkMore(res.data.data)
	          		}
	        	})
	      	},
	      	listScroll() {
	        	this.$emit('listScroll')
	      	},
	      	selectItem(item) {
	        	if (item.type === TYPE_SINGER) {
	          		const singer = new Singer({
		            	id: item.singermid || item.zhida_singer.singerMID,
		            	name: item.singername || item.zhida_singer.singerName
		          	})
		          	this.$router.push({
		            	path: `/search/${singer.id}`
		          	})
	          		this.setSinger(singer)
	        	} else {
	          		this.insertSong({song:item})
				}
	        	this.$emit('select', item);
	      	},
	      	getDisplayName(item) {
	        	if (item.type === TYPE_SINGER) {
	          		return item.singername || item.zhida_singer.singerName
	        	} else {
	          		return `${item.name}-${item.singer}`
	        	}
	      	},
	      	getIconCls(item) {
	        	if (item.type === TYPE_SINGER) {
	          		return 'icon-mine'
	        	} else {
	          		return 'icon-music'
	        	}
	      	},
	      	_genResult(data) {
	        	let ret = [];
	        	if (data.zhida && (data.zhida.singerid || data.zhida.zhida_singer && data.zhida.zhida_singer.singerID)) {
	          		ret.push({...data.zhida, ...{type: TYPE_SINGER}})
	        	}
	        	if (data.song) {
	          		ret = ret.concat(this._normalizeSongs(data.song.list))
	        	}
	        	return ret
	      	},
	      	_normalizeSongs(list) {
	        	let ret = []
	        	list.forEach((musicData) => {
	          		if (musicData.id && musicData.album.id) {
	            		ret.push(createSong(musicData))
	          		}
	        	})
	        	return ret
	      	},
	      	_checkMore(data) {
	        	const song = data.song
	        	if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
	          		this.hasMore = false
	        	}
	      	},
	      	...mapMutations({
	        	setSinger: 'SET_SINGER'
	      	}),
	      	...mapActions([
	        	'insertSong'
	      	])
	    },
	    watch: {
	      	query(newQuery) {
	        	this.search(newQuery)
	      	}
	    },
	    components: {
	      	Scroll,
	      	Loading,
	      	NoResult
	    }
	}
</script>

<style scoped lang="less">
@import "~common/less/variable.less";
@import "~common/less/mixin.less";

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: @color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: @font-size-medium;
      color: @color-text-d;
      overflow: hidden;
      .text {
        .no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
