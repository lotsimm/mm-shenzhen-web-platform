<template>
  <div class="base-list">
    <el-table
      :data="tableData"
      :border="border"
      header-row-class-name="table-header"
      ref="multipleTable"
      stripe
      style="width: 100%"
      tooltip-effect="dark">
      <el-table-column
        v-if="tableData.sort==1"
        type="index" label="序号"
        width="150"
        header-align="center" align="center">
      </el-table-column>
       单元格内容
      <el-table-column
        :key="headerItem.prop"
        :label="headerItem.label"
        :min-width="headerItem.width?headerItem.width:80"
        :prop="headerItem.prop"
        :show-overflow-tooltip="!headerItem.click"
        :sortable="headerItem.isSortable"
        align="center"
        filter-placement="bottom"
        header-align="center"
        v-for="headerItem in tableHeadData">
        <template slot-scope="scope">
          <!-- 左图右文 -->
          <span class="img-text-cell" v-if="headerItem.showImg">
						<img :src="scope.row[headerItem.prop.urlFlag]" alt=""><span style="margin-left: 10px">{{scope.row[headerItem.prop.textFlag]}}</span>
          </span>
          <!-- 多个按钮 -->
          <span v-if="headerItem.click && typeof(scope.row[headerItem.prop]) == 'object'"><span :key="title" v-for="title in scope.row[headerItem.prop]"><el-button
                @click.stop="clickItem(scope.row, title)"
                size="mini"
                style="min-width:inherit; margin-left: 5px;"
                type="text">{{title}}
              </el-button></span></span>
          <!-- 单个按钮的单元格 -->
          <span v-if="headerItem.click && typeof(scope.row[headerItem.prop]) != 'object'"><el-button
              :disabled="(typeof headerItem.disable == 'function') ? headerItem.disable(scope.row) : false"
              @click.stop="clickItem(scope.row, scope.row[headerItem.prop])"
              size="mini"
              type="text"
              v-if="scope.row[headerItem.prop]">{{scope.row[headerItem.prop]}}
            </el-button></span>
          <!-- 普通文本 -->
          <span v-html="scope.row[headerItem.prop]" v-if="!headerItem.click&&!headerItem.render"></span>
          <ex-slot v-if="headerItem.render" :render="headerItem.render" :row="scope.row" :index="scope.$index" :column="headerItem" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  var exSlot = {
    functional: true,
    props: {
      row: Object,
      render: Function,
      index: Number,
      column: {
        type: Object,
        default: null
      }
    },
    render: (h, data) => {
      const params = {
        row: data.props.row,
        index: data.props.index
      }
      if (data.props.column) params.column = data.props.column
      return data.props.render(h, params)
    }
  }
  export default {

    methods: {
      clickItem (row, title) {
        this.$emit('clickTableItem', { row: row, title: title })
      },
    },
    props: {
      // 表头数据[{prop: '',label: ''}...]
      tableHeadData: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 表格数据
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      border: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    components: { exSlot},


  }
</script>
<style lang="less">
  .base-list {

  }
</style>
