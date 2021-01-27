<template>
    <div>
        <el-dialog
                :before-close="handleClose"
                title="提示"
                :visible.sync="brandManageDialogVisible"
                width="30%"
                center>
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item :label="inputLabel"  prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="气泡类型" prop="bubbleType">
                    <el-select v-model="form.bubbleType" placeholder="请选择">
                        <el-option label="类型一" value="1"></el-option>
                        <el-option label="类型二" value="2"></el-option>
                        <el-option label="类型三" value="3"></el-option>
                    </el-select>
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
        name: "brandManageDialog.vue",
        data(){
            return{
                form:{
                    name:this.editMsg.name,
                    bubbleType:this.editMsg.bubbleType
                },
                rules: {
                    name: [
                        { required: true, message:'请输入'+this.inputLabel, trigger: 'blur' },
                    ],
                    bubbleType: [
                        { required: true, message: '请选择气泡类型', trigger: 'blur' }
                    ],
                },
            }
        },
        props:{
            brandManageDialogVisible:{
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
                        var params = {
                            name:this.form.name,
                            bubbleType:this.form.bubbleType,
                        }
                        this.$emit('createAdd3',params)
                        this.form = {
                            name:"",
                            bubbleType:""
                        }
                    }
                })
            },
            closeDialog(){
                this.$emit('closeDialog3',false)
            },
            handleClose(){
                this.$emit('update:brandManageDialogVisible',false)
            }
        },
        watch:{
            editMsg(val){
                console.log(val)
                this.$set(this.form,'name',val.name)

                this.$set(this.form,'bubbleType',val.type)
            }
        }
    }
</script>

<style scoped>

</style>