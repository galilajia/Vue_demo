import {
  REQ_ADDRESS,
  REQ_CATEGORYS,
  REQ_SHOPS,
  RECEIVE_USER,
  RESET_USER
} from './mutation-type'

export default {
  //重新赋值
  [REQ_ADDRESS](state, { address }) {
    state.address = address
  },
  [REQ_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },
  [REQ_SHOPS](state, { shops }) {
    state.shops = shops
  },

  [RECEIVE_USER](state, { user }) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  }
}
