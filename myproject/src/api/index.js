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
//发送验证码
export const reqSendCode = phone => ajax(BASE + '/sendcode', { phone })
// 用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) =>
  ajax(BASE + '/login_pwd', { name, pwd, captcha }, 'POST')

// 手机号验证码登陆
export const reqSmsLogin = ({ phone, code }) =>
  ajax(BASE + '/login_sms', { phone, code }, 'POST')

// 根据会话获取用户信息
export const reqUser = () => ajax(BASE + '/userinfo')

// 用户登出
export const reqLogout = () => ajax(BASE + '/logout')
