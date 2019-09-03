import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN.js'

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '验证码'
  }
})
// 自定义验证规则
VeeValidate.Validator.extend('phone', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  // 得到错误信息的方法
  getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('code', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  // 得到错误信息的方法
  getMessage: field => field + '必须是6位'
})
VeeValidate.Validator.extend('name', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  // 得到错误信息的方法
  getMessage: field => field + '必须是填写'
})

VeeValidate.Validator.extend('pwd', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  // 得到错误信息的方法
  getMessage: field => field + '必须是填写'
})

VeeValidate.Validator.extend('captcha', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  // 得到错误信息的方法
  getMessage: field => field + '必须是填写'
})
