<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.show" />
  </div>
</template>
<script>
import FooterGuide from './components/FooterGuide.vue'

import { reqAddress, reqCategorys } from './api'

export default {
  // async mounted() {
  //   const result = await reqAddress('116.36867', '40.10038')
  //   console.log(result.data)
  // },
  name: '',
  components: {
    FooterGuide
  },
  mounted() {
    this.$store.dispatch('getAddress')
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'></style>
