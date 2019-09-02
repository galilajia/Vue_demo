import { REQ_ADDRESS, REQ_CATEGORYS, REQ_SHOPS } from './mutation-type'

export default {
  [REQ_ADDRESS](state, { address }) {
    state.address = address
  },
  [REQ_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },
  [REQ_SHOPS](state, { shops }) {
    state.shops = shops
  }
}
