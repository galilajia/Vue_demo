import ajax from './ajax'
//函数的返回值是promise
//经纬度
const BASE = '/api'
export const reqAddress = (longitude, latitude) =>
  ajax(BASE + `/position/${latitude},${longitude}`)
//食品列表
export const reqCategorys = () => ajax(BASE + '/index_category')

//根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) =>
  ajax(BASE + '/shops', { latitude, longitude })

// reqAddress('116.36867', '40.10038').then(result => {
//   console.log(result)
// })
