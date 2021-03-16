**在线音乐播放器**

**作者：吴怨吴悔**



================================界面预览================================
![整体app预览](https://raw.githubusercontent.com/wuyuanwuhui99/vue_music/main/music.jpg)
![手机端预览效果图1](https://raw.githubusercontent.com/wuyuanwuhui99/vue_music/main/music_01.jpg)
![手机端预览效果图3](https://raw.githubusercontent.com/wuyuanwuhui99/vue_music/main/music_02.jpg)
![手机端预览效果图3](https://raw.githubusercontent.com/wuyuanwuhui99/vue_music/main/music_03.jpg)
================================界面预览================================



开发时间：2017-12

完成时间：2018-01


**使用插件和版本：**

axios: 0.18.0 ——网络请求

better-scroll: 1.9.1 ——滚动懒加载

create-keyframe-animation: 0.1.0 ——css动画

css-loader: 0.28.11 ——css加载器

fastclick: 1.0.6  ——移动端点击方法

less: 3.9.0 ——less样式

less-loader: 5.0.0 ——less加载器

lyric-parser: 1.0.1  ——歌词解析

md5: 2.2.1  ——md5密码加密

vue: 2.5.2 ——vue基础版本

vue-router: 3.0.1 ——vue路由

vuex: 3.0.1 ——vuex状态管理器

**nginx配置如下**

    upstream music_server{
        server 127.0.0.1:3000 weight=10;
        server 127.0.0.1:3001 weight=10;
    }

    server{
        listen       3002;
        #静态资源，包括系统所需要的图片，js、css等静态资源
        location / {
            alias E:/vue/mymusic/dist/;
        }
        location /service/ {
            proxy_pass http://music_server;
            #proxy_pass 127.0.0.1:3000;
        }
        location /static/ {
            alias E:/static/;
        }
        location /images/ {
            alias E:/static/music/images/;
        }
        location /audio/ {
            alias E:/static/music/audio/;
        }
    }
