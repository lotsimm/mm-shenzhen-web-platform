<template>
    <div>
        <el-dialog
                :before-close="handleClose"
                title="提示"
                :visible.sync="normalDialogVisible"
                width="30%"
                center>
            <el-form ref="form" :model="form" label-width="110px" :rules="rules">
                <el-form-item :label="inputLabel" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="坐标" prop="location">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="" >
                    <a target="_blank" href="https://lbs.amap.com/console/show/picker" style="color: #02A7F0">拾取坐标</a>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="createAdd">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "normalDialog.vue",
        data(){
            var validatePass =function (rule, value, callback) {
                // eslint-disable-next-line no-useless-escape
                var latMarkReg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
                // eslint-disable-next-line no-useless-escape
                var lngMarkReg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
                var lat = value.split(',')[0]
                var lng = value.split(',')[1]
                var isTrue = false
                if(latMarkReg.test(lat)&&lngMarkReg.test(lng)){
                    isTrue = true
                }
                if (value === '') {
                    callback(new Error('请输入坐标'));
                } else if (!isTrue||value.indexOf(',')==-1) {
                    callback(new Error('请输入正确的坐标格式'));
                } else {
                    callback();
                }
            }
            return{
                form:{
                    name:this.type=='add'?"":this.editMsg.name,
                    location:this.type=='add'?"":this.editMsg.location
                },
                rules: {
                    name: [
                        { required: true, message: '请输入'+this.inputLabel, trigger: 'blur' },
                    ],
                    location: [
                        { required: true,validator: validatePass,  trigger: 'blur' }
                    ],
                },
                editId:'',
                name:'',
                location:''
            }
        },
        props:{
            normalDialogVisible:{
                type:Boolean
                },
            inputLabel:{
                type:String
            },
            editMsg:{
                type:Object,
                default(){
                    return{

                    }
                }
            }
        },
        methods:{
            createAdd(){
                this.$refs.form.validate(valid => {
                    if (valid) {
                            let params = {
                                name:this.form.name,
                                location:this.form.location,
                            }
                            this.$emit('createAdd1',params)
                            this.form = {
                                name:"",
                                location:"",

                            }


                    }
                })
            },
            closeDialog(){
                this.$emit('closeDialog1',false)
                // this.form={
                //     name:"",
                //     location:"",
                // }
            },
            handleClose(){
                this.$emit('update:normalDialogVisible',false)
                // this.form={
                //     name:"",
                //     location:"",
                // }

            }
        },
        watch:{
            editMsg(val){
                this.type = 'edit'
                this.$set(this.form,'name',val.name)
                this.$set(this.form,'location',val.location)
            }
        }

    }
</script>

<style scoped>

</style>