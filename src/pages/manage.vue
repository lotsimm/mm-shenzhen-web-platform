<template>
    <div class="pointManage">
        <div class="content-left">
            <el-menu
                    :default-active="this.type"
                    class="el-menu-vertical-demo"
                    @select="select"
                    style="border-right: none"
            >
                <el-menu-item index="1">
                    <span slot="title">深圳小学打点管理</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">深圳中学打点管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span slot="title">签约小店打点管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <span slot="title">品牌直营数据管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">品牌管理</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content-right">
            <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline"
                         style="display: flex;align-items: center">
                    <div style="display: flex;align-items: center" v-if="searchKey">
                        <el-form-item :label="label" size="small">
                            <el-input v-model="formInline.keyword"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌" v-if="brandshow">
                            <el-select v-model="formInline.brand" size="small">
                                <el-option v-for="(item,i) in brandtypeArray " :label="item.name" :value="item.id"
                                           :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="searchClick">搜索</el-button>
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button type="primary" size="small" @click="addEvent">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <base-list :tableData="tableData" border="border" :tableHeadData="tableHeadData"
                           @clickTableItem="clickTableItem" style="margin-bottom: 60px"></base-list>
                <el-pagination
                        :current-page="page"
                        :total="total"
                        @current-change="pageChange"
                        layout="total, prev, pager, next, jumper">
                </el-pagination>
            </div>

        </div>





        <normalDialog :normalDialogVisible.sync="normalDialogVisible" :editMsg="editMsg1" @closeDialog1="closeDialog1"
                      @createAdd1="createAdd1" :inputLabel="label"/>




        <brandDialog :brandDialogVisible.sync="brandDialogVisible" :editMsg="editMsg3" @closeDialog2="closeDialog2"
                     @createAdd2="createAdd2" :inputLabel="label"/>
        <brandManageDialog :brandManageDialogVisible.sync="brandManageDialogVisible" :editMsg="editMsg2"
                           @closeDialog3="closeDialog3" @createAdd3="createAdd3" :inputLabel="label"/>

    </div>
</template>

