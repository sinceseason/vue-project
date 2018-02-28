import {
	DEPARTMENT
} from '../../mutation_types'

export default {
	state: {
        departmentDictionary: {},
        departmentRange: []
	},
	getters: {
        departmentDictionary: state => state.departmentDictionary,
        departmentRange: state => state.departmentRange
	},
	mutations: {
        [DEPARTMENT] (state, departmentList) {
            function buildChildren (department) {
                state.departmentDictionary[department.id] = department
                state.departmentRange.push(department.id)
                if (department.children) {
                    department.children.forEach(element => {
                        buildChildren(element)
                    })
                }
            }
            buildChildren(departmentList)
        }
	},
	actions: {
        department ({commit}, list) {
            commit(DEPARTMENT, list)
        }
	}
}