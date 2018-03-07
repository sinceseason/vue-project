<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    '$route' (to, from) {
      if (to.name === 'login' && from.name != null) {
        this.$redirectToLoginPage()
      } else if (to.name != null && from.name == null) {
        if (sessionStorage.loginedUser !== undefined) {
          let loginedUser = JSON.parse(sessionStorage.loginedUser)
          let toPath = to.path.replace('/nav', '')
          this.$loadBasicData(loginedUser, false, toPath)
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>
