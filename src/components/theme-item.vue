<script lang="ts" setup>
defineProps({
  isMore: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <view>
    <navigator
      v-if="!isMore"
      url=""
      class="relative h-340rpx overflow-hidden rounded-10rpx"
    >
      <image class="h-100% w-100%" src="../static/images/classify1.jpg" mode="aspectFill" />

      <view class="absolute bottom-0 left-0 h-70rpx w-100% flex items-center justify-center bg-black/20 text-30rpx text-white font-semibold backdrop-blur-lg">
        明星美女
      </view>
      <view class="absolute left-0 top-0 rounded-br-lg bg-orange-500/70 px-14rpx py-6rpx text-22rpx text-white backdrop-blur-lg">
        3天前更新
      </view>
    </navigator>

    <navigator
      v-else
      url=""
      class="relative h-340rpx overflow-hidden rounded-10rpx"
    >
      <image class="h-100% w-100%" src="../static/images/more.jpg" mode="aspectFill" />

      <view class="absolute bottom-0 left-0 h-100% w-100% flex flex-col items-center justify-center bg-black/20 text-28rpx text-white font-semibold backdrop-blur-lg">
        <uni-icons type="more-filled" size="24" color="#fff" />
        <text>更多</text>
      </view>
    </navigator>
  </view>
</template>
