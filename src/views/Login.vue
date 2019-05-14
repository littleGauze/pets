<template>
  <div class="login">
    <div class="header">
      <Avatar />
    </div>
    <div class="panel">
      <form @submit="onLogin">
        <label for="userName">
          <input
            v-ftip="unameTip"
            type="text"
            name="userName"
            placeholder="username"
          >
        </label>
        <label for="password">
          <input
            v-ftip="pwdTip"
            type="password"
            name="password"
            placeholder="password"
          >
        </label>
        <button type="submit" :disabled="logining">{{ loginText }}</button>
        <div class="extra">
          <span>haven't account yet? </span>
          <a class="register" @click.prevent="doRegister">Register</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      unameTip: null,
      pwdTip: null,
      logining: false
    }
  },
  components: {
    Avatar
  },
  computed: {
    loginText () {
      return this.logining ? 'Logining...' : 'Login'
    }
  },
  methods: {
    ...mapActions(['login']),
    onLogin (evt) {
      if (this.logining) return
      evt.preventDefault()
      const form = evt.target
      const userName = form.userName.value
      const password = form.password.value
      const check = (value, name) => {
        if (!/^[\w-]+$/.test(value)) {
          this[name] = 'character must be [ a-z, A-Z, 0-9, - ]!'
          return false
        }
        return true
      }

      this.pwdTip = null
      this.unameTip = null
      if (!userName) {
        this.unameTip = 'username is required!'
        return
      }
      if (!check(userName, 'unameTip')) return

      if (!password) {
        this.pwdTip = 'password is required!'
        return
      }
      if (!check(password, 'pwdTip')) return

      // doLogin
      this.logining = true
      this.login({ userName, password }).then(_ => {
        this.logining = false
      })
    },

    doRegister () {
      this.$store.commit('updateState', { prop: 'register', payload: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 50vh;
  margin-top: 15vh;
  .header {
    text-align: center;
  }
  .panel {
    margin-top: 20px;
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    label {
      width: 80%;
      display: inline-block;
      margin-bottom: 20px;
      input {
        width: 100%;
        height: 80px;
        font-size: 30px;
        text-indent: 20px;
        appearance: none;
        border-radius: 10px;
        border: 1px solid $bg-gray;
        box-shadow: 1px 1px 12px $bg-gray;
      }
    }
    button {
      margin-top: 30px;
      width: 80%;
      height: 80px;
      line-height: 80px;
      border-radius: 10px;
      border: 1px solid $bg-gray;
      color: #fff;
      font-weight: bold;
      font-size: 32px;
      background-color: $fc-minor;
      box-shadow: 1px 1px 12px $bg-gray;
    }
    .extra {
      margin-top: 10px;
      span {
        font-size: 22px;
        margin-right: 10px;
        color: $fc-minor;
        vertical-align: top;
      }
      a.register {
        display: inline-block;
        float: right;
        color: $fc-main;
        font-size: 25px;
        text-decoration: underline;
      }
    }
  }
}
</style>