<script>
    import * as api from "../api/home.js"
    import baseList from "../components/baseList.vue";
    import normalDialog from "../components/dialog.vue";
    import brandDialog from "../components/brandDialog.vue";
    import brandManageDialog from "../components/brandManageDialog.vue";
    export default {
        name: "manage.vue",
        components: {baseList, normalDialog, brandManageDialog, brandDialog},
        data() {
            return {
                formInline: {
                    keyword: '',
                },
                label: '小店名称',
                type: this.$route.params.type,
                index: '',
                brandshow: false,
                searchKey: true,
                editMsg1: {},
                editMsg2: {},
                editMsg3: {},
                tableData: [],
                page: 1,
                total: 0,
                tableHeadData: [		//头部文本
                ],
                normalDialogVisible: false,
                brandDialogVisible: false,
                brandManageDialogVisible: false,
                editType: '',
                brandtypeArray: []
            }
        },
        methods: {
            searchClick() {
                var params = ""
                if (this.index == 1) {
                    params = '小学'
                    this.getTableData(params, 1, this.formInline.keyword)
                } else if (this.index == 2) {
                    params = '中学'
                    this.getTableData(params, 1, this.formInline.keyword)
                } else if (this.index == 3) {
                    params = '小店'
                    this.getTableData(params, 1, this.formInline.keyword)
                } else if (this.index == 4) {
                    params = '直营'
                    this.getTableData(params, 1, this.formInline.keyword, this.formInline.brand)
                }
            },
            clickTableItem(e) {
                if (e.title == '删除') {
                    this.$confirm('是否删除' + e.row.name + '?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.index == 5) {
                            api.brandDel(e.row.id).then(res => {
                                if (res.code == 0) {
                                    this.$message.success({
                                            message: '删除成功'
                                        }
                                    )
                                    this.getBrandData(1)
                                }

                            })
                        } else {
                            api.mapDel(e.row.id).then(res => {
                                if (res.code == 0) {
                                    this.$message.success({
                                            message: '删除成功'
                                        }
                                    )
                                    var params = ''
                                    if (this.index == 1) {
                                        params = '小学'
                                        this.getTableData(params, 1)
                                    } else if (this.index == 2) {
                                        params = '中学'
                                        this.getTableData(params, 1)
                                    } else if (this.index == 3) {
                                        params = '小店'
                                        this.getTableData(params, 1)
                                    } else if (this.index == 4) {
                                        params = '直营'
                                        this.getTableData(params, 1)
                                    }
                                }
                            })
                        }

                    })
                } else {
                    this.editType = 'edit'
                    if (this.index == 5) {
                        this.brandManageDialogVisible = true
                        this.editMsg2 = e.row
                    } else if (this.index == 4) {
                        this.brandDialogVisible = true
                        this.editMsg3 = e.row
                    } else {
                        this.normalDialogVisible = true
                        this.editMsg1 = e.row
                    }

                }
            },
            createAdd1(form) {
                var that = this
                if (this.editType == 'add') {
                    let params = {
                        lng: form.location.split(',')[0] * 1,
                        lat: form.location.split(',')[1] * 1,
                        name: form.name,
                    }
                    if (this.index == 1) {
                        params.type = '小学'
                    } else if (this.index == 2) {
                        params.type = '中学'
                    } else {
                        params.type = '小店'
                    }
                    api.mapSave(params).then(res => {
                        if (res.code == 0) {
                            this.$message.success({
                                    message: '创建成功'
                                }
                            )
                            this.normalDialogVisible = false
                            if (this.index == 1) {
                                params = '小学'
                                this.getTableData(params, 1)
                            } else if (this.index == 2) {
                                params = '中学'
                                this.getTableData(params, 1)
                            } else if (this.index == 3) {
                                params = '小店'
                                this.getTableData(params, 1)
                            }
                        }
                    });
                } else {
                    let params = {
                        lng: form.location.split(',')[0] * 1,
                        lat: form.location.split(',')[1] * 1,
                        name: form.name,
                        id: that.editMsg1.id
                    }
                    if (this.index == 1) {
                        params.type = '小学'
                    } else if (this.index == 2) {
                        params.type = '中学'
                    } else {
                        params.type = '小店'
                    }
                    api.mapSave(params).then(res => {
                        if (res.code == 0) {
                            this.$message.success({
                                    message: '修改成功'
                                }
                            )
                            this.normalDialogVisible = false
                            if (this.index == 1) {
                                params = '小学'
                                this.getTableData(params, 1)
                            } else if (this.index == 2) {
                                params = '中学'
                                this.getTableData(params, 1)
                            } else if (this.index == 3) {
                                params = '小店'
                                this.getTableData(params, 1)
                            }
                        }
                    });
                }

            },
            createAdd2(form) {
                var that = this
                if (this.editType == 'add') {
                    let params = {
                        lng: form.location.split(',')[0] * 1,
                        lat: form.location.split(',')[1] * 1,
                        name: form.name,
                        brand: {
                            id: form.brand
                        },
                        type: '直营'
                    }
                    api.mapSave(params).then(res => {
                        if (res.code == 0) {
                            this.$message.success({
                                    message: '创建成功'
                                }
                            )
                            this.brandDialogVisible = false
                            params = '直营'
                            this.getTableData(params, 1)
                        }
                    });
                } else {
                    let params = {
                        lng: form.location.split(',')[0] * 1,
                        lat: form.location.split(',')[1] * 1,
                        name: form.name,
                        brand: {
                            id: form.brand
                        },
                        type: '直营',
                        id: that.editMsg3.id
                    }
                    api.mapSave(params).then(res => {
                        if (res.code == 0) {
                            this.$message.success({
                                    message: '修改成功'
                                }
                            )
                            this.brandDialogVisible = false
                            params = '直营'
                            this.getTableData(params, 1)
                        }
                    });
                }
            },
            createAdd3(form) {
                if (this.editType == 'add') {
                    let params = {}
                    params.name = form.name
                    params.type = form.bubbleType
                    api.brandSave(params).then(res => {
                        if (res.code == 0) {
                            this.$message.success({
                                    message: '新建成功'
                                }
                            )
                            this.brandManageDialogVisible = false
                            this.getBrandData(1)
                        }
                    })
                } else {
                    let params = {}
                    params.name = form.name
                    params.type = form.bubbleType
                    params.id = this.editMsg2.id
                    api.brandSave(params).then(res => {
                        if (res.code == 0) {
                            this.$message.success({
                                    message: '修改成功'
                                }
                            )
                            this.brandManageDialogVisible = false
                            this.getBrandData(1)
                        }
                    })
                }

            },
            addEvent() {
                this.editType = 'add'
                if (this.index == 1 || this.index == 2 || this.index == 3) {
                    this.normalDialogVisible = true
                    this.editMsg1 = {}
                } else if (this.index == 4) {
                    this.brandDialogVisible = true
                    this.editMsg3 = {}
                } else {
                    this.brandManageDialogVisible = true
                    this.editMsg2 = {}
                }
            },
            closeDialog1(value) {
                this.normalDialogVisible = value
            },
            closeDialog2(value) {
                this.brandDialogVisible = value
            },
            closeDialog3(value) {
                this.brandManageDialogVisible = value
            },
            select(index) {
                this.formInline.keyword = ""
                this.formInline.brand = ""
                this.typeSelect(index)
            },
            //翻页
            pageChange(page) {
                var params = ''
                if (this.index == 1) {
                    params = '小学'
                    this.getTableData(params, page, this.formInline.keyword)
                } else if (this.index == 2) {
                    params = '中学'
                    this.getTableData(params, page, this.formInline.keyword)
                } else if (this.index == 3) {
                    params = '小店'
                    this.getTableData(params, page, this.formInline.keyword)
                } else if (this.index == 4) {
                    params = '直营'
                    this.getTableData(params, page, this.formInline.keyword, this.formInline.brand)
                } else if (this.index == 5) {
                    this.getBrandData(page)
                }
            },
            getTableData(index, page, name, id) {
                var params = {
                    type: index,
                    current: page,
                    size: 10
                }
                if (name) {
                    params.name = name
                }
                if (id) {
                    params["brand.id"] = id
                }
                api.mapPage(params).then(res => {
                    var array = res.data.records
                    var newArray = []
                    array.forEach(item => {
                        var obj = {}
                        if (index == '小学' || index == '中学' || index == '小店') {
                            obj.name = item.name
                            obj.createTime = this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                            obj.location = item.lng + ',' + item.lat
                            obj.operateFlag = ['修改', '|', '删除']
                            obj.id = item.id
                        } else if (index == '直营') {
                            obj.name = item.name
                            obj.createTime = this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                            obj.location = item.lng + ',' + item.lat
                            obj.operateFlag = ['修改', '|', '删除']
                            obj.brand = item.brands ? item.brands[0].name : ''
                            obj.brandId = item.brands ? item.brands[0].id : ''
                            obj.id = item.id
                        }
                        newArray.push(obj)
                    })
                    this.tableData = newArray
                    this.total = res.data.total

                })
            },
            getBrand() {
                api.brandPage({
                    current: 1,
                    size: 10
                }).then(res => {
                    this.brandtypeArray = res.data.records
                })
            },
            getBrandData(page) {
                api.brandPage({
                    current: page,
                    size: 10
                }).then(res => {
                    var array = []
                    res.data.records.forEach(item => {
                        var obj = {}
                        obj.name = item.name
                        obj.createTime = this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                        obj.operateFlag = ['修改', '|', '删除']
                        obj.id = item.id
                        if (item.type == 1) {
                            obj.type = '类型一'
                        } else if (item.type == 2) {
                            obj.type = '类型二'
                        } else if (item.type == 3) {
                            obj.type = '类型三'
                        }
                        array.push(obj)
                    })
                    this.tableData = array
                    this.total = res.data.total
                })
            },
            typeSelect(index) {
                this.index = index
                if (index == 1) {
                    this.label = '小学名称'
                    this.brandshow = false
                    this.searchKey = true
                    this.tableHeadData = [		//头部文本
                        {prop: 'name', label: '小学名称', width: 300},
                        {prop: 'location', label: '坐标', width: 300},
                        {prop: 'createTime', label: '录入/修改时间', width: 300},
                        {prop: 'operateFlag', label: '管理', click: true, width: 200},
                    ]
                    this.getTableData('小学', 1)
                } else if (index == 2) {
                    this.label = '中学名称'
                    this.brandshow = false
                    this.searchKey = true
                    this.tableHeadData = [		//头部文本
                        {prop: 'name', label: '中学名称', width: 300},
                        {prop: 'location', label: '坐标', width: 300},
                        {prop: 'createTime', label: '录入/修改时间', width: 300},
                        {prop: 'operateFlag', label: '管理', click: true, width: 200},

                    ]
                    this.getTableData('中学', 1)
                } else if (index == 3) {
                    this.label = '签约小店名称'
                    this.brandshow = false
                    this.searchKey = true
                    this.tableHeadData = [		//头部文本
                        {prop: 'name', label: '签约小店名称', width: 300},
                        {prop: 'location', label: '坐标', width: 300},
                        {prop: 'createTime', label: '录入/修改时间', width: 300},
                        {prop: 'operateFlag', label: '管理', click: true, width: 200},

                    ]
                    this.getTableData('小店', 1)
                } else if (index == 4) {
                    this.label = '直营店名称'
                    this.brandshow = true
                    this.searchKey = true
                    this.tableHeadData = [		//头部文本
                        {prop: 'name', label: '直营店名称', width: 300},
                        {prop: 'brand', label: '品牌名称', width: 200},
                        {prop: 'location', label: '坐标', width: 300},
                        {prop: 'createTime', label: '录入/修改时间', width: 300},
                        {prop: 'operateFlag', label: '管理', click: true, width: 200},

                    ]
                    this.getTableData('直营', 1)
                } else if (index == 5) {
                    this.label = '品牌名称'
                    this.brandshow = false
                    this.searchKey = false
                    this.tableHeadData = [		//头部文本
                        {prop: 'name', label: '品牌名称', width: 200},
                        {prop: 'type', label: '对应气泡类型', width: 300},
                        {prop: 'createTime', label: '录入/修改时间', width: 300},
                        {prop: 'operateFlag', label: '管理', click: true},
                    ]
                    this.getBrandData(1)
                }
            }

        },
        mounted() {
            this.typeSelect(this.type)
            var params = ''
            if (this.type == 1) {
                params = '小学'
            } else if (this.type == 2) {
                params = '中学'
            } else if (this.type == 3) {
                params = '小店'
            } else {
                params = '直营'
            }
            this.getTableData(params, 1)
            this.getBrand()
        },

    }
</script>

<style scoped lang="less">
    .pointManage {
        height: 100%;
        width: 100%;
        flex: 1;
        overflow: auto;
        display: flex;

        .content-left {
            width: 10%;
            height: 100%;
            border-right: 1px solid #DCDFE6;
            box-sizing: border-box;

            ul {
                li {
                    height: 40px;
                    line-height: 40px;
                    text-decoration: none;
                    list-style: none;
                    text-align: left;
                    cursor: pointer;
                }

                .active {
                    color: rgb(2, 125, 180);
                }
            }
        }

        .content-right {
            padding: 30px 200px;
            display: flex;
            flex-direction: column;

        }
    }
</style>