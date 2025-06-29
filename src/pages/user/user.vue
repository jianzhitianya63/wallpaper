<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
    {
      layout: 'tabbar',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '我的',
      },
    }
</route>

<script setup>
import { THEME_COLORS } from '@/style/theme-constants'
import { getStatusBarHeight } from '@/utils/system'

const themeColors = ref(THEME_COLORS['--uno-brand-primary'])

function clickContact() {
  uni.makePhoneCall({
    phoneNumber: '17610396552',
  })
}
</script>

<template>
  <!-- 布局 -->
  <!-- 用户信息 -->
  <view :style="{ height: `${getStatusBarHeight()}px` }" />
  <view class="flex flex-col items-center justify-center py-50rpx">
    <!-- 用户头像 -->
    <view class="h-160rpx w-160rpx overflow-hidden rounded-full">
      <image src="../../static/images/xxmLogo.png" mode="aspectFill" class="h-100% w-100%" />
    </view>
    <view class="text-44rpx font-normal">
      100.100.100.100
    </view>
    <view class="text-22rpx text-slate-400">
      来自于桐木
    </view>
  </view>

  <view class="mx-auto my-50rpx w-690rpx border border-#000 rounded-20rpx shadow-xl">
    <!-- list -->
    <view class="">
      <view class="h-100rpx flex items-center justify-between border border-#000 bg-white px-30rpx">
        <!-- left -->
        <view class="flex items-center justify-center">
          <uni-icons type="download-filled" size="30" :color="themeColors" />
          <view class="pl-20rpx text-slate-500">
            我的下载
          </view>
        </view>
        <!-- right -->
        <view class="flex items-center justify-center">
          <view class="pr-10rpx text-slate-500">
            33
          </view>
          <uni-icons type="right" size="15" color="#aaa" />
        </view>
      </view>

      <view class="h-100rpx flex items-center justify-between border border-#000 bg-white px-30rpx">
        <!-- left -->
        <view class="flex items-center justify-center">
          <uni-icons type="download-filled" size="30" :color="themeColors" />
          <view class="pl-20rpx text-slate-500">
            我的下载
          </view>
        </view>
        <!-- right -->
        <view class="flex items-center justify-center">
          <view class="pr-10rpx text-slate-500">
            33
          </view>
          <uni-icons type="right" size="15" color="#aaa" />
        </view>
      </view>

      <view class="relative h-100rpx flex items-center justify-between border border-#000 bg-white px-30rpx">
        <!-- left -->
        <view class="flex items-center justify-center">
          <uni-icons type="download-filled" size="30" :color="themeColors" />
          <view class="pl-20rpx text-slate-500">
            联系客服
          </view>
          <!-- #ifdef MP -->
          <button open-type="contact" class="absolute left-0 top-0 h-100rpx w-100% opacity-0">
            联系客服
          </button>
          <!-- #endif -->
          <!-- #ifndef MP -->
          <button class="absolute left-0 top-0 h-100rpx w-100% opacity-0" @click="clickContact">
            拨打电话
          </button>
          <!-- #endif -->
        </view>
        <!-- right -->
        <view class="flex items-center justify-center">
          <view class="pr-10rpx text-slate-500">
            33
          </view>
          <uni-icons type="right" size="15" color="#aaa" />
        </view>
      </view>
    </view>
  </view>

  <view class="mx-auto my-50rpx w-690rpx border border-#000 rounded-20rpx shadow-xl">
    <!-- list -->
    <view class="">
      <!-- row -->
      <view class="h-100rpx flex items-center justify-between border border-#000 bg-white px-30rpx">
        <!-- left -->
        <view class="flex items-center justify-center">
          <uni-icons type="download-filled" size="30" :color="themeColors" />
          <view class="pl-20rpx text-slate-500">
            我的下载
          </view>
        </view>
        <!-- right -->
        <view class="flex items-center justify-center">
          <view class="pr-10rpx text-slate-500">
            33
          </view>
          <uni-icons type="right" size="15" color="#aaa" />
        </view>
      </view>

      <view class="h-100rpx flex items-center justify-between border border-#000 bg-white px-30rpx">
        <!-- left -->
        <view class="flex items-center justify-center">
          <uni-icons type="download-filled" size="30" :color="themeColors" />
          <view class="pl-20rpx text-slate-500">
            我的下载
          </view>
        </view>
        <!-- right -->
        <view class="flex items-center justify-center">
          <view class="pr-10rpx text-slate-500">
            33
          </view>
          <uni-icons type="right" size="15" color="#aaa" />
        </view>
      </view>
    </view>
  </view>
</template>
