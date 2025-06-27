<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => ({
      picurl: '../static/images/classify1.jpg',
      name: '默认名称',
      updateTime: new Date().getTime() - 1000 * 60 * 60 * 24,
      _id: '649999999999999999999999',
    }),
  },
  isMore: {
    type: Boolean,
    default: false,
  },
})

function formatRelativeTime(time: Date | number | string): string | null {
  // 1. 获取当前时间和解析输入时间
  const now = new Date()
  const pastDate = new Date(time)

  // 2. 校验输入的时间是否有效
  if (Number.isNaN(pastDate.getTime())) {
    console.error('无效的时间输入')
    return null
  }

  // 3. 计算时间差（单位：毫秒）
  const diffInMs = now.getTime() - pastDate.getTime()

  // 4. 如果是未来时间，则返回 null
  if (diffInMs < 0) {
    return null
  }

  // 5. 定义时间单位（单位：秒）
  const MINUTE_IN_SECONDS = 60
  const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60
  const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24
  const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30 // 使用30天作为月份的近似值
  const THREE_MONTHS_IN_SECONDS = MONTH_IN_SECONDS * 3

  // 6. 将时间差转换为秒
  const diffInSeconds = Math.floor(diffInMs / 1000)

  // 7. 根据时间差返回不同格式的字符串
  if (diffInSeconds >= THREE_MONTHS_IN_SECONDS) {
    // 超过3个月
    return null
  }
  else if (diffInSeconds >= MONTH_IN_SECONDS) {
    // 1-3个月内
    const months = Math.floor(diffInSeconds / MONTH_IN_SECONDS)
    return `${months}个月前`
  }
  else if (diffInSeconds >= DAY_IN_SECONDS) {
    // 1-30天内
    const days = Math.floor(diffInSeconds / DAY_IN_SECONDS)
    return `${days}天前`
  }
  else if (diffInSeconds >= HOUR_IN_SECONDS) {
    // 1-24小时内
    const hours = Math.floor(diffInSeconds / HOUR_IN_SECONDS)
    return `${hours}小时前`
  }
  else if (diffInSeconds >= MINUTE_IN_SECONDS) {
    // 1-60分钟内
    const minutes = Math.floor(diffInSeconds / MINUTE_IN_SECONDS)
    return `${minutes}分钟前`
  }
  else {
    // 1分钟内
    // 注意：根据您的要求“1分钟内显示1分钟”，最常见的用户体验是显示“刚刚”。
    // 这比在仅过去10秒时显示“1分钟前”更准确和友好。
    return '刚刚'
  }
}
</script>

<template>
  <view>
    <navigator
      v-if="!isMore"
      :url="`/pages/classlist/classlist?classid=${item._id}&title=${item.name}`"
      class="relative h-340rpx overflow-hidden rounded-10rpx"
    >
      <image class="h-100% w-100%" :src="item.picurl" mode="aspectFill" />

      <view class="absolute bottom-0 left-0 h-70rpx w-100% flex items-center justify-center bg-black/20 text-30rpx text-white font-semibold backdrop-blur-lg">
        {{ item.name }}
      </view>
      <view class="absolute left-0 top-0 rounded-br-lg bg-orange-500/70 px-14rpx py-6rpx text-22rpx text-white backdrop-blur-lg">
        <!-- 几天前更新 -->
        {{ formatRelativeTime(item.updateTime) }}
      </view>
    </navigator>

    <navigator
      v-else
      url="/pages/classify/classify"
      open-type="reLaunch"
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
