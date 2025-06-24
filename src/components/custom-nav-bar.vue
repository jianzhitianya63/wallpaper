<script setup lang="ts">
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <!-- layout -->
  <view class="relative">
    <!-- navbar -->
    <view class="navbar fixed left-0 right-0 top-0 z-10">
      <!-- statusbar -->
      <view :style="{ height: `${getStatusBarHeight()}px` }" />
      <!-- titlebar -->
      <view class="h-100rpx flex items-center p-30rpx" :style="{ height: `${getTitleBarHeight()}px` }">
        <view class="text-size-40rpx text-black font-medium">
          {{ title }}
        </view>
        <view class="ml-30rpx h-50rpx w-220rpx flex items-center border-base rounded-60rpx bg-white/40, text-size-28rpx color-[#999]">
          <uni-icons class="ml-5rpx" type="search" color="#888" size="20" />
          <text class="pl-10rpx">
            搜索
          </text>
        </view>
      </view>
    </view>

    <!-- fill -->
    <view :style="{ height: `${getTitleBarHeight() + getStatusBarHeight()}px` }" />
  </view>
</template>

<style scoped lang="scss">
    .navbar {
        background:
        linear-gradient(to bottom, transparent, #fff 400rpx),
        linear-gradient(to right, rgb(14,165,233), rgb(99,102,241));
    }
</style>
