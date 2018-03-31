<template>
    <div class="normal-layout">
        <div class="search-bar">
            <div class="col-10 title">
                <div class="title">{{$t('menu.log')}}</div>
            </div>
            <div class="col-25">
                <el-date-picker 
                    v-model="searchCondition.beginDate"
                    value-format="timestamp"
                    type="datetime" :placeholder="$t('label.start_date')"></el-date-picker>
            </div>
            <div class="col-25">
                <el-date-picker
                    v-model="searchCondition.endDate"
                    value-format="timestamp"
                    type="datetime" :placeholder="$t('label.end_date')"></el-date-picker>
            </div>
            <div class="col-15">
                <el-input type="text" id="logFuzzy" :placeholder="$t('label.fuzzy')"
                   v-model="searchCondition.fuzzy"
                   @change="searchCondition.page = 1"></el-input>
            </div>
            <div class="col-10">
                <el-button type="primary" @click="fuzzy">{{$t('button.search')}}</el-button>
            </div>
        </div>
        <div class="table-content">
            <el-table border style="width: 100%" height="100%"
                :data="logList"
                v-loading="loading"
                :element-loading-text="$t('message.loading')"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" width="70" align="center"></el-table-column>
                <el-table-column :label="this.$t('grid.module')" width="100">
                    <template slot-scope="scope">
                        <span>{{ $t(scope.row.module) }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="this.$t('grid.op_type')" width="150">
                    <template slot-scope="scope">
                        <span>{{ $t(scope.row.type) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" :label="this.$t('grid.op_user_name')"></el-table-column>
                <el-table-column prop="departmentId" :label="this.$t('grid.department_name')">
                    <template slot-scope="scope">
                        <span>{{ scope.row.departmentId == 0 ? $t('label.administrator') : getDeptName(scope.row.departmentId) }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="this.$t('grid.op_date')">
                    <template slot-scope="scope">
                        <span>{{ scope.row.date | timeToFullDateFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ip" :label="this.$t('grid.ip')"></el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    background
                    :total=totalCount
                    :current-page=searchCondition.page
                    :page-sizes="[25, 50, 100]"
                    :page-size=searchCondition.limit
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>    
    </div>
</template>

<script>
import {Initialise} from '@/config/initialise'
import * as CONST from '@/config/const'

export default {
    name: 'log',
    created () {
        this.fuzzy()
    },
    data () {
        return {
            searchCondition: new Initialise().generateSearchCondition('', 1, 25),
            logList: [],
            deptName: '',
            loading: true,
            totalCount: 0
        }
    },
    methods: {
        fuzzy () {
            if (this.searchCondition.endDate != null && this.searchCondition.beginDate != null && this.searchCondition.endDate < this.searchCondition.beginDate) {
                this.showBasicNotify({type: 'error', title: '', message: this.$t('message.end_date_error'), duration: 2000})
                return
            } else if (this.searchCondition.endDate != null && this.searchCondition.beginDate != null && (this.searchCondition.endDate - this.searchCondition.beginDate) > (30 * 24 * 60 * 60 * 1000)) {
                this.showBasicNotify({type: 'error', title: '', message: this.$t('message.thirty_day'), duration: 2000})
                return
            }
            this.loading = true
            let jsonStr = this.encode(JSON.stringify(this.searchCondition))
            this.$httpPost(CONST.LOG + CONST.FUZZY, null, {para: jsonStr})
                .then(data => {
                    let result = data.data
                    if (result.result == CONST.RESULT.success) {
                        let dataJson = this.decode(result.data)
                        let obj = JSON.parse(dataJson)
                        this.logList = obj.data
                        if (obj.totalCount == 0)
                            this.totalCount = 1
                        else
                            this.totalCount = obj.totalCount
                    }
                    this.loading = false
            }).catch(error => {
                if (error)
                    console.log(error)
                this.loading = false
            })
        },
        getDeptName (id) {
            return this.$store.getters.departmentDictionary[id].name
        },
        handleSizeChange (val) {
            this.searchCondition.limit = val
            this.fuzzy()
        },
        handleCurrentChange (val) {
            this.searchCondition.page = val
            this.fuzzy()
        }
    }
}
</script>
<style lang="scss" scoped>
.normal-layout {
    margin-bottom: 30px;
    .col-10.title {
        margin-top: 3px;
    }
    .table-content {
        .page {
            margin-top: 10px;
        }
    }
}
</style>


