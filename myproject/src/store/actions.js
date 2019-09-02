import { reqAddress, reqCategorys, reqShops } from '../api'
import { REQ_ADDRESS, REQ_CATEGORYS, REQ_SHOPS } from './mutation-type'
export default {
  //异步获取位置数据
  async getAddress({ commit, state }) {
    const result = await reqAddress(state.longitude, state.latitude)
    commit(REQ_ADDRESS, { address: result.data })
  },
  //获取食品信息
  async getCategorys({ commit }) {
    const result = await reqCategorys()
    commit(REQ_CATEGORYS, { categorys: result.data })
  },
  //获取商铺信息
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops({ latitude, longitude })
    commit(REQ_SHOPS, { shops: result.data })
  }
}
