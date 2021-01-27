<template>
    <div class="content">
        <div class="loginTab">
            <div class="loginTab-wrapper">
                <div class="loginType">
                    <span style="margin-right: 10px;" class="click passwordLogin" >密码登录</span>
                    <!-- <span class="textLogin">验证码登录</span> -->
                </div>
                <div class="passwordDiv" >
                    <div class="inputDiv">
                        <div class="inputDivsingle">
                            <img src="../assets/images/tel.png" alt="">
                            <input id="account" type="text" placeholder="手机号" style="margin-bottom:20px ;" v-model="account">
                        </div>
                        <div class="inputDivsingle">
                            <img src="../assets/images/password.png" alt="">
                            <input id="password" type="password" placeholder="密码" style="margin-bottom:20px ;"  v-model="password">
                        </div>
                    </div>
                    <div style="margin-top: 5px;">
                        <!-- <p style="text-align: right;padding-right: 8px;"><a href="register.html" style="color: #4369bb;" >免费注册</a></p> -->
                    </div>
                    <div style="text-align: center;width: 100%;display: flex;justify-content: center;margin:20px 0  10px  0">
                        <button class="loginBtn" @click="login">登录</button>
                    </div>
                    <div style="display: none;">
                        <div class="mui-input-row mui-checkbox " style="margin-right: 7px;">
                            <input name="Checkbox" type="checkbox" checked>
                        </div>

                        <span></span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import * as Api from "../api/home"
    export default {
        name: "login.vue",
        data(){
            return{
                account:'',
                password:''
            }
        },
        mounted() {

        },
        methods:{
            login(){
                Api.login({
                    ukAccount:this.account,
                    password:this.password
                }).then(res=>{
                    localStorage.setItem('sessionId',res.data.sessionId)
                    localStorage.setItem('ukAccount',res.data.ukAccount)
                    this.$router.push('index')
                })
            }
        }

    }
</script>

<style lang="less" >
.content{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(42, 76, 149, 1);
    .loginTab{
        width: 419px;
        height: 373px;
        background: #3356a1;
        position: relative;
        float: left;
        margin-left: 60px;
        .loginTab-wrapper{
            width: 400px;
            height: 360px;
            background: #fff;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin:auto;
            color: #000;
            box-sizing: border-box;
            padding: 30px 30px;
        }
        .loginType {
            color: #a69999;
            font-size: 16px;
            margin-bottom: 30px;
            display: flex;
            justify-content: flex-start;
        }
    }
}



.click{
    color: #000000;
    border-bottom: 2px solid #4369bb;
    font-size: 18px;
}
.inputDiv{
    display: flex;
    flex-direction: column;
}
.inputDiv input{
    width: 300px;
    height: 30px;
    border: 1px solid #dcdfe6;
    padding-left: 30px;
    line-height: 30px;
}

.loginBtn{
    width: 99%;
    height: 35px;
    background: #4369bb;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    display: block;
}
.inputDivsingle{
    position: relative;
}
.inputDivsingle img{
    position: absolute;
    width: 20px;
    height: 20px;
    left: 5px;
    top: 5px;
}
.inputDivsingle span{
    position: absolute;
    right: 12px;
    top: 5px;
}
</style>