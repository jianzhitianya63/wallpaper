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
import type { MyData } from '@/types/ts-demo'
import { ref } from 'vue'
import { apiGetBanner, apiGetClassify, apiGetDayRandom, apiGetNotice } from '@/api/apis'
import CommonTitle from '@/components/common-title.vue'
import CustomNavBar from '@/components/custom-nav-bar.vue'
import ThemeItem from '@/components/theme-item.vue'
import { THEME_COLORS } from '@/style/theme-constants'

const bannerList = ref([])
const dayRandom = ref([])
const noticeList = ref([])
const classifyList = ref([])

async function getBanner() {
  // const res = await uni.request({
  //   url: 'https://tea.qingnian8.com/api/bizhi/homeBanner',
  // })
  // const data = res.data as { errCode: number, data: unknown[] }
  // if (data.errCode === 0) {
  //   bannerList.value = data.data
  // }
  const res = await apiGetBanner<MyData>()
  bannerList.value = res.data
}
getBanner()

async function getDayRandom() {
  const res = await apiGetDayRandom<MyData>()
  dayRandom.value = res.data
}
getDayRandom()

async function getNotice() {
  const res = await apiGetNotice<MyData>({ select: true })
  noticeList.value = res.data
}
getNotice()

async function getClassify() {
  const res = await apiGetClassify<MyData>({ select: true, page: 1, pageSize: 8 })
  // 只获取前8个元素
  classifyList.value = res.data.slice(0, 8)
}
getClassify()

const themeColors = ref(THEME_COLORS['--uno-brand-primary'])
</script>

<template>
  <view>
    <custom-nav-bar title="推荐" />
    <view class="w-750rpx py-30rpx">
      <swiper class="h-340rpx w-750rpx" circular indicator-dots indicator-color="#fff" indicator-active-color="#000" autoplay>
        <swiper-item v-for="(item, index) in bannerList" :key="index" class="h-100% w-100% px-30rpx">
          <image :src="item.picurl" mode="aspectFill" class="h-100% w-100% rounded-10rpx" />
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
        <swiper-item v-for="item in noticeList" :key="item._id" class="h-100% overflow-hidden text-ellipsis whitespace-nowrap text-30rpx">
          {{ item.title }}
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
        <view v-for="(item, index) in dayRandom" :key="index" class="mr-15rpx inline-block h-430rpx w-200rpx last:mr-0">
          <navigator url="/pages/preview/preview" class="h-100% w-100%">
            <image
              :src="item.smallPicurl"
              mode="aspectFill"
              class="h-100% w-100% rounded-10rpx"
            />
          </navigator>
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
      <theme-item v-for="item in classifyList" :key="item._id" :item="item" />
      <theme-item is-more />
    </view>
  </view>
</template>
