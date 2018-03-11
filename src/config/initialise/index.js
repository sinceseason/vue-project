class Initialise {
    generateSearchCondition (fuzzy, page, pageSize) {
        return {fuzzy, page, pageSize}
    }

    operateAction (action, actionStr, target, selected, selectedIndex) {
        return {action, actionStr, target, selected, selectedIndex}
    }
}

export {Initialise}