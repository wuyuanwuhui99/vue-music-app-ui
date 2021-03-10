import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import "common/less/reset.less"
import "common/less/base.less"
import "common/less/icon.less"
// import 'common/less/index.less'
import VueLazyload from 'vue-lazyload'
import store from './store';
//console.log("test")

// import axios from "axios";
// axios.post("/service/music/login",{
//   userId:"public",
//   password:"123456"
// }).then((res)=>{
//   console.log(res.data);
// })

fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
//=>
// 是ES6的箭头语法
new Vue({
  el:'#app',
  router,
	store,
  render:h=>h(App)
  
})