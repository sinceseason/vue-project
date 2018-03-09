<template>
  <el-table class="terminal-table" border
    :data="terminalTableData"
    :header-row-class-name="tableHeaderClassName">
    <el-table-column prop="pno" label="人员编号" width="200"></el-table-column>
    <el-table-column prop="name" label="人员姓名" width="200"></el-table-column>
    <el-table-column prop="deptName" label="部门名称"></el-table-column>
    <el-table-column prop="status_t" label="设备状态"></el-table-column>
    <el-table-column width="120"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'terminalTable',
  props: {
    terminalTableData: {
        type: Array
    }
  },
  methods: {
    tableHeaderClassName ({row, rowIndex}) {
        return 'channel-table-header'
    }
  }
}
</script>

