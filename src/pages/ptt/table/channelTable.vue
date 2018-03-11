<template>
    <el-table class="channel-table" border
        :data="channelTableData" 
        :header-row-class-name="tableHeaderClassName"
        @row-click="queryChannelPerson">
        <el-table-column prop="channelName" :label="$t('table.channel_name')"></el-table-column>
        <el-table-column :label="$t('label.operate')" width="120">
            <template slot-scope="scope">
                <a><span class="fa fa-microphone" :title="$t('button.enter_channel')" @click="$emit('enterChannel', scope.row)"></span></a>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
  name: 'channelTable',
  methods: {
    tableHeaderClassName ({row, rowIndex}) {
        return 'channel-table-header'
    },
    queryChannelPerson (row, column) {
        this.$emit('queryChannelPerson', row)
    }
  },
  props: {
    channelTableData: {
        type: Array
    }
  }
}
</script>
<style lang="scss">
.channel-table.el-table {
    margin-top: 10px;
}    
.channel-table-header th {
    background-color: #1D45C9;
    color: #fff;
}
</style>


