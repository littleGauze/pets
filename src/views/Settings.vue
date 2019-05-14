<template>
  <div class="settings">
    <div class="panel">
      <Avatar :cate="prefer"/>
      <div class="name">{{ user.userName }}</div>
      <form @submit="onSave">
        <label for="prefer">
          Prefer
          <div @change="preferChange">
            <input type="radio" name="prefer" value="cat" :checked="user.prefer !== 'dog'"> Cat
            <input style="margin-left: 15px" type="radio" name="prefer" value="dog" :checked="user.prefer === 'dog'"> Dog
          </div>
        </label>
        <label for="nickName">
          Nick
          <input
            v-ftip
            type="text"
            name="nickName"
            placeholder="nick name"
            :value="user.nickName"
          >
        </label>
        <label for="bio">
          Bio
          <textarea v-ftip type="textarea" name="bio" placeholder="Add a bio" :value="user.bio"/>
          <div class="chpwd">
            <a class="cp" @click.prevent="showChpwd = !showChpwd">Change Password</a>
            <template v-if="showChpwd">
              <label for="old">
                <input v-ftip="oldpwdTip" type="password" name="oldpwd" placeholder="old password">
              </label>
              <label for="new">
                <input v-ftip="pwdTip" type="password" name="password" placeholder="new password">
              </label>
              <label for="confirm">
                <input v-ftip="confTip" type="password" name="confirm" placeholder="confirm password">
              </label>
            </template>
          </div>
        </label>
        <button type="submit" :disabled="running">{{ saveText }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { resetPosts } from '@/lib/utils'

export default {
  data () {
    return {
      running: false,
      showTip: false,
      file: null,
      edting: false,
      showChpwd: false,
      prefer: null,
      confTip: null,
      pwdTip: null,
      oldpwdTip: null
    }
  },
  components: {
    Avatar
  },
  created () {
    this.prefer = this.user.prefer || 'cat'
  },
  computed: {
    ...mapState(['user']),
    saveText () {
      return this.running ? 'Save...' : 'Save'
    }
  },
  methods: {
    ...mapActions(['updateProfile', 'logout']),
    ...mapMutations('home', ['updateState']),
    handleChange (evt) {
      const files = evt.target.files
      this.file = files[0]
      this.showTip = false
    },
    onSave (evt) {
      if (this.running) return
      evt.preventDefault()
      const form = evt.target
      const nickName = form.nickName.value.trim()
      const prefer = form.prefer.value
      const bio = form.bio.value.trim()

      this.oldpwdTip = null
      this.pwdTip = null
      this.confTip = null

      let oldpwd = null
      let password = null
      if (this.showChpwd) {
        oldpwd = form.oldpwd.value
        password = form.password.value.trim()
        const confirm = form.confirm.value.trim()
        if (!oldpwd) {
          this.oldpwdTip = 'password is required!'
          return
        }
        if (oldpwd.length < 6) {
          this.oldpwdTip = 'password length must be greater than 6!'
          return
        }

        if (!password) {
          this.pwdTip = 'password is required!'
          return
        }
        if (password.length < 6) {
          this.pwdTip = 'password length must be greater than 6!'
          return
        }
        if (!confirm) {
          this.confTip = 'confirm password is required!'
          return
        }
        if (password !== confirm) {
          this.confTip = 'two password are not match!'
          return
        }
      }

      const u = this.user
      const data = {
        id: u._id,
        nickName,
        prefer,
        bio,
        oldpwd,
        password
      }

      if (
        bio === u.bio &&
        nickName === u.nickName &&
        prefer === u.prefer &&
        !oldpwd
      ) {
        this.$toast('nothing changed!')
        return
      }

      this.running = true
      const oldPrefer = u.prefer
      this.updateProfile(data).then(res => {
        this.running = false

        // reset posts as empty
        if (oldPrefer !== prefer) resetPosts()
      })
    },
    preferChange (evt) {
      this.prefer = evt.target.value || 'cat'
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  .header {
    text-align: center;
  }
  .panel {
    padding: 60px;
    text-align: left;
    .name {
      font-size: 40px;
      margin-bottom: 50px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    label {
      width: 100%;
      position: relative;
      display: inline-block;
      margin-bottom: 20px;
      text-align: left;
      margin-bottom: 30px;
      input[type=text],
      input[type=password] {
        display: block;
        width: 80%;
        font-size: 30px;
        text-indent: 20px;
        border: 1px solid $bg-gray;
        border-radius: 5px;
        height: 60px;
        line-height: 60px;
        appearance: none;
      }
      textarea {
        display: block;
        width: 80%;
        text-indent: 20px;
        vertical-align: top;
        border: 1px solid $bg-gray;
        border-radius: 5px;
        min-height: 120px;
        margin-bottom: 20px;
        line-height: normal;
      }
    }
    .chpwd label {
      margin-bottom: 20px;
    }
    button {
      margin-top: 20px;
      width: 30vw;
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
    a {
      font-size: 36px;
      color: $color-main;
      text-decoration: underline;
      &.cp {
        display: block;
        font-size: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
