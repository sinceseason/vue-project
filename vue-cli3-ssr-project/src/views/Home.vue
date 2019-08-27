<template>
  <div class="home">
    <div>this is home page</div>
    <div>{{item}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  // components: {
  //   HelloWorld
  // },
  asyncData({store, route}) {
    return store.dispatch('fetchItem', route.query.id)
  },
  computed: {
    item() {
      return this.$store.state.items[this.$route.query.id]
    }
  }
};
</script>
