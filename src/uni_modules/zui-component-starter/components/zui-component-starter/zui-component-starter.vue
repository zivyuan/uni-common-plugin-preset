<template>
  <view class="zui-component-starter">
    <view class="wrapper" :style="style">
      zui-component-starter-name
    </view>
  </view>
</template>

<script>
export default {
  name: 'zui-component-starter',

  props: {},

  data() {
    return {}
  },

  computed: {
    style() {
      const style = {};

      return Object.keys(style)
        .map(key => `${key}:${style[key]}`)
        .join('; ')
    }
  },

  methods: {}
}
</script>

<style scoped lang="scss">
// .zui-component-starter {
// }
</style>