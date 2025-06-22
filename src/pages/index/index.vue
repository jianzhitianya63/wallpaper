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
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
let safeAreaInsets
let systemInfo

// #ifdef MP-WEIXIN
// 微信小程序使用新的API
systemInfo = uni.getWindowInfo()
safeAreaInsets = systemInfo.safeArea
  ? {
      top: systemInfo.safeArea.top,
      right: systemInfo.windowWidth - systemInfo.safeArea.right,
      bottom: systemInfo.windowHeight - systemInfo.safeArea.bottom,
      left: systemInfo.safeArea.left,
    }
  : null
// #endif

// #ifndef MP-WEIXIN
// 其他平台继续使用uni API
systemInfo = uni.getSystemInfoSync()
safeAreaInsets = systemInfo.safeAreaInsets
// #endif
const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite5 + UnoCss + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
const bannerList = [
  '/static/images/banner1.jpg',
  '/static/images/banner2.jpg',
  '/static/images/banner3.jpg',
]
// 测试 uni API 自动引入
onLoad(() => {
  console.log('项目作者:', author.value)
})

console.log('index')
</script>

<template>
  <view>
    <view>
      <swiper class="h-400rpx">
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item" mode="aspectFill" class="wh-full" />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
