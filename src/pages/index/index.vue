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
import CommonTitle from '@/components/common-title.vue'
import CustomNavBar from '@/components/custom-nav-bar.vue'
import ThemeItem from '@/components/theme-item.vue'
import { THEME_COLORS } from '@/style/theme-constants'

const bannerList = [
  '/static/images/banner1.jpg',
  '/static/images/banner2.jpg',
  '/static/images/banner3.jpg',
]

const themeColors = ref(THEME_COLORS['--uno-brand-primary'])
</script>

<template>
  <view>
    <custom-nav-bar title="推荐" />
    <view class="w-750rpx py-30rpx">
      <swiper class="h-340rpx w-750rpx" circular indicator-dots indicator-color="#fff" indicator-active-color="#000" autoplay>
        <swiper-item v-for="(item, index) in bannerList" :key="index" class="h-100% w-100% px-30rpx">
          <image :src="item" mode="aspectFill" class="h-100% w-100% rounded-10rpx" />
        </swiper-item>
      </swiper>
    </view>
  </view>

  <view class="mx-auto h-80rpx w-690rpx flex rounded-50rpx bg-#f9f9f9 px-30rpx leading-80rpx">
    <view class="jusify-center w-140rpx flex items-center">
      <uni-icons type="sound-filled" :size="20" :color="themeColors" />
      <text class="text-28rpx text-primary font-bold">
        公告
      </text>
    </view>

    <view class="flex-1">
      <swiper :interval="1500" :duration="300" autoplay circular vertical class="h-100%">
        <swiper-item v-for="(item, index) in 4" :key="index" class="h-100% overflow-hidden text-ellipsis whitespace-nowrap text-30rpx">
          文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容
        </swiper-item>
      </swiper>
    </view>

    <view class="w-70rpx flex items-center justify-center">
      <uni-icons type="right" :size="16" color="#333" />
    </view>
  </view>

  <view class="pt-50rpx">
    <common-title>
      <template #name>
        <text>每日推荐</text>
      </template>
      <template #custom>
        <view class="flex items-center text-primary">
          <uni-icons type="calendar" :size="18" :color="themeColors" />
          <text class="ml-5rpx items-center text-28rpx">
            <uni-dateformat :date="Date.now()" format="dd日" />
          </text>
        </view>
      </template>
    </common-title>
    <view class="ml-30rpx mt-30rpx w-720rpx">
      <scroll-view scroll-x class="whitespace-nowrap">
        <view v-for="(item, index) in 8" :key="index" class="mr-15rpx inline-block h-430rpx w-200rpx last:mr-0">
          <image
            src="/static/images/preview1.jpg"
            mode="aspectFill"
            class="h-100% w-100% rounded-10rpx"
          />
        </view>
      </scroll-view>
    </view>
  </view>
  <view class="pt-50rpx">
    <common-title>
      <template #name>
        专题精选
      </template>
      <template #custom>
        <navigator url="" class="text-32rpx text-slate-400">
          More+
        </navigator>
      </template>
    </common-title>

    <view class="grid grid-cols-3 mt-30rpx gap-15rpx gap-15rpx px-30rpx pb-50rpx">
      <theme-item v-for="(item, index) in 8" :key=" index" />
      <theme-item is-more />
    </view>
  </view>
</template>
