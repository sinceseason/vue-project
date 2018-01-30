let Base64 = require('js-base64').Base64

const util = {
  install: function (Vue) {
    // en/de code
    Vue.prototype.encode = function (val) {
      return Base64.encode(val)
    }
    Vue.prototype.decode = function (val) {
      return Base64.decode(val)
    }
    // toaster & modal
    Vue.prototype.showBasicNotify = function (obj) {
      this.$notify({
        type: obj.type,
        title: obj.title,
        message: obj.message,
        duration: obj.duration
      })
    }
    // Vue.prototype.showBasicMessageBox = function (obj) {
    //     this.
    // }
  }
}

export default util
