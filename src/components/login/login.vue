<template>
    <transition name="fade">
        <div class="login-wrapper">
            <div class="login-bg"></div>
            <div class="login-content">
                <ul class="tab-wrapper">
                    <li class="tab-item" :class="{active:currentIndex == 0}" @click="tab(0)">登录</li>
                    <li class="tab-item" :class="{active:currentIndex == 1}" @click="tab(1)">注册</li>
                </ul>
                <ul class="form-wrapper">
                    <li class="form-item" v-show="currentIndex == 0">
                        <form autocomplete="off">
                            <ul class="login-form">
                                <li class="login-item">
                                    <span class="icon-login icon-user"></span>
                                    <input
                                        class="login-input input-userId"
                                        placeholder="请输入用户名"
                                        v-model="loginParams.userId"
                                        type="text"
                                        name="userId"
                                    />
                                </li>
                                <li class="login-item">
                                    <span class="icon-login icon-password"></span>
                                    <input
                                        class="login-input input-password"
                                        placeholder="请输入密码"
                                        v-model="loginParams.password"
                                        type="password"
                                        name="password"
                                        :readonly="loginParams.readonly"
                                        @blur="setReadonly('loginParams',true,$event)"
                                        @click="setReadonly('loginParams',false,$event)"
                                    />
                                </li>
                            </ul>
                        </form>
                    </li>
                    <li class="form-item" v-show="currentIndex == 1">
                        <form autocomplete="off">
                            <ul class="login-form">
                                <li class="login-item">
                                    <span class="icon-login icon-user"></span>
                                    <input
                                        class="login-input input-userId"
                                        placeholder="请输入用户名"
                                        type="text"
                                        v-model="registerParams.userId"
                                    />
                                </li>
                                <li class="login-item">
                                    <span class="icon-login icon-password"></span>
                                    <input
                                        class="login-input input-password"
                                        placeholder="请输入密码"
                                        type="password"
                                        v-model="registerParams.password"
                                        @blur="setReadonly('registerParams',true,$event)"
                                        @click="setReadonly('registerParams',false,$event)"
                                    />
                                </li>
                                <li class="login-item">
                                    <span class="icon-login icon-telephone"></span>
                                    <input
                                        class="login-input input-telephone"
                                        placeholder="请输入手机号码"
                                        type="text"
                                        v-model="registerParams.telephone"
                                    />
                                </li>
                                <li class="login-item">
                                    <span class="icon-login icon-email"></span>
                                    <input
                                        class="login-input input-email"
                                        placeholder="请输入邮箱"
                                        type="text"
                                        v-model="registerParams.email"
                                    />
                                </li>
                            </ul>
                        </form>
                        
                    </li>
                </ul>

                <ul class="btn-wrapper">
                    <li class="btn-item" v-show="currentIndex == 0" @click="doLogin">登录</li>
                    <li class="btn-item" v-show="currentIndex == 1" @click="register">注册</li>
                </ul>
            </div>

            <Toast v-model="showTip">{{tipContent}}</Toast>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { doLogin, register } from "api/login";
