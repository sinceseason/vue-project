<template>
  <div class="ptt-container">
    <div class="left-container">
      <div class="bar">
        <div class="switch" :class="{active: type == 10}" @click="setConditionType(10)">{{$t('label.default_channel')}}</div>
        <div class="switch" :class="{active: type == 1}" @click="setConditionType(1)">{{$t('label.temp_channel')}}</div>
      </div>
      <div class="bar">
        <div class="search-bar1">
          <el-input id="channelFuzzy" placeholder="关键字..." v-model="searchCondition.fuzzy">
            <el-button slot="append" icon="el-icon-search" @click="fuzzy"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script>
import * as CONST from '@/config/const'
import {Initialise} from '@/config/initialise'

export default {
  name: 'ptt',
  data () {
    return {
      channelList: [],
      terminalList: [],
      pttAdinfoList: [],
      searchCondition: new Initialise().generateSearchCondition('', 1, 25),
      type: 10
    }
  },
  created () {
    this.fuzzy()
  },
  methods: {
    setConditionType (type) {
      if (this.type != type) {
        this.searchCondition.fuzzy = null
        this.type = type
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

    .grid_container{
      position: absolute;
      left: 0;
      right: 0;
      top: 80px;
      bottom: 0;
    }
  }
  .right_container{
    position: absolute;
    top: 3px;
    right: 0;
    bottom: 0;
    left: 325px;
    height: 100%;
  }
}
</style>
