<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
    {
      layout: 'custom',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '预览',
      },
    }
</route>

<script setup lang="ts">
import { ref } from 'vue'

const maskState = ref(false)
function maskChange() {
  maskState.value = !maskState.value
}
</script>

<template>
  <!-- preview -->
  <view class="relative h-100vh w-100%">
    <swiper class="h-100% w-100%" circular>
      <swiper-item v-for="item in 5" :key="item" class="h-100% w-100%">
        <image src="../../static/images/preview1.jpg" mode="aspectFill" class="h-100% w-100%" @click="maskChange()" />
      </swiper-item>
    </swiper>

    <!-- mask -->
    <view v-if="maskState" class="">
      <view>图标</view>
      <view class="absolute left-0 right-0 top-10vh m-auto w-fit rounded-40rpx px-28rpx py-8rpx text-size-28rpx color-white backdrop-blur-lg">
        3 / 9
      </view>
      <view class="absolute left-0 right-0 top-[calc(10vh+80rpx)] m-auto w-fit text-size-140rpx text-white font-light shadow">
        <uni-dateformat :date="Date.now()" format="hh:mm" />
      </view>
      <view class="absolute left-0 right-0 top-[calc(10vh+250rpx)] m-auto w-fit text-size-34rpx text-white shadow">
        <uni-dateformat :date="Date.now()" format="MM月dd日" />
      </view>
      <view class="absolute bottom-10vh left-0 right-0 m-auto h-120rpx w-65vw flex items-center justify-around rounded-120rpx bg-white/80 shadow">
        <view class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2">
          <uni-icons type="info" size="23" />
          <view>信息</view>
        </view>
        <view>
          <view class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2">
            <uni-icons type="star" size="23" />
            <view>信息</view>
          </view>
        </view>
        <view>
          <view class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2">
            <uni-icons type="download" size="23" />
            <view>信息</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
