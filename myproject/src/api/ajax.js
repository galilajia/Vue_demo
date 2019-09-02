import axios from 'axios'
export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 执行异步ajax请求
    if (method === 'GET') {
      promise = axios.get(url, { params: data }) // params配置, 指定的是query参数
    } else {
      promise = axios.post(url, data)
    }
    promise.then(
      response => {
        // 如果成功了, 调用resolve()
        resolve(response.data)
      },
      error => {
        // 如果失败了, 不调用reject(), 而是提示错误信息
        alert('请求异常: ' + error.message)
      }
    )
  })
}
// /**
//  *
//  * 包含多个请求函数模块
//  * 1.处理POST请求转换为urlencode(默认是json格式)
//  */
// import axios from 'axios'
// import qs from 'qs'
// axios.interceptors.request.use(config => {
//   const { method, data } = config
//   if (method.toUpperCase() === 'POST' && data instanceof Object) {
//     config.data = qs.stringify(data)
//   }
//   return config
// })
// axios.interceptors.response.use(
//   //让成功的结果不是response 而是response.data
//   response => {
//     return response.data
//   },
//   error => {
//     alert('请求异步 ' + error.message)
//     //中断promise
//     return new Promise(() => {})
//   }
// )
// export default axios
