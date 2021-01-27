<template>
    <div class="home">
        <div class="home-single" @click="goPrimary ">
            <p>深圳小学已打点</p>
            <span>{{primaryNum}}所</span>
            <button>管理</button>
        </div>
        <div class="home-single" @click="goMiddle">
            <p>深圳中学已打点</p>
            <span>{{middleNum}}所</span>
            <button>管理</button>
        </div>
        <div class="home-single" @click="goShop">
            <p>小店已打点</p>
            <span>{{shopNum}}所</span>
            <button>管理</button>
        </div>
        <div class="home-single" @click="goUniform">
            <p>校服品牌已打点</p>
            <span>{{uniformNum}}所</span>
            <button>管理</button>

        </div>
    </div>
</template>

<script>
    import * as Api from "../api/home.js"
    export default {
        name: "home.vue",
        data(){
            return{
                primaryNum:'',
                middleNum:'',
                shopNum:'',
                uniformNum:'',
            }
        },
        methods:{
            goPrimary(){
               this.$router.push('manage/1')
            },
            goMiddle(){
                this.$router.push('manage/2')
            },
            goShop(){
                this.$router.push('manage/3')
            },
            goUniform(){
                this.$router.push('manage/4')
            },
            getTableData(){
                Api.mapStatus({}).then(res=>{
                    this.primaryNum = res.data['小学']?res.data['小学']:0
                    this.middleNum = res.data['中学']?res.data['中学']:0
                    this.shopNum = res.data['小店']?res.data['小店']:0
                    this.uniformNum = res.data['直营']?res.data['直营']:0

                })
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>

<style  scoped lang="less">
.home{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 30px 40px 0;
    box-sizing: border-box;
    .home-single{
        border: 1px solid #000;
        width: 20%;
        margin-right: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        padding: 20px;
        box-sizing: border-box;
        p{
            height: 60px;
            line-height: 60px;
            font-size: 22px;
        }
        span{
            font-size: 25px;
            font-weight: 800;
            margin-bottom: 20px;
        }
        button{
            width:140px ;
            height: 40px;
            color: #fff;
            background: rgba(22, 155, 213, 1);
            border-radius: 5px;
            border: none;

        }
    }
}
</style>