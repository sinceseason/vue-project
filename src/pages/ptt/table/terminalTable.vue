<template>
  <el-table class="terminal-table" border
    :data="terminalTableData"
    :header-row-class-name="tableHeaderClassName">
    <el-table-column prop="pno" :label="$t('table.pno')" width="200"></el-table-column>
    <el-table-column prop="name" :label="$t('table.pname')" width="200"></el-table-column>
    <el-table-column prop="deptName" :label="$t('table.department_name')"></el-table-column>
    <el-table-column prop="status_t" :label="$t('table.device_status')" :formatter="formatStatus"></el-table-column>
    <el-table-column width="120" :label="$t('label.operate')">
      <template slot-scope="scope">
        <a class="cell-btn" v-if="$isAuthorized('modify_temp_channel') && scope.row.channelidT != undefined">
          <span class="el-icon-remove-outline" :title="$t('button.remove')" @click="$emit('removeChannelItem', scope.row)"></span>
        </a>
      </template>
    </el-table-column>
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
    },
    formatStatus (row) {
      switch (row.status_t) {
        case 0:
          return this.$t('label.none')
        case 1:
          return this.$t('label.online')
        default:
          return this.$t('label.breakdown')
     }
    }
  }
}
</script>

