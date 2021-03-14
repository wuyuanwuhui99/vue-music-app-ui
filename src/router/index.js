import Vue from 'vue'
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
	routes: [
	    {
			path: '/',
			redirect: '/douyin'
		},
		{
			path: '/recommend',
			component: resolve=>(require(["components/recommend/recommend"],resolve)),
			children: [{
				path: ':id',
				component: resolve=>(require(["components/disc/disc"],resolve))
			}]
		},
		{
			path: '/singer',
			component: resolve=>(require(["components/singer/singer"],resolve)),
			children: [{
				path: ':id',
				component: resolve=>(require(["components/singer-detail/singer-detail"],resolve))
			}]
		},
		{
			path: '/rank',
			component:  resolve=>(require(["components/rank/rank"],resolve)),
		    children: [
		      	{
		       		path: ':id',
		        	component: resolve=>(require(["components/top-list/top-list"],resolve))
		      	}
		    ]
		},
		{
			path: '/search',
			component: resolve=>(require(["components/search/search"],resolve)),
		    children: [
		      {
		        path: ':id',
		        component: resolve=>(require(["components/singer-detail/singer-detail"],resolve))
		      }
		    ]
		},
		{
		    path: '/user',
		    component: resolve=>(require(["components/user-center/user-center"],resolve))
		},
		{
		    path: '/douyin',
		    component: resolve=>(require(["components/douyin/douyin"],resolve))
		},
        {
            path: '/my',
            component: resolve=>(require(["components/my/my"],resolve))
        }
	]
})
