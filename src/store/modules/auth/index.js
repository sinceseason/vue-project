import {
	AUTH,
	MENU,
	UPDATEMENU
} from '../../mutation_types'

export default {
	state: {
		auth: {},
		menuDictionary: {},
		menuList: []
	},
	getters: {
		auth: state => state.auth,
		menuDictionary: state => state.menuDictionary,
		menuList: state => state.menuList
	},
	mutations: {
		[AUTH] (state, authorizationList) {
			for (let elem of authorizationList) {
				state.auth[elem.auth_key] = true
			}
		},
		[MENU] (state, menuList) {
			state.menuList = menuList
			function getSubMenu (menu) {
				menu.showSubMenu = false
				state.menuDictionary[menu.caption] = menu
				if (menu.subMenu.length > 0) {
					menu.subMenu.forEach(function (item) {
						if (item.active === 1 && (state.auth[item.main] || false))
							menu.showSubMenu = true
						getSubMenu(item)
					})
				}
			}
			menuList.forEach(function (menu) {
				getSubMenu(menu)
			})
		},
		[UPDATEMENU] (state, menuList) {
			state.menuList = menuList
		}
	},
	actions: {
		auth ({commit}, list) {
			commit(AUTH, list)
		},
		menu ({commit}, list) {
			commit(MENU, list)
		},
		updateMenu ({commit}, list) {
			commit(UPDATEMENU, list)
		}
	}
}