<template>
  <view class="flex items-center justify-between px-30rpx">
    <view class="text-30rpx">
      <slot name="name" />
    </view>
    <view>
      <slot name="custom" />
    </view>
  </view>
</template>
