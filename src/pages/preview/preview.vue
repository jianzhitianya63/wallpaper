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
import type { MyData } from '@/types/ts-demo'
import { onShareAppMessage } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { apiConfirmScore, apiGetWallInfo } from '@/api/apis'
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system'

const maskState = ref(false)
let storageClassList = uni.getStorageSync('classifyList') || []
const readIndexList = ref([])
const currentId = ref(null)
const currentIndex = ref(0)
const currentInfo = ref(null)
const isScore = ref(false)
const type = ref('')

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

const userScore = ref(0)

async function confirmScore() {
  uni.showLoading({
    title: '加载中...',
  })
  const { _id: wallId, classid } = currentInfo.value
  await apiConfirmScore({ classid, wallId, userScore: userScore.value.toString() })
  uni.hideLoading()
  uni.showToast({
    title: '评分成功',
    icon: 'success',
  })
  // 刷新storageClassList中的数据
  storageClassList.forEach((item: any) => {
    if (item._id === currentInfo.value._id) {
      item.userScore = userScore.value
    }
  })
  uni.setStorageSync('classifyList', storageClassList)
  // 不可用评分
  isScore.value = true
  // 刷新评分
  currentInfo.value.score = userScore.value
  closeScore()
}

function goBack() {
  if (type.value === 'share') {
    uni.reLaunch({
      url: `/pages/index/index`,
    })
  }
  else {
    uni.navigateBack()
  }
}

storageClassList = storageClassList.map((item: any, index: number) => {
  return {
    ...item,
    picurl: item.smallPicurl.replace('_small.webp', '.jpg'),
  }
})

onLoad(async (options) => {
  currentId.value = options.currentId
  console.log(options.currentId)
  if (options.type === 'share') {
    type.value = 'share'
    const res = await apiGetWallInfo<MyData>({ id: currentId.value })
    storageClassList = res.data.map((item: any, index: number) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace('_small.webp', '.jpg'),
      }
    })
  }
  console.log(storageClassList)
  currentIndex.value = storageClassList.findIndex((item: any) => item._id === currentId.value)
  pushReadIndexList(currentIndex.value)
  currentInfo.value = storageClassList[currentIndex.value]
  if (currentInfo.value && currentInfo.value.userScore) {
    userScore.value = currentInfo.value.userScore
    isScore.value = true
  }
  else {
    userScore.value = 0
    isScore.value = false
  }
})

function swiperChange(e: any) {
  currentIndex.value = e.detail.current
  pushReadIndexList(currentIndex.value)
  currentInfo.value = storageClassList[currentIndex.value]
  if (currentInfo.value.userScore) {
    userScore.value = currentInfo.value.userScore
    isScore.value = true
  }
  else {
    userScore.value = 0
    isScore.value = false
  }
}

function pushReadIndexList(index: number) {
  readIndexList.value.push(index - 1, index, index + 1)
}

function download() {
  // #ifdef H5
  uni.showToast({
    title: 'H5不支持下载',
    icon: 'none',
  })
  // #endif
  // #ifndef H5
  uni.showLoading({
    title: '下载中...',
    mask: true,
  })
  uni.getImageInfo({
    src: currentInfo.value.picurl,
    success(image) {
      uni.saveImageToPhotosAlbum({
        filePath: image.path,
        success() {
          uni.showToast({
            title: '保存成功',
            icon: 'success',
          })
        },
        fail(error) {
          console.log(error.errMsg)
          if (error.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
            uni.showToast({
              title: '取消保存',
              icon: 'none',
            })
            return
          }
          uni.showModal({
            title: '提示',
            content: '需要授权保存相册',
            success: (res) => {
              if (res.confirm) {
                uni.openSetting({
                  success: (setting) => {
                    if (setting.authSetting['scope.writePhotosAlbum']) {
                      uni.saveImageToPhotosAlbum({
                        filePath: image.path,
                        success() {
                          uni.showToast({
                            title: '保存成功',
                            icon: 'success',
                          })
                        },
                        fail() {
                          uni.showToast({
                            title: '获取权限失败',
                            icon: 'error',
                          })
                        },
                      })
                    }
                  },
                })
              }
            },
            fail() {
              uni.showToast({
                title: '获取权限失败',
                icon: 'error',
              })
            },
          })
        },
        complete() {
          uni.hideLoading()
        },
      })
    },
  })
  // #endif
}

onShareAppMessage((res) => {
  if (res.from === 'button') {
    // 来自页面内分享按钮处理逻辑
    console.log(res.target)
  }
  return {
    title: '每日壁纸预览',
    path: `/pages/preview/preview?type=share&currentId=${currentId.value}`,
    imageUrl: currentInfo.value.picurl,
  }
})
</script>

<template>
  <!-- preview -->
  <view class="relative h-100vh w-100%">
    <swiper class="h-100% w-100%" circular :current="currentIndex" @change="swiperChange">
      <swiper-item v-for="(item, index) in storageClassList" :key="item._id" class="h-100% w-100%">
        <image v-if="readIndexList.includes(index)" :src="item.picurl" mode="aspectFill" class="h-100% w-100%" @click="maskChange()" />
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
        {{ currentIndex + 1 }} / {{ storageClassList.length }}
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
            <view>
              {{ currentInfo.score }}分
            </view>
          </view>
        </view>
        <view>
          <view
            class="flex flex-col items-center justify-center px-12rpx py-2rpx text-size-28rpx text-color2"
            @click="download()"
          >
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
                  {{ currentInfo._id }}
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  发布者:
                </view>
                <view selectable class="flex-1">
                  {{ currentInfo.nickname }}
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  评分:
                </view>
                <view selectable class="flex flex-1 items-center">
                  <uni-rate readonly touchable :value="currentInfo.score" size="16" />
                  <view class="pl-10rpx text-size-26rpx text-color2">
                    {{ currentInfo.score }}分
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
                  {{ currentInfo.description }}
                </view>
              </view>
            </view>

            <view>
              <view class="flex py-16rpx text-size-32rpx leading-7">
                <view class="w-140rpx text-left text-color3">
                  标签:
                </view>
                <view selectable class="flex flex-wrap">
                  <view v-for="tab in currentInfo.tabs" :key="tab" class="mb-10rpx mr-10rpx border-base rounded-40rpx px-10rpx py-30rpx text-size-22rpx color-primary leading-1">
                    {{ tab }}
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
              {{ isScore ? '已经评分过啦~~~' : '壁纸评分' }}
            </view>
            <!-- close -->
            <view class="p-10rpx" @click="closeScore()">
              <uni-icons type="closeempty" size="23" color="#999" />
            </view>
          </view>

          <!-- content -->
          <view class="center py-30rpx">
            <uni-rate v-model="userScore" allow-half :disabled="isScore" />
            <text class="w-80rpx pl-10rpx text-right color-[#FFCA3E] leading-1">
              {{ userScore }}分
            </text>
          </view>

          <view class="center">
            <button type="default" size="mini" plain :disabled="userScore === 0 || isScore" @click="confirmScore">
              确认评分
            </button>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>
