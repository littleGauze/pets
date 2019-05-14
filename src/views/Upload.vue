<template>
  <div class="upload">
    <div class="panel">
      <form @submit="onUpload">
        <label for="file">
          <img v-if="file" class="thumbnail" :src="thumbnail">
          <div class="marsk">
            <i class="pif icon-Cloudupload"></i>
            <span>Click here to upload</span>
            <input
              type="file"
              name="img"
              accept="image/png, image/jpeg"
              @change="handleChange"
            />
          </div>
        </label>
        <ul class="caution">
          <li>* Upload an image with type .jpg or .png.</li>
          <li :class="{ tip: showTip }">* Image must be contain a {{ user.prefer === 'cat' ? 'Cat' : 'Dog' }}.</li>
        </ul>
        <button type="submit" :disabled="uploading">{{ uploadText }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      uploading: false,
      showTip: false,
      file: null
    }
  },
  computed: {
    ...mapState(['user']),
    uploadText () {
      return this.uploading ? 'Uploading...' : 'Upload'
    },
    thumbnail () {
      return window.URL.createObjectURL(this.file)
    }
  },
  methods: {
    ...mapActions('app', ['doUpload']),
    handleChange (evt) {
      const files = evt.target.files
      this.file = files[0]
      this.showTip = false
    },
    onUpload (evt) {
      evt.preventDefault()
      if (!this.file || !this.user || this.uploading) return
      const formData = new FormData()
      formData.append('sub_id', this.user._id)
      formData.append('file', this.file)

      this.uploading = true
      this.doUpload(formData).then(res => {
        this.uploading = false
        this.$toast.success('upload success!')
      }).catch(err => {
        this.uploading = false
        const { data } = err.response
        this.$toast.error(data.message)
        if (/Classifcation failed/.test(data.message)) {
          this.showTip = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  margin-top: 15vh;
  .header {
    text-align: center;
  }
  .panel {
    margin-top: -10vw;
    margin-bottom: 10vw;
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    label {
      position: relative;
      width: 80%;
      min-height: 50vw;
      display: inline-block;
      margin-bottom: 20px;
      .marsk {
        z-index: 0;
        top: 50%;
        margin-top: -25vw;
        position: absolute;
        border: 1px dashed $fc-minor;
        border-radius: 10px;
        width: 100%;
        height: 50vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: .6;
        span {
          font-size: 25px;
          color: $fc-minor;
          white-space: nowrap;
        }
        i {
          font-size: 80px;
        }
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 50vw;
        font-size: 30px;
        text-indent: 20px;
        appearance: none;
        text-indent: 100vw;
        opacity: 0.000001;
      }
      .thumbnail {
        position: relative;
        z-index: 0;
        width: 100%;
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
    .caution {
      width: 80%;
      margin-bottom: 10px;
      li {
        text-indent: 20px;
        text-align: left;
        color: $fc-minor;
        font-size: 23px;
        &.tip {
          color: $color-red;
        }
      }
    }
  }
}
</style>
