<template>
  <el-dialog 
    :title="this.$parent.operateAction.actionStr" 
    :visible="this.$parent.dialogVisible"
    @open="this.$parent.beforeOpenEditDialog"
    @close="closeDialog"
    top="12vh"
    width="65%">
    <span v-if="this.$parent.operateAction.action != 'remove'">
      <el-input :placeholder="$t('table.channel_name')" v-model.trim="this.$parent.testChannelName">
        <el-button slot="prepend">{{$t('table.channel_name')}}</el-button>
      </el-input>
      <el-table class="select-terminal-table" border
        :data="this.$parent.pttAdinfoList"
        :max-height="500"
        :header-row-class-name="tableHeaderClassName"
        :cell-style="registerCellStatus"
        @selection-change="selectTerminal">
        <el-table-column type="selection" width="35" :selectable="selectAbled"></el-table-column>
        <el-table-column prop="pno" :label="$t('table.pno')" width="90"></el-table-column>
        <el-table-column prop="name" :label="$t('table.pname')" width="90"></el-table-column>
        <el-table-column prop="deptName" :label="$t('table.department_name')"></el-table-column>
        <el-table-column prop="channelName" :label="$t('table.channel_name')"></el-table-column>
        <el-table-column prop="sn" :label="$t('table.register_status')" width="90" 
          :formatter="registerStatusFilter"></el-table-column>
      </el-table>
    </span>
    <span v-else>
      {{$t('message.remove_info')}}
    </span>
    <span slot="footer">
      <el-button @click="$emit('closeDialog', false)">{{$t('button.cancel')}}</el-button>
      <el-button type="primary" @click="doAction">{{$t('button.accept')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'edit-dialog',
  data () {
    return {
      newChannelName: '',
      selectedTerminalList: []
    }
  },
  props: {
    dialogVisible: {
			type: Boolean
    }
  },
  methods: {
    tableHeaderClassName ({row, rowIndex}) {
      return 'select-terminal-table-header'
    },
    selectAbled (row) {
      if (row.sn == undefined || row.sn == null) {
        return false
      }
      return true
    },
    registerCellStatus ({row}) {
      if (row.status_t == 1)
        return {'color': '#0071c5'}
      else
        return {'color': '#000'}
    },
    registerStatusFilter (row) {
      if (row.sn == null)
        return this.$t('message.unregistered')
      else
        return this.$t('message.registered')
    },
    doAction () {
      this.$emit('saveChannel', this.newChannelName, this.selectedTerminalList)
    },
    selectTerminal (val) {
      this.selectedTerminalList = val
    },
    closeDialog () {
      this.newChannelName = ''
    }
  }
}
</script>
<style lang="scss">
.el-table.select-terminal-table {
  margin-top: 10px;
}
.select-terminal-table-header  th {
  background-color: #1D45C9;
  color: #fff;
}
</style>


