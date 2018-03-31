<template>
    <div class="normal-layout">
        <div class="search-bar">
            <div class="col-10 title">
                <div class="title">{{$t('menu.department')}}</div>
            </div>
            <div class="col-15">
                <el-input 
					:placeholder="$t('label.fuzzy')" 
                    v-model="searchCondition.fuzzy"
					@keydown.enter="fuzzy"></el-input>
            </div>
			<div class="col-10">
				<el-button type="primary" @click.native="fuzzy">{{ $t('button.search') }}</el-button>
			</div>
			<div class="col-10">
				<el-button type="warning">{{ $t('button.create') }}</el-button>
			</div>
        </div>
		<div class="table_content">
        <div class="grid-style">
			<v-data-table :data="fuzzy" :columns='columns' tree-table bordered>
				<template slot="th" slot-scope="props">
        			<strong v-if="props.column.field=='operate'">操作</strong>
        			<strong v-else v-html="props.title"></strong>
    			</template>
    			<template slot="td" slot-scope="props">
        			<div v-if="props.column.field=='operate'">
            			<v-icon type="play-circle"></v-icon>
            			<v-icon type="download"></v-icon>
            			<v-icon type="link"></v-icon>
            			<v-icon type="heart-o"></v-icon>
            			<v-icon type="share-alt"></v-icon>
        			</div>
        			<span v-else v-html="props.content"></span>
    			</template>
			</v-data-table>
		</div>
    	</div>
    </div>
</template>

<script>
import { Initialise } from '@/config/initialise'
import * as CONST from '@/config/const'
import axios from 'axios'

export default {
	name: 'department',
	created () {
		this.fuzzy()
	},
  	data () {
    	return {
			searchCondition: new Initialise().generateSearchCondition('', 0, 0),
			departmentList: [],
			columns: [
                {title: '部门名称', field: 'name'},
                {title: '负责人', field: 'director'},
                {title: '到期时间', field: 'valid_time'},
                {title: '备注', field: 'remark'},
                {title: '操作', field: 'operate'}
            ],
			obj: {
				result: []
			}
    	}
	},
	methods: {
		fuzzy () {
            let jsonStr = this.encode(JSON.stringify(this.searchCondition))
			return this.$httpPost(CONST.DEPARTMENT + CONST.FUZZY, null, {para: jsonStr})
				.then(data => {
                    let result = data.data
                    if (result.result == CONST.RESULT.success) {
                        let dataJson = this.decode(result.data)
                        let obj = JSON.parse(dataJson)
                        if (obj.data) {
                            let departmentList = obj.data
							// this.departmentList = Initialise.buildDepartment(this.departmentList)
							this.obj.result = departmentList
							console.log(this.obj)
							return this.obj
                        }
                    }
            	})
		},
		loadData () {
			return axios.get('/static/datatable.json').then(res => {
				console.log('obj is', this.obj.result)
				if (this.obj.result.length != 0)
                	return this.obj
            })
		}
	}
}
</script>

<style lang="scss" scoped>
.normal-layout {
	.search-bar {
		.title {
			// margin-top: 3px;
		}
	}
}
</style>


