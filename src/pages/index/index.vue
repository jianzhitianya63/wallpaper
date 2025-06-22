<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<script lang="ts" setup>
const bannerList = [
  '/static/images/banner1.jpg',
  '/static/images/banner2.jpg',
  '/static/images/banner3.jpg',
]
</script>

<template>
  <view>
    <view class="w-750rpx py-30rpx">
      <swiper class="h-340rpx w-750rpx" circular indicator-dots indicator-color="#fff" indicator-active-color="#000" autoplay>
        <swiper-item v-for="(item, index) in bannerList" :key="index" class="h-100% w-100% px-30rpx">
          <image :src="item" mode="aspectFill" class="h-100% w-100% rounded-10rpx" />
        </swiper-item>
      </swiper>
    </view>
  </view>

  <view class="">
    <view />
    <view />
    <view />
  </view>
</template>
