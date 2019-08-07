import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    //刷新token
    refreshToken(){
      try{
        let token = localStorage.token
      }catch (e) {
        alert('无法刷新token异常！');
        return false;
      }
      axios.get('refresh_token').then(response => {

      });
    },
  },
  actions: {

  }
})
