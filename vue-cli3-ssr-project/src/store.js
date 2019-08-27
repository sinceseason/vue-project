import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function fetchItem() {
  return new Promise((resolve, reject) => {
    let arr = [1, 2, 3, 4, 5, 6];
    try {
      let rs = arr[Math.floor(Math.random() * arr.length)];
      resolve(rs);
    } catch (error) {
      reject(error)
    }
  })
}

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem({
        commit
      }, id) {
        return fetchItem().then(item => {
          commit('setItem', {
            id,
            item
          })
        })
      }
    },
    mutations: {
      setItem(state, {
        id,
        item
      }) {
        Vue.set(state.items, id, item)
      }
    }
  });
}