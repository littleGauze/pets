<template>
  <div class="register">
    <div class="header">
      <Avatar />
    </div>
    <div class="panel">
      <form @submit="onRegister">
        <label for="userName">
          <input v-ftip="unameTip" type="text" name="userName" placeholder="username">
        </label>
        <label for="password">
          <input v-ftip="pwdTip" type="password" name="password" placeholder="password">
        </label>
        <label for="confirm">
          <input v-ftip="confTip" type="password" name="confirm" placeholder="confirm">
        </label>
        <button type="submit" :disabled="registering">{{ regText }}</button>
        <div class="extra">
          <span>have account already? </span>
          <a class="login" @click.prevent="doLogin">Login</a>
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
      confTip: null,
      registering: false
    }
  },
  components: {
    Avatar
  },
  computed: {
    regText () {
      return this.registering ? 'Registering...' : 'Register'
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister (evt) {
      if (this.registering) return
      evt.preventDefault()
      const form = evt.target
      const userName = form.userName.value
      const password = form.password.value
      const confirm = form.confirm.value
      const check = (value, name) => {
        if (!/^[\w-]+$/.test(value)) {
          this[name] = 'character must be [ a-z, A-Z, 0-9, - ]!'
          return false
        }
        return true
      }

      this.unameTip = null
      this.pwdTip = null
      this.confTip = null

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
      if (password.length < 6) {
        this.pwdTip = 'password length must be greater than 6!'
        return
      }

      if (!confirm) {
        this.confTip = 'confirm password is required!'
        return
      }
      if (!check(confirm, 'confTip')) return
      if (password !== confirm) {
        this.confTip = 'two password are not match!'
        return
      }

      this.registering = true
      this.register({ userName, password }).then(_ => {
        this.registering = false
      })
    },

    doLogin () {
      this.$store.commit('updateState', { prop: 'register', payload: null })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
      outline: none;
      box-shadow: 1px 1px 12px $bg-gray;
    }
    .extra {
      margin-top: 10px;
      span {
        font-size: 22px;
        margin-right: 10px;
        vertical-align: top;
        color: $fc-minor;
      }
      a.login {
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
