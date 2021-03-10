<template>
	<div class="song-list">
		<ul>
			<li @click="selectItem(song,index)" class="item" v-for="(song, index) in songs">
				<div class="rank" v-show="rank">
					<span :class="getRankCls(index)">{{getRankText(index)}}</span>
				</div>
				<img class="avatar" v-lazy="song.localImage || 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+song.albummid+'.jpg?max_age=2592000'"/>
				<div class="content">
          			<h2 class="name">{{song.name}}</h2>
          			<p class="desc">{{getDesc(song)}}</p>
        		</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from "vuex";
  	export default {
	    props: {
	      songs: {
	        type: Array,
	        default: []
	      },
	      rank: {
	        type: Boolean,
	        default: false
		  },
		},
		computed:{
			...mapGetters(["userData"])
		},
	    methods: {
	      	selectItem(item, index) {
	        	this.$emit('select', item, index)
	      	},
	      	getDesc(song) {
				if(song.album){
					return `${song.singer}·${song.album}`
				}else{
					return `${song.singer}`
				}
	      	},
	      	getRankCls(index) {
		      	if (index <= 2) {
		        	return `icon icon${index}`
		      	} else {
		        	return 'text'
		      	}
	      	},
	      	getRankText(index) {
	      		if (index > 2) {
	        		return index + 1
	      		}
	      	}
	    },
	    mounted:function(){
	    	
	    }
  	}
</script>

<style scoped lang="less">
@import "~common/less/variable.less";
@import "~common/less/mixin.less";

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: @font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          .bg-image('first');
        }
        &.icon1 {
          .bg-image('second');
        }
        &.icon2 {
          .bg-image('third');
        }
      }
      .text {
        color: @color-theme;
        font-size: @font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        .no-wrap();
        color: @color-text;
      }
      .desc {
        .no-wrap();
        margin-top: 4px;
        color: @color-text-d;
      }
	}
	.avatar{
		width:50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 20px;
	}
  }
}

</style>
