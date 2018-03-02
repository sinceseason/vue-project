import * as CONST from '../const'

function $isAuthorized (key) {
    return this.$store.getters.auth[key] || false
}

function $loadBasicData (loginedUser, fromLogin, toStateUrl) {
    let requireArr = [
        this.$httpPost(CONST.ROLE, loginedUser.roleId),
        this.$httpPost(CONST.MENU, 'client'),
        this.$httpPost(CONST.DEPARTMENT),
        this.$httpPost(CONST.ANALYSISDEVICE)
    ]
    this.$httpAll(requireArr).then(data => {
        let i = 0
        for (let val of data) {
            let result = val.data
            if (result.result === CONST.RESULT.success && result.data) {
                let dataJson = this.decode(result.data)
                switch (i) {
                    case 0:
                        let authorizationList = JSON.parse(dataJson)
                        if (authorizationList != null) {
                            this.$store.dispatch('auth', authorizationList)
                        }
                        break
                    case 1:
                        let menuList = JSON.parse(dataJson)
                        this.$store.dispatch('menu', menuList)
                        break
                    case 2:
                        let departmentList = JSON.parse(dataJson)
                        this.$store.dispatch('department', departmentList)
                        break
                    default:
                        break
                }
            }
            i++
        }
    })
    if (fromLogin) {
        this.$selectMenu(this.$store.getters.menuList[0], true)
    } else if (toStateUrl !== '/login') {
        this.$findMainMenu(toStateUrl)
    }
}

function $selectMenu (menu, forceRedirect) {
    let menuListNow = this.$store.getters.menuList
    if (menuListNow && menuListNow.length > 0) {
        menuListNow.forEach(function (item) {
            if (item.main === menu.main || menu.parentId === item.id)
                item.selected = true
            else
                item.selected = false
        })
        this.$store.dispatch('updateMenu', menuListNow)
        switch (menu.main) {
            case 'analysis':
                let found = false
                for (let i of menu.subMenu.keys()) {
                    if (found)
                        break
                    if (this.$isAuthorized(menu.subMenu[i].caption)) {
                        for (let j = 0; j < menu.subMenu[i].subMenu.length; j++) {
                            if (this.$isAuthorized(menu.subMenu[i].subMenu[j].main)) {
                                found = true
                                this.$router.replace({name: menu.subMenu[i].subMenu[j].main})
                                break
                            }
                        }
                    }
                }
                if (!found)
                    this.$router.replace({name: 'analysis'})
                break
            default:
                if (menu.subMenu.length > 0) {
                    for (let i = 0; i < menu.subMenu.length; i++) {
                        if (this.$isAuthorized(menu.subMenu[i].main)) {
                            if (forceRedirect)
                                this.$router.replace({name: menu.subMenu[i].main})
                            break
                        }
                    }
                } else
                    this.$router.replace({name: menu.main})
        }
    }
}

function $findMainMenu (toUrl) {
    let menuListNow = this.$store.getters.menuList
    if (menuListNow && menuListNow.length > 0) {
        let m = toUrl.replace('/', '')
        menuListNow.forEach(function (item) {
            item.selected = this.$compareMenu(item, m)
        })
        this.$store.dispatch('updateMenu', menuListNow)
    }
}

function $compareMenu (menu, url) {
    if (menu.main === url)
        return true
    let result = false
    function getSubMenu (menu) {
        if (menu.subMenu.length > 0) {
            for (let value of menu.subMenu.values()) {
                if (value.main === url) {
                    result = true
                    break
                }
                getSubMenu(value)
            }
        }
    }
    getSubMenu(menu)
    return result
}

export default {
    $isAuthorized,
    $loadBasicData,
    $selectMenu,
    $findMainMenu,
    $compareMenu
}
