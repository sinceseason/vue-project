<template>
    <div class="normal-layout">
        <div class="search-bar">
            <div class="col-10 title">
                <div class="title">{{$t('menu.log')}}</div>
            </div>
            <div class="col-25">
                <el-date-picker v-model="value1" type="datetime" placeholder="选择起始时间"></el-date-picker>
            </div>
            <div class="col-25">
                <el-date-picker v-model="value2" type="datetime" placeholder="选择结束时间"></el-date-picker>
            </div>
            <div class="col-15">
                <el-input type="text" id="logFuzzy" :placeholder="$t('label.fuzzy')"
                   v-model="searchCondition.fuzzy"
                   @change="searchCondition.page = 1"></el-input>
            </div>
            <div class="col-10">
                <el-button type="primary" @click="fuzzy()">{{$t('button.search')}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Initialise} from '@/config/initialise'

export default {
    name: 'log',
    data () {
        return {
            value1: '',
            value2: '',
            searchCondition: new Initialise().generateSearchCondition('', 1, 25)
        }
    },
    methods: {
        fuzzy () {
            console.log(this.searchCondition)
        }
    }
}
</script>
<style lang="scss" scoped>
.col-10.title {
    margin-top: 3px;
}
</style>


