<script setup lang="ts">
import type { MyData } from '@/types/ts-demo'
import { reactive, ref } from 'vue'
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
const classListParams = reactive({
  classid: '',
  page: 1,
  pageSize: 12,
})

async function getClassifyList() {
  const res = await apiGetClassifyList<MyData>(classListParams)
  classifyList.value = [...classifyList.value, ...res.data]
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
    classListParams.classid = options.classid
  }
  else {
    uni.showToast({
      title: '分类ID不存在',
      icon: 'none',
    })
  }
  // getClassifyList()
})

// 触底刷新
onReachBottom(() => {
  classListParams.page++
  getClassifyList()
})

const paging = ref()
async function queryList(page: number, pageSize: number) {
  const res = await apiGetClassifyList<MyData>({ classid: classListParams.classid, page, pageSize })
  paging.value.complete(res.data)
}
</script>

<template>
  <z-paging ref="paging" v-model="classifyList" @query="queryList">
    <template #refresher="{ refresherStatus }">
      <custom-refresher :status="refresherStatus" />
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
