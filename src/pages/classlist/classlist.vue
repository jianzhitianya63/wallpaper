<script setup lang="ts">
import type { MyData } from '@/types/ts-demo'
import { ref } from 'vue'
import { apiGetClassifyList } from '@/api/apis'
import CustomRefresher from '@/components/custom-refresher/custom-refresher.vue'

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
const classid = ref('')

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
    classid.value = options.classid
  }
  else {
    uni.showToast({
      title: '分类ID不存在',
      icon: 'none',
    })
  }
})

const paging = ref()
async function queryList(pageNum: number, pageSize: number) {
  const res = await apiGetClassifyList<MyData>({ classid: classid.value, pageNum, pageSize })
  paging.value.complete(res.data)
}
</script>

<template>
  <z-paging ref="paging" v-model="classifyList" loading-more-no-more-text="我也是有底线的！" @query="queryList">
    <template #refresher="{ refresherStatus }">
      <custom-refresher :status="refresherStatus" />
    </template>
    <template #empty>
      <view class="h-full flex items-center justify-center">
        没有数据了喔
      </view>
    </template>
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
  </z-paging>
</template>
