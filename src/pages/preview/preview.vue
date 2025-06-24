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
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system'

const maskState = ref(false)
function maskChange() {
  maskState.value = !maskState.value
}

const infoPopup = ref(null)
function clickInfo() {
  infoPopup.value.open()
}

function closeInfo() {
  infoPopup.value.close()
}

const scorePopup = ref(null)
function clickScore() {
  scorePopup.value.open()
}

function closeScore() {
  scorePopup.value.close()
}

const userScore = ref(5)
function onChange(e: any) {
  userScore.value = e.value
}

function confirmScore() {
  console.log(userScore.value)
}

function goBack() {
  uni.navigateBack()
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
      <view
        class="absolute left-30rpx w-38px center border-base rounded-full bg-black/50 backdrop-blur-lg"
        :style="{ top: `${getStatusBarHeight()}px`, height: `${getTitleBarHeight()}px` }"
        @click="goBack()"
      >
        <uni-icons type="back" size="20" color="#fff" />
      </view>
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
        <view
          class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2"
          @click="clickInfo()"
        >
          <uni-icons type="info" size="23" />
          <view>信息</view>
        </view>
        <view>
          <view
            class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2"
            @click="clickScore()"
          >
            <uni-icons type="star" size="23" />
            <view>评分</view>
          </view>
        </view>
        <view>
          <view class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2">
            <uni-icons type="download" size="23" />
            <view>下载</view>
          </view>
        </view>
      </view>
      <uni-popup ref="infoPopup" type="bottom">
        <!-- infoPopup -->
        <view class="rounded-t-lg bg-white p-30rpx">
          <!-- popHeader -->
          <view class="flex items-center justify-between">
            <view />
            <view class="text-size=26rpx text-color2">
              壁纸信息
            </view>
            <!-- close -->
            <view class="p-10rpx" @click="closeInfo()">
              <uni-icons type="closeempty" size="23" color="#999" />
            </view>
          </view>

          <scroll-view scroll-y class="max-h-60vh">
            <!-- content -->
            <view>
              <!-- row -->
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  壁纸ID:
                </view>
                <view selectable class="flex-1">
                  1234567890
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  分类:
                </view>
                <view selectable class="flex-1 text-primary">
                  明星美女
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  发布者:
                </view>
                <view selectable class="flex-1">
                  壁纸发布者
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  评分:
                </view>
                <view selectable class="flex flex-1 items-center">
                  <uni-rate readonly touchable :value="3.5" size="16" />
                  <view class="pl-10rpx text-size-26rpx text-color2">
                    5分
                  </view>
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  摘要:
                </view>
                <view selectable class="flex-1">
                  摘要内容摘要内容摘要内容摘要内容
                  摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容
                  摘要内容摘要内容摘要内容摘要内容
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  标签:
                </view>
                <view selectable class="flex flex-wrap">
                  <view class="mb-10rpx mr-10rpx border-base rounded-40rpx px-10rpx py-30rpx text-size-22rpx color-primary leading-1">
                    标签名
                  </view>
                  <view class="mb-10rpx mr-10rpx border-base rounded-40rpx px-10rpx py-30rpx text-size-22rpx color-primary leading-1">
                    标签名
                  </view>
                  <view class="mb-10rpx mr-10rpx border-base rounded-40rpx px-10rpx py-30rpx text-size-22rpx color-primary leading-1">
                    标签名
                  </view>
                  <view class="mb-10rpx mr-10rpx border-base rounded-40rpx px-10rpx py-30rpx text-size-22rpx color-primary leading-1">
                    标签名
                  </view>
                  <view class="mb-10rpx mr-10rpx border-base rounded-40rpx px-10rpx py-30rpx text-size-22rpx color-primary leading-1">
                    标签名
                  </view>
                </view>
              </view>
            </view>

            <view class="my-20rpx rounded-10rpx bg-color2/10 p-20rpx text-size-28rpx color-color2 leading-7">
              声明: 谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢谢
            </view>
          </scroll-view>
        </view>
      </uni-popup>

      <uni-popup ref="scorePopup" :is-mask-click="false">
        <!-- scorePopup -->
        <view class="w-70vw rounded-30rpx bg-white p-30rpx">
          <view class="flex items-center justify-between">
            <view />
            <view class="text-size=26rpx text-color2">
              壁纸评分
            </view>
            <!-- close -->
            <view class="p-10rpx" @click="closeScore()">
              <uni-icons type="closeempty" size="23" color="#999" />
            </view>
          </view>

          <!-- content -->
          <view class="center py-30rpx">
            <uni-rate v-model="userScore" allow-half @change="onChange" />
            <text class="w-80rpx pl-10rpx text-right color-[#FFCA3E] leading-1">
              {{ userScore }}分
            </text>
          </view>

          <view class="center">
            <button type="default" size="mini" plain :disabled="userScore === 0" @click="confirmScore()">
              确认评分
            </button>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>
