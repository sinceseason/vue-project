<template>
    <el-table class="channel-table" border
        :data="channelTableData" 
        :header-row-class-name="tableHeaderClassName"
        :row-class-name="tableRowClassName"
        @row-click="queryChannelPerson">
        <el-table-column prop="channelName" :label="$t('table.channel_name')"></el-table-column>
        <el-table-column :label="$t('label.operate')" width="120">
            <template slot-scope="scope">
                <a class="cell-btn"><span class="fa fa-microphone" :title="$t('button.enter_channel')" @click="$emit('enterChannel', scope.row)"></span></a>
                <a class="cell-btn" v-if="$isAuthorized('modify_temp_channel') && scope.row.creatorid != undefined">
                    <span class="el-icon-edit-outline" :title="$t('button.modify')" @click="$emit('modifyChannel', 'modify', scope.row)"></span>
                </a>
                <a class="cell-btn" v-if="$isAuthorized('remove_temp_channel') && scope.row.creatorid != undefined">
                    <span class="el-icon-remove-outline" :title="$t('button.remove')" @click="$emit('removeChannel', 'remove', scope.row)"></span>
                </a>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name: 'channelTable',
    data () {
        return {
            highlightId: -1
        }
    },
    props: {
        channelTableData: {
            type: Array
        }
    },
    methods: {
        tableHeaderClassName ({row, rowIndex}) {
            return 'channel-table-header'
        },
        tableRowClassName ({row, rowIndex}) {
            if (this.highlightId == row.id)
                return 'highlight'
        },
        queryChannelPerson (row, column) {
            this.highlightId = row.id
            this.$emit('queryChannelPerson', row)
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
.el-table .highlight {
    background-color: #97e399
}
.cell-btn {
    cursor: pointer;
    margin-left: 10px;
    &:first-child {
        margin-left: 0px;
    }
}
</style>


