<template>
  <div class="m-header">
    <div class="icon" :style="{'background-image':userData.avater?'url('+userData.avater+')':''}"></div>
    <h1 class="text">{{userData.username}}</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  export default {
    computed:{
      ...mapGetters(["userData"])
    }
  }
</script>

<style scoped lang="less">
@import "~common/less/variable.less";
@import "~common/less/mixin.less";

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: @color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 32px;
    height: 32px;
    margin-right: 9px;
    border-radius:50%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: @font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: @color-theme;
    }
  }
}

</style>
