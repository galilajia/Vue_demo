import {
  REQ_ADDRESS,
  REQ_CATEGORYS,
  REQ_SHOPS,
  REQ_USER_INFO
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
  }

  // [REQ_USER_INFO](state, { userInfo }) {
  //   state.userInfo = userInfo
  // }
}
