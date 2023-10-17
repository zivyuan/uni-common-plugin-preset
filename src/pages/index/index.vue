<template>
  <view class="content">
    <view class="demo-header">
      <image class="logo" src="/static/logo.png"></image>
      <text class="title">&lt;{{ title }} /&gt;</text>
    </view>

    <view class="demo-container">
      <zui-component-starter />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'zui-component-starter',
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.demo-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 32rpx;
  box-sizing: border-box;
}

.logo {
  height: 64rpx;
  width: 64rpx;
  margin-right: 32rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.demo-container {
  width: 80%;
  margin: 0 auto;
}
</style>
