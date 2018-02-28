import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from './modules/user-info'
import auth from './modules/auth'
import department from './modules/department'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userInfo,
        auth,
        department
    }
})
