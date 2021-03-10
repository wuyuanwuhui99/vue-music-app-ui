<template>
	<scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
		<ul>
			<li class="list-group" v-for="group in data" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<uL>
          			<li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            			<img class="avatar" v-lazy="item.avatar">
            			<span class="name">{{item.name}}</span>
          			</li>
        		</uL>
			</li>
		</ul>
		<div class="list-shortcut"  @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
			<ul>
				<li v-for="(item,index) in shortcutList" :class="{current:currentIndex==index}" class="item" :data-index="index">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="list-fixed" ref="fixed" v-show="fixedTitle">
	      	<div class="fixed-title">{{fixedTitle}} </div>
	    </div>
	    <div v-show="!data.length" class="loading-container">
	      	<loading></loading>
	    </div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
  	import Loading from 'base/loading/loading'
  	import {getData} from 'common/js/dom'
  	const TITLE_HEIGHT = 30
 	const ANCHOR_HEIGHT = 18
  	
	export default {
		props: {
	      	data: {
	        	type: Array,
	        	default: []
	      	}
	    },
	    data(){
	    	return {
	    		scrollY:-1,
	    		currentIndex:0,
	    		diff: -1
	    	}
	    },
	    created(){
	    	this.probeType = 3
      		this.listenScroll = true
      		this.touch = {}
      		this.listHeight = []
	    },
	    components:{
	    	Scroll,Loading
	    },
	    computed: {
	    	shortcutList() {
	    		return this.data.map((group)=>{
	    			return group.title.substr(0,1)
	    		})
	    	},
	    	fixedTitle() {
	    		if(this.scrollY>0){
	    			return ""
	    		}
	    		return this.data[this.currentIndex]?this.data[this.currentIndex].title:"";
	    	}
	    },
	    watch: {
	    	data() {
	    		setTimeout(()=>{
	    			this._calculateHeight()
	    		},20)
	    	},
	    	scrollY(newY) {
	    		const listHeight = this.listHeight;
	    		if(newY>0){
	    			this.currentIndex=0;
	    			return 
	    		}
	    		for(let i=0;i<listHeight.length-1;i++){
	    			let height1 = listHeight[i]
          			let height2 = listHeight[i + 1];
          			if (-newY >= height1 && -newY < height2) {
			            this.currentIndex = i;
			            this.diff = height2 + newY
			            return
			        }
	    		}
	    		this.currentIndex=0;
	    	},
	    	diff(newVal) {
	    		let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
	    		if(this.fixedTop == fixedTop) {
	    			return 
	    		}
	    		this.fixedTop=fixedTop;
	    		this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
	    	}
	    	
	    },
	    methods:{
	    	selectItem(item){
	    		this.$emit('select',item)
	    	},
	    	onShortcutTouchStart(e){
	    		let anchorIndex = getData(e.target, 'index');
	    		let firstTouch=e.touches[0];
	    		this.touch.y1=firstTouch.pageY;
	    		this.touch.anchorIndex=anchorIndex;
	    		this._scrollTo(anchorIndex)
	    	},
	    	onShortcutTouchMove(e){
	    		let firstTouch=e.touches(0);
	    		this.touch.y2=firstTouch.pageY;
	    		let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
	    		let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
	    		this._scrollTo(anchorIndex)
	    	},
	    	refresh(){
	    		this.$refs.listview.refresh()
	    	},
	    	scroll(pos){
	    		this.scrollY=pos.y;	
	    	},
	    	_calculateHeight() {
	    		this.listHeight=[];
	    		const list = this.$refs.listGroup;
	    		let height = 0
        		this.listHeight.push(height);
        		for(let i=0;i<list.length;i++){
        			let item = list[i]
          			height += item.clientHeight
          			this.listHeight.push(height);
        		}
	    	},
	    	_scrollTo(index) {
	    		if(!index&&-this.index!==0){
	    			return
	    		}
	    		if(index<0){
	    			index=0
	    		}else if(index>this.listHeight.length-2){
	    			index=this.listHeight.length-2
	    		}
	    		this.scrollY=-this.listHeight[index]
	    	 	this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
	    	}
	    }
	}
</script>

<style scoped lang="less">
  @import "~common/less/variable.less";

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: @color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: @color-text-l;
        font-size: @font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: @color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: @color-text-l;
      font-size: @font-size-small;
      &.current {
        color: @color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>