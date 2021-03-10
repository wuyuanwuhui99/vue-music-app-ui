<template>
    <div class="toast-wrapper" v-show="show">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:""
        },
        show:{
            type:Boolean,
            default:false
        },
        timeout:{
            type:Number,
            default:2000
        }
    },
    model:{
        prop: 'show',
        event: 'returnBack'
    },

    watch:{
       show(newVal){
           if(newVal){
               setTimeout(()=>{
                   this.$emit("returnBack",false);
               },this.timeout)
           }
       } 
    },

    mounted(){
        
    }
}
</script>

<style lang="less" scoped>
    .toast-wrapper{
        position: fixed;
        top:50%;
        left:50%;
        transform:translateX(-50%) translateY(-50%);
        background: #000;
        color:#fff;
        line-height: 30px;
        text-align: center;
        opacity: .5;
        padding:0 10px;
        border-radius: 10px;
        z-index: 999;
    }
</style>
