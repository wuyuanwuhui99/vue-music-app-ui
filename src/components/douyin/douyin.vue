<template>
  	<transition name="slide">
    	<div class="douyin">
	      	<div class="list-wrapper" ref="listWrapper">
	        	<scroll ref="douyinList" class="list-scroll" :data="douyinList">
	          		<div class="list-inner">
	            		<song-list :songs="douyinList" @select="selectSong"></song-list>
	          		</div>
	        	</scroll>
				<div v-show="showLoading" class="loading-container">
					<loading></loading>
				</div>
	      	</div>
	    </div>
  	</transition>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import SongList from 'base/song-list/song-list'
	import Song from 'common/js/song'
	import loading from "base/loading/loading"
    import {getDouyinList} from "api/douyin"
	import {mapGetters, mapActions} from 'vuex'
	import {playlistMixin} from 'common/js/mixin'

  	export default {
    	mixins: [playlistMixin],
    	data() {
      		return {
				douyinList:[],
				hasCommit:false,
				showLoading:false,   
      		}
    	},
    	methods: {
	      	handlePlaylist(playlist) {
	       		const bottom = playlist.length > 0 ? '60px' : ''
	        	this.$refs.listWrapper.style.bottom = bottom
	        	this.$refs.douyinList && this.$refs.douyinList.refresh()
	        	this.$refs.playList && this.$refs.playList.refresh()
	      	},
	      	selectSong(song,index) {
				if(!this.hasCommit){
					this.orderPlay({//随机播放
						list:this.douyinList,
						index
					});
					this.hasCommit = true;
				}
	        	this.insertSong({song:new Song(song),index})
	      	},
	      	random() {
	        	let list = this.douyinList;
	        	if (list.length === 0) {
	          		return
	        	}
	        	list = list.map((song) => {
	          		return new Song(song)
	        	})
	        	
	      	},
	      	...mapActions([
                'insertSong',
				"randomPlay",//随机播放
				"orderPlay"//顺序播放
			])
			  
	    },
    	components: {
      		Scroll,
			SongList,
			loading
        },

        mounted() {
			this.showLoading = true;
            getDouyinList().then((result)=>{
				this.showLoading = false;
				this.douyinList = result.data.data;
            });
            this.$nextTick(()=>{
                this.handlePlaylist(this.douyinList);
            });
        },
  	}
</script>

<style scoped lang="less">
@import "~common/less/variable.less";

.douyin {
  position: fixed;
  top: 88px;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: @color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .list-wrapper {
    width: 100%;
    height: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
	}
	.loading-container {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
  }
}

</style>
