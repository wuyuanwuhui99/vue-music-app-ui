<template>
    <transition name="slide">
        <div id="my-wrapper">
            <i class="icon-back" @click="$router.back()"></i>
            <div id="avater-wrapper">
                <div id="avater-box" @click="checkFile">
                    <img id="avater-img" :src="myUserData.avater">
                </div>
                <div id="username">{{myUserData.username}}</div>
            </div>
            <ul id="user-form">
                <li  class="login-item">
                    <span class="icon-login icon-user"></span>
                    <input v-model="myUserData.username"  placeholder="请输入用户名" type="text" class="login-input input-userId">
                </li>
                <li class="login-item">
                    <span  class="icon-login icon-telephone"></span>
                    <input v-model="myUserData.telephone" placeholder="请输入手机号码" type="text" class="login-input input-telephone">
                </li>
                <li class="login-item">
                    <span class="icon-login icon-email"></span>
                    <input v-model="myUserData.email" placeholder="请输入邮箱" type="text" class="login-input input-email">
                </li>
                <li class="login-item">
                    <span class="icon-login icon-date"></span>
                    <input v-model="myUserData.birthday" placeholder="请输入出生年月日" type="text" class="login-input input-email">
                </li>
                <li class="login-item">
                    <span class="icon-login icon-sex"></span>
                    <input v-model="myUserData.sex" placeholder="请选择性别" type="text" class="login-input input-email">
                </li>
            </ul>
            <ul id="btn-wrapper">
                <li class="btn btn-save" @click="save">保存</li>
                <li class="btn btn-logout" @click="logout">退出登陆</li>
            </ul>
            <Toast v-model="showTip">{{tipContent}}</Toast>

            <input type="file" ref="fileInput" id="file" @change="_uploadImg" hidden="true"/>
        </div>
    </transition>

</template>

<script>
    import {updateUser,updatePassword,logout,uploadImg} from "@/api/my";
    import {mapGetters,mapActions} from "vuex";
    import Toast from "base/toast/toast";
    export default {
        name: "my",
        computed:{
            ...mapGetters(["userData"])
        },
        components:{Toast},
        data(){
            return {
                showTip:false,
                tipContent:"",
                myUserData:null
            }
        },

        methods:{

            ...mapActions(["setUserData"]),

            //上传图片
            _uploadImg(event){
                let formData=new FormData();
                formData.append('userId',this.userData.userId);
                formData.append('img',this.$refs.fileInput.files[0]);
                uploadImg(formData,{
                    'Content-Type':'multipart/form-data'
                }).then(res=>{
                    this.showTip = true;
                    this.tipContent = "修改头像成功";
                    this.myUserData = {...res.data};//浅拷贝
                    this.setUserData(res.data);
                })
            },

            //保存用户信息
            save(){
                if(!this.myUserData.username){
                    this.showTip = true;
                    this.tipContent = "用户名不能为空";
                    return;
                }else if(!this.myUserData.email){
                    this.showTip = true;
                    this.tipContent = "邮箱不能为空";
                    return;
                }else if(!this.myUserData.telephone){
                    this.showTip = true;
                    this.tipContent = "电话不能为空";
                    return;
                }
                updateUser(this.myUserData).then((res)=>{
                    this.setUserData(res.data);
                    this.showTip = true;
                    this.tipContent = "修改用户信息成功";
                });
            },

            //退出登录
            logout(){
                logout().then(()=>{
                    this.showTip = true;
                    this.tipContent = "退出登录成功";
                    this.setUserData({});
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },2000);
                })
            },

            checkFile(){
                this.$refs["fileInput"].click();
            }
        },

        created() {
            this.myUserData = JSON.parse(JSON.stringify(this.userData))
        },

    }
</script>

<style lang="less" scoped>
    @import "~common/less/variable.less";
    @import "~common/less/icon.less";
    #my-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        max-width:450px;
        background: @color-background;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        .icon-back{
            position: fixed;
            z-index: 101;
            padding: 10px;
            font-size: 22px;
            top:0;
            left: 0;
        }
        &::-webkit-scrollbar{
            display: none;
        }
        &.slide-enter-active, &.slide-leave-active {
            transition: all 0.3s;
        }
        &.slide-enter, &.slide-leave-to {
            transform: translate3d(100%, 0, 0);
        }
        #avater-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            #avater-box{
                width: 80px;
                height: 80px;
                position: relative;
                margin-top: 20px;
                #avater-img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            #username{
                text-align: center;
                margin-top: 20px;
                font-weight: bolder;
                font-size: 16px;
            }
        }
        #user-form{
            width: 80%;
            .login-item {
                height: 30px;
                margin-top: 40px;
                display: flex;
                .icon-login {
                    margin-right: 5px;
                    width: 30px;
                    height: 30px;
                    float: left;
                    text-align: center;
                    line-height: 30px;
                    font-size: 28px;
                    color: @color-text-l;
                }
                .login-input {
                    flex: 1;
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
        #btn-wrapper{
            width: 80%;
            margin-top: 30px;
            .btn{
                border:1px solid rgba(255, 255, 255, 0.5);
                text-align: center;
                line-height: 30px;
                border-radius: 20px;
                margin-bottom: 20px;
            }
        }
    }
</style>
