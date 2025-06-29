<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
    {
      layout: 'custom',
      style: {
        navigationBarTitleText: '搜索',
      },
    }
</route>

<script setup>
import { onReachBottom, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { apiGetSearch } from '@/api/apis'

// 查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: '',
})

// 搜索历史词
const historySearch = ref(uni.getStorageSync('historySearch') || [])

// 热门搜索词
const recommendList = ref(['美女', '帅哥', '宠物', '卡通'])

// 没有搜索结果
const noSearch = ref(false)

// 搜索结果列表
const classList = ref([])

// 没有更多
const noData = ref(false)

// 点击搜索
function onSearch() {
  // 添加到第一个元素
  historySearch.value.unshift(queryParams.value.keyword)
  historySearch.value = [...new Set(historySearch.value)].slice(0, 5)
  uni.setStorageSync('historySearch', historySearch.value)
  apiGetSearch({
    keyword: queryParams.value.keyword,
    pageNum: queryParams.value.pageNum,
    pageSize: queryParams.value.pageSize,
  }).then((res) => {
    classList.value = [...classList.value, ...res.data]
    if (queryParams.value.pageSize > res.data.length)
      noData.value = true
    if (classList.value.length === 0) {
      noSearch.value = true
    }
    else {
      noSearch.value = false
    }
    uni.setStorageSync('classifyList', classList.value)
  })
}

// 点击清除按钮
function onClear() {
  // 清空搜索框
  queryParams.value.keyword = ''
  // 清空搜索结果
  classList.value = []
  // 清空没有搜索结果
  noSearch.value = false
  // 初始化分页
  queryParams.value.pageNum = 1
  queryParams.value.pageSize = 12
  noData.value = false
}

// 点击标签进行搜索
function clickTab(value) {
  queryParams.value.keyword = value
  queryParams.value.pageNum = 1
  queryParams.value.pageSize = 12
  noData.value = false
  classList.value = []
  noSearch.value = false
  onSearch()
}

// 点击清空搜索记录
function removeHistory() {
  uni.showModal({
    title: '是否清空历史搜索？',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('historySearch')
        historySearch.value = []
      }
    },
  })
}

// 触底加载更多
onReachBottom(() => {
  if (!noData.value) {
    queryParams.value.pageNum++
    onSearch()
  }
})

// 关闭有页面
onUnload(() => {
  uni.removeStorageSync('classifyList')
})
</script>

<template>
  <view class="searchLayout">
    <view class="search">
      <uni-search-bar
        v-model="queryParams.keyword"
        focus
        placeholder="搜索"
        @confirm="onSearch"
        @cancel="onClear"
        @clear="onClear"
      />
    </view>

    <view v-if="!classList.length">
      <view class="history">
        <view class="topTitle">
          <view class="text">
            最近搜索
          </view>
          <view class="icon" @click="removeHistory">
            <uni-icons type="trash" size="25" />
          </view>
        </view>
        <view class="tabs">
          <view v-for="tab in historySearch" :key="tab" class="tab" @click="clickTab(tab)">
            {{ tab }}
          </view>
        </view>
      </view>

      <view class="recommend">
        <view class="topTitle">
          <view class="text">
            热门搜索
          </view>
        </view>
        <view class="tabs">
          <view v-for="tab in recommendList" :key="tab" class="tab" @click="clickTab(tab)">
            {{ tab }}
          </view>
        </view>
      </view>
    </view>

    <view v-if="noSearch" class="noSearch">
      <uv-empty mode="search" />
    </view>

    <view>
      <view class="list">
        <navigator
          v-for="item in classList" :key="item._id"
          :url="`/pages/preview/preview?currentId=${item._id}`" class="item"
        >
          <image :src="item.smallPicurl" mode="aspectFill" />
        </navigator>
      </view>
      <view v-if="noData || classList.length">
        <uni-load-more :status="noData ? 'noMore' : 'loading'" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.searchLayout{
    .search{
        padding:0 10rpx;
    }
    .topTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 32rpx;
        color:#999;
    }
    .history{
        padding:30rpx;
    }
    .recommend{
        padding:30rpx;
    }
    .tabs{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-top:20rpx;
        .tab{
            background: #F4F4F4;
            font-size: 28rpx;
            color:#333;
            padding:10rpx 28rpx;
            border-radius: 50rpx;
            margin-right: 20rpx;
            margin-top: 20rpx;
        }
    }
    .list{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 5rpx;
        padding:20rpx 5rpx;
        .item{
            height: 440rpx;
            image{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
}
</style>
