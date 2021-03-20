<template>
	<div class="recommend" ref="recommend">
		<Scroll ref="scroll" class="recommend-content" :data="discList">
			<div>
				<div v-if='recommends.length' class="slider-wrapper">
					<Slider>
						<div v-for='item in recommends'>
							<a :href="item.id">
								<img @load="loadImage" class="needsclick" :src="item.cover">
							</a>
						</div>
					</Slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="item in discList" class="item" @click="selectItem(item)">
							<div class="icon">
				                <img width="60" height="60"  v-lazy="item.imgurl">
				            </div>
				            <div class="text">
				                <h2 class="name" v-html="item.creator.name"></h2>
				                <p class="desc" v-html="item.dissname"></p>
				            </div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
		        <loading></loading>
		    </div>
		</Scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import Loading from 'base/loading/loading'
	import Scroll from 'base/scroll/scroll'
	import Slider from 'base/slider/slider';
	import {getRecommend, getDiscList} from 'api/recommend';
	import {playlistMixin} from 'common/js/mixin';
	import {mapMutations} from 'vuex'
    import {getValue} from "common/js/util"
	export default {
		mixins:[playlistMixin],
		components:{
			Slider,Scroll,Loading
		},
		data(){
			return {
				recommends: [],
				discList:[]
			}
		},
		created(){
			this._getRecommend();
			this._getDiscList();
			
		},
		methods:{
			
			selectItem(item){
				this.$router.push({
					path:`/recommend/${item.dissid}`
				})
				this.setDisc(item)
			},
			
			handlePlaylist(playlist) {
				const bottom = playlist.length > 0 ? '60px' : ''
        		this.$refs.recommend.style.bottom = bottom
        		this.$refs.scroll.refresh()
			},
			
			async _getRecommend() {
                let res = await getRecommend();
                let list = getValue(res,["data","focus","data","shelf","v_niche","0","v_card"],[]);
                this.recommends = list;
            },
			
			async _getDiscList() {
                let res = await getDiscList();
                this.discList = res.list;
            },
			
			loadImage(){
				if(!this.checkloaded){
					this.$refs.scroll.refresh();
					this.checkloaded = true
				}
				
			},
			...mapMutations({
	        	setDisc: 'SET_DISC'
	      	})
		}
	}
</script>

<style scoped lang="less">
@import "~common/less/variable.less";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: @font-size-medium;
        color: @color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: @font-size-medium;
          .name {
            margin-bottom: 10px;
            color: @color-text;
          }
          .desc {
            color: @color-text-d;
          }
        }
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
