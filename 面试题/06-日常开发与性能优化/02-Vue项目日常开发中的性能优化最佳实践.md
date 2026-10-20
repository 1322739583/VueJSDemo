# Vue 项目日常开发中的性能优化最佳实践

## 一、 面试标准作答（30秒背诵版）
> **【口答核心】**：  
> 日常开发中的性能优化主要聚焦在“响应式开销控制”、“DOM 渲染管线”和“内存管理”三大块：
> 1. **响应式降噪**：对超大数据量静态展示列表使用 `Object.freeze()`（Vue 2）或 `shallowRef()` / `markRaw()`（Vue 3），彻底切断递归依赖收集；
> 2. **DOM 与列表优化**：海量数据采用虚拟滚动（Virtual List），严格给 `v-for` 配套唯一稳定 `key`，高频事件搭配防抖/节流；
> 3. **组件与内存开销**：合理使用 `keep-alive` 缓存高开销组件，组件销毁前（`beforeUnmount`）严格清除定时器、全局事件监听和闭包引用，防止内存泄漏。

---

## 二、 核心原理剖析

### 1. 响应式依赖收集的性能杀手
* **问题本质**：Vue 默认会对响应式对象进行深度遍历（Vue 2 用递归 `Object.defineProperty`，Vue 3 用深层懒代理），当一个表格有 10,000+ 条数据且每个对象有数十个字段时，响应式转换的 CPU 耗时以及创建的大量 `Dep` / `ReactiveFlags` 实例会霸占主线程，导致页面明显掉帧。
* **破局关键**：区分“需要驱动视图更新的状态”与“单纯拿来渲染的静态纯数据”。

### 2. Vue 2 与 Vue 3 大数据优化对照表
| 对比维度 | Vue 2 解决方案 | Vue 3 解决方案 |
| :--- | :--- | :--- |
| **底层 API** | `Object.freeze(data)` | `shallowRef(data)` / `markRaw(data)` |
| **工作原理** | 冻结对象，阻止 `defineReactive` 劫持属性 getter/setter | 只劫持根级别 `.value`，内部对象保持原生状态 |
| **内存/CPU 收益** | 减少 ~80% 的 Dep 实例创建开销 | 零递归 Proxy 包装，数据注入近乎原生 JS 速度 |
| **数据更新方式** | 必须替换整个对象引用：`this.list = Object.freeze(newList)` | 直接替换根引用：`list.value = newList` |

---

## 三、 代码实战演示

### 1. Vue 3 大数据静态展示深度优化
```vue
<script setup>
import { shallowRef, onMounted } from 'vue'

// 使用 shallowRef 避免深层递归代理
const bigTableData = shallowRef([])

async function fetchData() {
  const res = await fetch('/api/large-list')
  const json = await res.json() // 假设包含 10,000 条复杂嵌套数据
  
  // 仅触发一次整体依赖通知，内部 10,000 条对象完全不建立 Proxy
  bigTableData.value = json
}

onMounted(fetchData)
</script>

<template>
  <div class="table-container">
    <div v-for="item in bigTableData" :key="item.id">
      {{ item.name }} - {{ item.detail.title }}
    </div>
  </div>
</template>
```

### 2. 避免内存泄漏的最佳实践
```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let timer = null
const handleResize = () => { /* 处理逻辑 */ }

onMounted(() => {
  timer = setInterval(() => { /* 轮询 */ }, 1000)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  // 必须显式清理，否则组件销毁后闭包依然保留在 window 作用域
  clearInterval(timer)
  window.removeEventListener('resize', handleResize)
})
</script>
```

---

## 四、 面试官高频追问

1. **追问 1：虚拟列表（Virtual List）在应对列表项“高度不固定”时，该如何计算滚动位置？**
   * **解答**：
     * **预估高度法（Estimated Height）**：先设定一个默认预估高度 `estimatedItemHeight` 用于初始化计算总滚动区域；
     * **真实 DOM 渲染后回填（ResizeObserver / 缓存尺寸表）**：当节点渲染到可视区后，通过 `ResizeObserver` 捕获其真实物理高度并写入一张尺寸位置缓存表（Position Array），更新后续节点的偏移量（`top` / `transform`）；
     * **二分查找**：在滚动触发时，通过二分查找快速定位当前滚动距离对应的可视区域起始索引（`startIndex`）。

2. **追问 2：Vue 3 的 `markRaw` 在什么场景下必须使用？**
   * **解答**：
     * 当你在 Vue 的响应式对象上挂载**外部复杂的第三方类实例**时（如富文本编辑器实例 TinyMCE/Quill、地图实例 Leaflet/Mapbox、Three.js 的 Scene/Renderer）。
     * 如果不对它们使用 `markRaw()`，Vue 3 会尝试为这些包含成百上千个复杂方法与私有属性的类建立 Proxy，这不仅会导致致命的性能卡死，还会破坏这些第三方库内部的 `this` 引用导致运行时报错。