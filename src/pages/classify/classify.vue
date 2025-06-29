<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
    {
      layout: 'tabbar',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '分类',
      },
    }
</route>

<script setup lang="ts">
import type { MyData } from '@/types/ts-demo'
import { onShareAppMessage } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { apiGetClassify } from '@/api/apis'

const classifyList = ref([])
async function getList() {
  const res = await apiGetClassify<MyData>()
  classifyList.value = res.data
}
getList()

onShareAppMessage((res) => {
  if (res.from === 'button') {
    // 来自页面内分享按钮处理逻辑
    console.log(res.target)
  }
  return {
    title: '每日壁纸分类',
    path: '/pages/classify/classify',
    imageUrl: classifyList.value[0].picurl,
  }
})
</script>

<template>
  <view>
    <custom-nav-bar title="分类" />
    <view class="grid grid-cols-3 gap-15rpx">
      <theme-item v-for="item in classifyList" :key="item._id" :item="item" />
    </view>
  </view>
</template>
