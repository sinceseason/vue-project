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
        @queryChannelPerson="queryChannelPerson"
        @modifyChannel="edit"
        @removeChannel="edit">
      </channel-table>
    </div>
    <div class="right-container">
      <terminal-table
        :terminalTableData="terminalList"
        @removeChannelItem="removeChannelItem"></terminal-table>
    </div>
    <edit-dialog 
      @closeDialog="closeDialog"
      @saveChannel="doAction"></edit-dialog>
    <remove-terminal-dialog
      @closeDialog="closeDialog"></remove-terminal-dialog>
  </div>
</template>

<script>
import * as CONST from '@/config/const'
import {Initialise} from '@/config/initialise'

import channelTable from './table/channelTable'
import terminalTable from './table/terminalTable'
import editDialog from './dialog/edit'
import removeChannelDialog from './dialog/removeChannelTerminal'

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
      removeDialogVisible: false
    }
  },
  created () {
    this.fuzzy()
    this.queryTerminal()
  },
  components: {
    'channel-table': channelTable,
    'terminal-table': terminalTable,
    'edit-dialog': editDialog,
    'remove-terminal-dialog': removeChannelDialog
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
      if (channel) {
        this.operateAction.selected = channel
        this.operateAction.selectedIndex = this.findIndex(this.channelList, channel, 'channelid')
      } else {
        delete this.operateAction.selected
        delete this.operateAction.selectedIndex
      }
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
      this.operateAction.target = channel || {}
      this.dialogVisible = true
    },
    doAction (newChannelName, selectedTerminalList) {
      if (this.operateAction.action == CONST.operator.REMOVE) {
        this.remove()
      } else if (newChannelName) {
        this.save(newChannelName, selectedTerminalList)
      } else {
        this.showBasicNotify(CONST.basicFailNofity)
      }
    },
    save (newChannelName, selectedTerminalList) {
      this.operateAction.target.channelName = newChannelName
      if (this.operateAction.target.channelName == null || this.operateAction.target.channelName.length == 0) {
        this.showBasicNotify(CONST.basicFailNofity)
        return
      }
      this.operateAction.target.deptid = JSON.parse(sessionStorage.loginedUser).departmentId
      let jsonStr = this.encode(JSON.stringify(this.operateAction.target))
      this.$httpPost(CONST.TEMP_CHANNEL + CONST.SAVE, null, {para: jsonStr})
        .then(data => {
          let result = data.data
          if (result.result == CONST.RESULT.success) {
            let dataJson = this.decode(result.data)
            let obj = JSON.parse(dataJson)
            switch (this.operateAction.action) {
              case CONST.operator.CREATE:
                this.channelList.push(obj)
                break
              case CONST.operator.MODIFY:
                this.channelList[this.operateAction.selectedIndex] = obj
                this.$httpPost(CONST.DISPATCH_PTT_INFO, obj.channelid)
                break
              default:
                break
            }
            let list = selectedTerminalList
            if (list.length > 0) {
              let tList = []
              list.forEach(item => {
                tList.push({
                  pid: item.pid,
                  deptid: item.deptid
                })
              })
              let jsonStr = this.encode(JSON.stringify(tList))
              this.$httpPost(CONST.TEMP_CHANNEL_RELA + CONST.SAVE, obj.channelid, {para: jsonStr})
                .then(data => {
                  let result = data.data
                  if (result.result == CONST.RESULT.success) {
                    this.showBasicNotify(CONST.basicSuccessNofity)
                    if (this.operateAction.action == CONST.operator.MODIFY)
                      this.queryChannelPerson({channelid: obj.channelid})
                  }
                })
            } else {
              this.showBasicNotify(CONST.basicSuccessNofity)
            }
          } else {
            let errorCode = result.errorCode
            if (errorCode == CONST.ERRORCODE.SAME_RECORD) {
              this.showBasicNotify({type: 'error', title: '', message: this.$t('message.same_record'), duration: 2000})
            } else {
              this.showBasicNotify(CONST.basicFailNofity)
            }
          }
        })
      this.dialogVisible = false
    },
    remove () {
      this.$httpPost(CONST.TEMP_CHANNEL + CONST.REMOVE, this.operateAction.target.channelid)
        .then(data => {
          let result = data.data
            if (result.result == CONST.RESULT.success) {
              this.fuzzy()
              this.terminalList = []
              this.showBasicNotify(CONST.basicSuccessNofity)
            }
        })
      this.dialogVisible = false
    },
    removeChannelItem (row) {
      this.selectedTerminalList = [{
        pid: row.pid,
        deptid: row.deptid,
        channelidT: row.channelidT
      }]
      this.removeDialogVisible = true
    },
    removeChannelTerminal () {
      let jsonStr = this.encode(JSON.stringify(this.selectedTerminalList))
      this.$httpPost(CONST.TEMPCHANNELRELAREMOVE, this.selectedTerminalList[0].channelidT, {para: jsonStr})
        .then(data => {
          let result = data.data
          if (result.result == CONST.RESULT.success) {
            this.showBasicNotify(CONST.basicSuccessNofity)
            this.queryChannelPerson({channelid: this.selectedTerminalList[0].channelidT})
          }
        })
      this.removeDialogVisible = false
    },
    beforeOpenEditDialog () {
      this.selectTerminalCondition = new Initialise().generateSearchCondition('', '', '')
      this.queryTerminal()
    },
    closeDialog (val) {
      this.dialogVisible = val
      this.removeDialogVisible = val
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
