<template>
  <div class="ptt-container">
    <div class="left-container">
      <div class="bar">
        <div class="switch" :class="{active: type == 10}" @click="setConditionType(10)">{{$t('label.default_channel')}}</div>
        <div class="switch" :class="{active: type == 1}" @click="setConditionType(1)">{{$t('label.temp_channel')}}</div>
      </div>
      <div class="bar">
        <div class="search-bar1">
          <el-input id="channelFuzzy" :placeholder="$t('label.fuzzy')" v-model="searchCondition.fuzzy">
            <el-button slot="append" icon="el-icon-search" @click.native="fuzzy" :title="$t('button.search')"></el-button>
            <el-button v-if="$isAuthorized('create_temp_channel') && type == 1" 
              slot="append" icon="el-icon-circle-plus" :title="$t('button.create')" @click="edit('create', null)"></el-button>
          </el-input>
        </div>
      </div>
      <channel-table 
        :channelTableData="channelList" 
        @enterChannel="enterChannel" 
        @queryChannelPerson="queryChannelPerson"></channel-table>
    </div>
    <div class="right-container">
      <terminal-table
        :terminalTableData="terminalList"></terminal-table>
    </div>
    <edit-dialog :dialogVisible="dialogVisible" 
      @doAction="doAction"></edit-dialog>
  </div>
</template>

<script>
import * as CONST from '@/config/const'
import {Initialise} from '@/config/initialise'

import channelTable from './table/channelTable'
import terminalTable from './table/terminalTable'
import editDialog from './dialog/edit'

export default {
  name: 'ptt',
  data () {
    return {
      channelList: [],
      terminalList: [],
      pttAdinfoList: [],
      searchCondition: new Initialise().generateSearchCondition('', 1, 25),
      selectTerminalCondition: new Initialise().generateSearchCondition('', '', ''),
      operateAction: new Initialise().operateAction(),
      type: 10,
      dialogVisible: false,
      newChannelName: ''
    }
  },
  created () {
    this.fuzzy()
    this.queryTerminal()
  },
  components: {
    'channel-table': channelTable,
    'terminal-table': terminalTable,
    'edit-dialog': editDialog
  },
  methods: {
    setConditionType (type) {
      if (this.type != type) {
        this.searchCondition.fuzzy = null
        this.type = type
        this.terminalList = []
        // $("#channelFuzzy")[0].value = ""
        this.fuzzy()
      }
    },
    fuzzy () {
      let jsonStr = this.encode(JSON.stringify(this.searchCondition))
      this.$httpPost(CONST.CHANNEL, this.type, {para: jsonStr})
        .then(data => {
          let result = data.data
          if (result.result === CONST.RESULT.success) {
            let dataJson = this.decode(result.data)
            let obj = JSON.parse(dataJson)
            this.channelList = obj.data
          }
        })
    },
    enterChannel (channel) {
      console.log(channel)
    },
    queryChannelPerson (row) {
      this.$httpPost(CONST.CHANNELINFOS, row.channelid)
        .then(data => {
          let result = data.data
          if (result.result === CONST.RESULT.success) {
            let dataJson = this.decode(result.data)
            let obj = JSON.parse(dataJson)
            this.terminalList = obj
          }
        })
    },
    edit (action, channel) {
      switch (action) {
        case CONST.operator.CREATE:
          this.operateAction.action = CONST.operator.CREATE
          this.operateAction.actionStr = this.$t('operation.temp_channel_create')
          break
        case CONST.operator.MODIFY:
          this.operateAction.action = CONST.operator.MODIFY
          this.operateAction.actionStr = this.$t('operation.temp_channel_modify')
          break
        case CONST.operator.REMOVE:
          this.operateAction.action = CONST.operator.REMOVE
          this.operateAction.actionStr = this.$t('operation.temp_channel_remove')
          break
        default:
          break
      }
      this.dialogVisible = true
    },
    doAction () {
      if (this.operateAction.action == CONST.operator.REMOVE) {
        this.remove()
      } else {
        this.save()
      }
    },
    save () {
      this.operateAction.target.channelName = this.newChannelName
      if (this.operateAction.target.channelName == null || this.operateAction.target.channelName.length == 0) {
        this.showBasicNotify(CONST.basicFailNofity)
        // return
      }
      this.dialogVisible = false
    },
    closeDialog (val) {
      this.dialogVisible = val
    },
    queryTerminal () {
      let jsonStr = this.encode(JSON.stringify(this.selectTerminalCondition))
      let deptId = JSON.parse(sessionStorage.loginedUser).departmentId
      this.$httpPost(CONST.LOAD_PTT_ADINFO, deptId, {para: jsonStr})
        .then(data => {
          let result = data.data
          if (result.result === CONST.RESULT.success) {
            let dataJson = this.decode(result.data)
            let obj = JSON.parse(dataJson)
            this.pttAdinfoList = []
            obj.data.forEach(item => {
              if (!item.channelidT)
                this.pttAdinfoList.push(item)
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ptt-container{
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;

  .left-container{
    width: 320px;
    height: 100%;
    position: absolute;

    .bar{
      width: 100%;
      height: 34px;
      margin-top: 3px;

      &>div{
        height: 34px;
        line-height: 34px;
        float: left;
      }

      .switch{
        width: 50%;
        text-align: center;
        color: #0071c5;
        cursor: pointer;

        &:first-child{
          border: 1px solid #0d0408;
        }
        &:nth-child(2){
          border: 1px solid #0d0408;
          border-left: none;
        }

        &.active{
          background-color: #0071c5;
          color: #fff;
        }
      }

      .search-bar{
        width: 190px;
        height: 34px;
        line-height:34px;
        margin-left: 10px;
      }
      .search-bar1{
         width: 100%;
         height: 34px;
         line-height:34px;
       }
    }
  }

  .right-container{
    position: absolute;
    top: 3px;
    right: 0;
    bottom: 0;
    left: 325px;
    height: 100%;
  }
}
</style>
