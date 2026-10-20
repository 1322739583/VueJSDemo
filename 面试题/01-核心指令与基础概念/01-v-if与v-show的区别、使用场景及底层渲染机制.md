# 01. v-if 与 v-show 的区别、使用场景及底层渲染机制

## 一、 面试标准作答（30秒口答速记版）
> **【口答核心】**：  
> `v-if` 和 `v-show` 都是用来控制元素在页面上的显示与隐藏的，但其底层实现和性能开销截然不同：
> 1. **底层实现**：`v-if` 是**真正的条件渲染/惰性渲染**，它会在条件为真时动态创建并挂载组件/DOM 节点，条件为假时彻底销毁并从 DOM 树中移除；而 `v-show` 不论真假**都会先渲染出真实 DOM**，底层仅通过修改 CSS 的 `display: none` 属性来控制元素的显示与隐藏。
> 2. **生命周期**：`v-if` 切换时会触发子组件完整的生命周期钩子（`created`/`mounted` 与 `unmounted`/`destroyed`）；`v-show` 仅在初始渲染时触发一次生命周期，后续显示隐藏切换**绝不触发任何生命周期**。
> 3. **性能选型**：需要**频繁切换**显示状态的场景（如 Tab 标签页切换、弹窗显隐、Tooltip 提示），选用 **`v-show`**（切换开销小）；运行时**切换很少**、或初始条件大概率为假的场景（如权限控制、不同用户身份板块），选用 **`v-if`**（初始渲染开销小）。

---

## 二、 核心底层机制深度剖析

### 1. 编译层（Compiler）与虚拟 DOM（VNode）层面的本质差异

* **`v-if` 的编译产物**：  
  在模版编译（Template Compilation）阶段，`v-if` 会被编译器直接转换为 JavaScript 的**三元条件表达式**。  
  * 当条件为 `false` 时，Render 函数直接生成一个**注释节点（Comment VNode）**（例如 `createCommentVNode('v-if')`），真实 DOM 树中只有一条 `<!---->` 注释占位，根本不会生成该节点树。
  * 当条件转为 `true` 时，虚拟 DOM 重新触发 Diff，通过 `patch` 算法动态调用底层原生 DOM 操作（`createElement`、`appendChild`）插入真实节点。

* **`v-show` 的编译产物**：  
  在编译器内部，`v-show` 是作为一个专门的**运行时指令（Directive）**处理的。  
  * 节点一定会生成完整的 VNode，并在页面首次挂载时直接生成真实 DOM。
  * 运行时指令的底层钩子（如 `beforeMount` / `updated`）会根据绑定值的真假，动态操作节点的样式：`el.style.display = value ? originalDisplay : 'none'`。

---

### 2. 核心区别维度对比全景表

| 对比维度 | `v-if` | `v-show` |
| :--- | :--- | :--- |
| **底层实现机制** | DOM 节点的动态创建、挂载、注销与销毁 | 始终保留在 DOM 树中，仅切换 CSS `display: none` |
| **首次渲染开销** | **低（惰性渲染）**：若初始值为 `false`，完全不渲染 | **高**：不论初始值是真是假，全部完整渲染挂载 |
| **动态切换开销** | **极高**：每次切换都要经历 DOM 节点创建/销毁与组件挂载/卸载 | **极低**：仅仅是浏览器重绘（Repaint）与样式重计算 |
| **子组件生命周期** | 每次显隐都完整触发挂载与销毁阶段钩子 | 仅初始挂载触发一次，后续切换**完全不触发**生命周期 |
| **支持的挂载目标** | 支持挂载在原生 DOM、自定义组件以及 `<template>` 逻辑包裹标签上 | **不支持** `<template>` 标签（因为 `<template>` 不会渲染真实 DOM，无法挂载样式） |
| **配合其他指令** | 可配合 `v-else-if`、`v-else` 形成完整条件分支链 | **不支持** `v-else` / `v-else-if` 链式结构 |

---

## 三、 代码实战演示与验证

```vue
<template>
  <div class="demo-box">
    <button @click="isVisible = !isVisible">点击切换显隐状态</button>

    <!-- 1. v-if 示例：条件为 false 时，DOM 树中只有 <!----> 注释 -->
    <ChildComponent v-if="isVisible" title="v-if 组件" />

    <!-- 2. v-show 示例：DOM 树中始终有该元素，仅 style="display: none;" -->
    <ChildComponent v-show="isVisible" title="v-show 组件" />
    
    <!-- 3. 注意点：<template> 逻辑包裹只能用 v-if -->
    <template v-if="isVisible">
      <p>模块 1</p>
      <p>模块 2</p>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const isVisible = ref(true);
</script>
```

---

## 四、 面试官高频连环追问

### 追问 1：为什么 `v-show` 不能用在 `<template>` 标签上？
> **【核心解答】**：  
> 因为 `<template>` 是一个纯粹的**逻辑占位符（Invisible Wrapper）**，在 Vue 最终渲染生成真实 DOM 树时，`<template>` 标签自身是会被剥离、不会被渲染出来的。而 `v-show` 的本质是给**真实 DOM 节点的 `style.display` 属性**赋值。既然根本没有生成对应的外层真实 DOM 容器，`style.display` 自然无处挂载，所以 `v-show` 在 `<template>` 上无效。

### 追问 2：如果在子组件上使用 `v-show`，如何在显示/隐藏切换时监听到变化？
> **【核心解答】**：  
> 因为 `v-show` 切换时不走任何组件生命周期（`mounted` / `unmounted` 均不触发），如果父组件通过 `v-show` 控制子组件，子组件内部如果需要感知显隐状态，推荐两种解法：
> 1. **Props 联动 + Watch 监听**：父组件将控制显隐的同一个布尔值以 `props` 传给子组件，子组件内部通过 `watch(props.visible, (val) => { ... })` 执行对应的动画或数据重拉逻辑；
> 2. **直接改用 `v-if`**：如果业务逻辑强依赖每次出现时重新初始化（如重置表单校验、重新拉取详情），直接使用 `v-if` 最为自然规范。

### 追问 3：在频繁切换显示且内部组件非常庞大的场景下，如何既保证切换流畅、又避免每次销毁重建？
> **【核心解答】**：  
> 结合 **`v-if` + `<keep-alive>`** 使用。  
> 既可以享受类似 `v-if` 的按需切换逻辑，又利用 `<keep-alive>` 将被切换隐藏的组件 VNode 缓存在内存中避免二次销毁挂载；同时还可以利用 `activated` 和 `deactivated` 专用生命周期钩子精确捕获组件每次的“唤醒”与“失活”。