<template>
  <!-- classlist -->
  <view>
    <!-- content -->
    <view class="grid grid-cols-3 gap-5rpx p-5rpx">
      <!-- item -->
      <navigator v-for="item in 10" :key="item" url="" class="h-440rpx">
        <image
          src="../../static/images/preview2.jpg"
          mode="aspectFill"
          class="block h-100% w-100%"
        />
      </navigator>
    </view>
  </view>
</template>
