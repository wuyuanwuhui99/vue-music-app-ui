<template>
  <div id="app" ref="app">
    <m-header v-show="!showLogin"></m-header>
    <tab v-show="!showLogin"></tab>
    <Login v-show="showLogin"></Login>
    <keep-alive>
      <router-view v-show="!showLogin"></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
	import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';
  import Login from 'components/login/login';
  import Player from 'components/player/player';
  import {mapGetters,mapActions} from "vuex";
  import {getUserData} from "api/login"
	export default {
    components: {
      MHeader,
      Tab,
      Player,
      Login
    },
    computed:{
      ...mapGetters(["showLogin"])
    },
    methods:{
      ...mapActions(["setUserData"])
    },
    created(){
      getUserData().then((result)=>{
        this.setUserData(result.data.data)
      })
      
    },

    mounted(){
    }
  }
</script>

<style lang="less">
@import "common/less/variable.less";

body,html{
  font-size:12px;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%; 
}

#app {
  color: @color-theme;
  width: 100%;
  height: 100%;
}

</style>
