<template>
    <div class="m-header">
        <img class="avatar" @click="goMyRouter"  :src="userData.avater||require('../../../static/image/icon-avater.svg')"/>
        <h1 class="text" @click="goMyRouter">{{userData.username||'请登录'}}</h1>
        <div class="mine" @click="goUserRouter">
            <i  class="icon-mine"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from "vuex";
    export default {
        computed: {
            ...mapGetters(["userData"])
        },
        methods:{
            goMyRouter(){
                if(!this.userData.userId){
                    this.$router.push("/login")
                }else{
                    this.$router.push("/my");
                }
            },

            goUserRouter(){
                if(!this.userData.userId){
                    this.$router.push("/login");
                }else{
                    this.$router.push("/user");
                }
            }
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

        .avatar {
            display: inline-block;
            vertical-align: top;
            margin-top: 6px;
            width: 32px;
            height: 32px;
            margin-right: 9px;
            border-radius: 50%;
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
