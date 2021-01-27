<template>
    <div class="header">
        <div class="header-left">
            <img src="../assets/images/company.png" alt="">
            <span>深圳校服大数据录入系统</span>
        </div>
        <div class="userinfo">
            <span class="avatar">
        <el-popover
                placement="top-start"
                width="120"
                popper-class="avatar-pop"
                style="text-align: center;padding-left: 20px"
                trigger="hover">
          <el-button icon="el-icon-document" type="text" >账号设置</el-button>
            <br>
          <el-button icon="el-icon-switch-button" class="logout-button" type="text" @click="logout">退出登录</el-button>
          <i class="el-icon-user" slot="reference"></i>
        </el-popover>
      </span>
            <ul class="info">
                <li class="name">{{userName}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userName:''
            }
        },
        methods:{
            logout(){
                this.$router.push('/')
            },
            accountSet(){

            }
        },
        mounted() {
            this.userName = localStorage.getItem('ukAccount')
        }
    }
</script>

<style lang="less" scoped>
.header{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 86px;
    background: rgba(40, 73, 145, 1);
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    .header-left{
        display: flex;
        height: 100%;
        align-items: center;
    }
    .header-left img{
        vertical-align: middle;
        width: 40px;
    }
    .header-left span{
       color: #fff;
        font-size: 20px;
        font-weight: 800;
    }
    .userinfo {
        padding-right: 30px;
        font-size: 16px;
        width: auto;
        height: 80px;
        color: #fff;
        .avatar {
            display: inline-block;
            font-size: 28px;
            line-height: 80px;
            margin-right: 5px;
        }
        .info {
            display: inline-block;
            vertical-align: text-bottom;
            li {
                list-style: none;
            }
        }
        .name {
            display: inline-block;
        }

    }
}
</style>