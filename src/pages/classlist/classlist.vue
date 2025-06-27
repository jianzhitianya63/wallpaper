<script setup lang="ts">
import type { MyData } from '@/types/ts-demo'
import { ref } from 'vue'
import { apiGetClassifyList } from '@/api/apis'

// uniapp提供的自动Props注入特性, 正常应该使用onload钩子来接收页面参数, 这个是通用逻辑
// const props = defineProps({
//   classid: {
//     type: String,
//     default: '',
//   },
//   title: {
//     type: String,
//     default: '分类列表',
//   },
// })
const classifyList = ref([])

async function getClassifyList(classid: string) {
  const res = await apiGetClassifyList<MyData>({ classid })
  classifyList.value = res.data
}

onLoad((options) => {
  if (options.title) {
    uni.setNavigationBarTitle({
      title: options.title,
    })
  }
  else {
    uni.setNavigationBarTitle({
      title: '分类列表',
    })
  }

  if (options.classid) {
    getClassifyList(options.classid)
  }
  else {
    uni.showToast({
      title: '分类ID不存在',
      icon: 'none',
    })
  }
})
</script>

<template>
  <!-- classlist -->
  <view>
    <!-- content -->
    <view class="grid grid-cols-3 gap-5rpx p-5rpx">
      <!-- item -->
      <navigator v-for="item in classifyList" :key="item._id" url="/pages/preview/preview" class="h-440rpx">
        <image
          :src="item.smallPicurl"
          mode="aspectFill"
          class="block h-100% w-100%"
        />
      </navigator>
    </view>
  </view>
</template>
