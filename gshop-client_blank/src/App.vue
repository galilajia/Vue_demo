<template>
  <div>
    <router-view></router-view>
    <FooterGuide />
  </div>
</template>
<script>
import FooterGuide from './components/FooterGuide.vue'

// import { reqAddress } from './api'

export default {
  // async mounted() {
  //   const result = await reqAddress('116.36867', '40.10038')
  //   if (result.code === 0) {
  //     console.log(result.data)
  //   }
  // },
  name: '',
  components: {
    FooterGuide
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'></style>
