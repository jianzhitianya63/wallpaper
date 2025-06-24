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

<template>
  <view>
    <custom-nav-bar title="分类" />
    <view class="grid grid-cols-3 gap-15rpx">
      <theme-item v-for="item in 12" :key="item" />
    </view>
  </view>
</template>
