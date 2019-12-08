class Initialise {
    constructor () {
        this.target = {}
    }

    generateSearchCondition (fuzzy, page, limit) {
        return {fuzzy, page, limit}
    }

    operateAction (action, actionStr, target = {}, selected, selectedIndex) {
        return {action, actionStr, target, selected, selectedIndex}
    }

    static buildDepartment (departmentList) {
        return departmentList
    }
}

export {Initialise}