import md5 from "md5";
import Toast from "base/toast/toast";
export default {
    components: {
        Toast
    },
    data() {
        return {
            currentIndex: 0,
            loginParams: {
                userId: "吴时吴刻",
                password: "123456",
                readonly:true
            },
            registerParams:{
                userId: "",
                password: "",
                telephone:"",
                email:"",
                readonly:true
            },
            showTip: false,
            tipContent: "",
            readonly:true
        };
    },
    computed: {
        ...mapGetters(["showLogin"])
    },

    methods: {
        ...mapActions(["setShowLogin", "setUserData"]),

        setReadonly(type,flag,event){
            if(!flag){//获取焦点
                this[type].passwordInput = false;
                this.$nextTick(()=>{
                    event.target.focus();
                })
            }else{
                this[type].passwordInput = true;
            }
            
        },

        tab(index) {
            this.currentIndex = index;
        },

        doLogin() {
            if (!this.loginParams.userId) {
                this.showTip = true;
                this.tipContent = "请输入用户名";
                return;
            } else if (!this.loginParams.password) {
                this.showTip = true;
                this.tipContent = "请输入密码";
                return;
            }
            var password = md5(md5(this.loginParams.password).substr(4,7)+md5(this.loginParams.password));   
            doLogin({...this.loginParams,password}).then(result => {
                this.showTip = true;
                this.tipContent = "登录成功";
                setTimeout(() => {
                    this.setUserData(result.data);
                    this.setShowLogin(false);
                }, 2000);
            });
        },

        register(){
            if(!this.registerParams.userId){
                this.showTip = true;
                this.tipContent = "请输入用户名";
            }else if(!this.registerParams.password){
                this.showTip = true;
                this.tipContent = "请输入密码";
            }else if(!this.registerParams.telephone){
                this.showTip = true;
                this.tipContent = "请输入电话号码";
            }else if(!this.registerParams.email){
                this.showTip = true;
                this.tipContent = "请输入邮箱";
            }else {
                var password = md5(md5(this.registerParams.password).substr(4,7)+md5(this.registerParams.password));   
                register({...this.registerParams,password}).then((result)=>{
                    this.showTip = true;
                    this.tipContent = "注册成功";
                    setTimeout(() => {
                        this.setUserData(result.data);
                        this.setShowLogin(false);
                    }, 2000);
                }).catch((error)=>{
                    this.showTip = true;
                    this.tipContent = "账号已存在";
                })
            }        
        }
    },

    mounted(){
        setTimeout(()=>{
            this.readonly = false;
        },1000)
    }
};
</script>

<style lang="less" scoped>
// @import "icon.css";
@import "~common/less/variable.less";
@import "~common/less/icon-login.less";
.fade-enter-active,.fade-leave-active{
    transition: all 1s;
    transform: translate3d(0, 0, 0);
}
.fade-enter, .fade-leave-to {
    transition: all 0.5s;
    transform: translate3d(-100%, 0, 0);
}

.login-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 666;
    top: 0;
    left: 0;

    .login-bg {
        background: url(./loginbg.jpg) no-repeat;
        background-size: cover;
        filter: blur(20px);
        width: 100%;
        height: 100%;
        position: relative;
    }
    .login-content {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        .tab-wrapper {
            margin-top: 30%;
            width: 80%;
            margin-left: 10%;
            .tab-item {
                line-height: 30px;
                list-style: none;
                float: left;
                width: 45%;
                text-align: center;
                color: @color-text-l;
                font-size: @font-size-medium-x;
                cursor: pointer;
                position: relative;
                &.active {
                    color: @color-theme;
                    &::after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        width: 60%;
                        left: 20%;
                        height: 2px;
                        background: @color-theme;
                        transition: all 1s easy;
                    }
                }
                &:last-child {
                    margin-left: 10%;
                }
            }
        }
        .form-wrapper {
            margin-top: 20px;
            margin-left: 15%;
            width: 70%;
            float: left;
            .form-item {
                .login-form {
                    .login-item {
                        height: 30px;
                        margin-top: 40px;
                        .icon-login {
                            width: 30px;
                            height: 30px;
                            float: left;
                            text-align: center;
                            line-height: 30px;
                            font-size: 28px;
                            color: @color-text-l;
                        }
                        .login-input {
                            width: calc(100% - 30px);
                            float: left;
                            background: transparent;
                            height: 30px;
                            border-bottom: 1px solid @color-text-l;
                            outline: none;
                            color: rgba(255, 255, 255, 0.5);
                            font-size: @font-size-medium-x;
                            &::-webkit-input-placeholder {
                                color: @color-text-l;
                                font-size: @font-size-medium;
                            }
                            &::-moz-placeholder {
                                color: @color-text-l;
                                font-size: @font-size-medium;
                            }
                            &:-moz-placeholder {
                                color: @color-text-l;
                                font-size: @font-size-medium;
                            }
                            &:-ms-input-placeholder {
                                color: @color-text-l;
                                font-size: @font-size-medium;
                            }
                            &:-webkit-autofill { 
                                box-shadow: 0 0 0px 1000px transparent inset;
                            }
                        }
                    }
                }
            }
        }
        .btn-wrapper {
            width: 70%;
            float: left;
            margin-left: 15%;
            margin-top: 40px;
            .btn-item {
                height: 40px;
                width: 100%;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 20px;
                text-align: center;
                line-height: 40px;
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }
}
</style>
