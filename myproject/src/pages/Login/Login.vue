<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="setLoginWay(true)">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="setLoginWay(false)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                v-model="phone"
                placeholder="手机号"
                name="phone"
                v-validate="'required|phone'"
              />
              <span
                style="color: red"
                v-show="errors.has('phone')"
                class="help is-danger"
              >{{errors.first('phone') }}</span>
              <button
                :disabled="!rightPhone"
                @click.prevent="getCode"
                class="get_verification"
              >获取验证码</button>
              <!-- <button class="get_verification" v-show="computeTime">{{computeTime}}s</button> -->
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required|code'"
              />
              <span style="color: red">{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required|name'"
                />
                <span style="color: red">{{errors.first('name')}}</span>
              </section>
              <section class="login_verification">
                <input
                  type="tel"
                  maxlength="8"
                  placeholder="密码"
                  v-if="!showPassword"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required|pwd'"
                />
                <span style="color: red">{{errors.first('pwd')}}</span>
                <div :class="showPassword?'on':'off'" @click="switchShowPassword">
                  <div class="switch_circle" :class="{on: showPassword}"></div>
                  <span class="switch_text" v-show="showPassword">abc</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required|captcha'"
                />
                <span style="color: red">{{errors.first('captcha')}}</span>
                <img
                  class="get_verification"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                  @click="changeCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api'
export default {
  name: '',
  components: {},
  data() {
    return {
      loginWay: true, // true代表短信登陆, false密码登陆
      phone: '', //手机号
      code: '', //短信验证码
      name: '', //用户名
      pwd: '', // 密码
      captcha: '', // 图片验证码
      computeTime: 0, //计时时间
      showPassword: false // 是否显示密码
    }
  },
  computed: {
    rightPhone() {
      // 以1开头的11数字
      let reg = new RegExp(/^1\d{10}$/gi)
      let result = reg.test(this.phone)
      // console.log(reg.test(this.phone))
      return result
    }
  },
  methods: {
    setLoginWay(loginWay) {
      this.loginWay = loginWay
    },
    async login() {
      // 进行前台表单验证, 如果不通过, 提示令牌
      const { phone, code, name, pwd, captcha, isShowSms, isRightPhone } = this
      let result

      const validateNames = isShowSms
        ? ['phone', 'code']
        : ['name', 'pwd', 'captcha']
      // 进行整体表单验证
      const success = await this.$validator.validateAll(validateNames)
      if (success) {
        // 验证成功
        if (isShowSms) {
          // 如果是短信登陆
          // 全部通过了, 发短信登陆的请求
          result = await reqSmsLogin({ phone, code })
        } else {
          // 如果是密码登陆
          // 全部通过了, 密码信登陆的请求
          result = await reqPwdLogin({ name, pwd, captcha })
          // 如果失败了, 更新图形验证码
          if (result.code !== 0) {
            this.updateCaptcha()
            this.captcha = ''
          }
        }

        // 根据结果做相应处理
        if (result.code === 0) {
          // 成功了
          const user = result.data
          // 保存user(vuex的state中)
          this.$store.commit(RECEIVE_USER, user) // 查找所有vuex模块中的mutation调用
          // 跳转到个人中心
          this.$router.replace('/profile')
        } else {
          // 失败了
          alert(result.msg)
        }
      } else {
        // 验证失败
        alert('验证失败')
      }
    },

    async getCode() {
      // console.log(this.rightPhone)
      //if (this.rightPhone) {
      // 输入了合法的手机号
      // 开始倒计时
      this.computeTime = 10
      // 启动循环定时器, 每隔1s减少1
      this.intervalId = setInterval(() => {
        this.computeTime--
        //如果到时, 停止计时
        if (this.computeTime <= 0) {
          this.computeTime = 0
          clearInterval(this.intervalId)
        }
      }, 1000)
      //发送验证码
      // console.log(this.phone)
      const result = await reqSendCode(this.phone)
      console.log(result)
      // console.log(result)
      if (result.code === 0) {
        alert('短信发送成功')
      } else {
        this.computeTime = 0

        alert('短信发送失败')
        clearInterval(this.intervalId)
      }
      // }
    },
    changeCaptcha(event) {
      event.target.src = 'http://localhost:5000/captcha?time=' + Date.now()
    },
    switchShowPassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
