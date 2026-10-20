# 前端与 Vue 性能优化专项面试题（真题集）

---

# 第一部分：面试题目（无提示自测卷）

> **说明**：本部分仅展示纯粹的面试题目，无任何提示或思路泄露，适合模拟真实面试场景进行口答或白板自测。

### 题目 1：网络与关键渲染路径（LCP 与资源加载优先级）
在单页面应用（SPA）中，首屏加载时如何识别并优化关键渲染路径上的 LCP（Largest Contentful Paint）元素？`<link rel="preload">` 与 `<link rel="prefetch">` 在浏览器的网络调度优先级和缓存生命周期上有何本质区别？针对 Web 字体文件做预加载时，为什么必须显式声明 `crossorigin` 属性？

### 题目 2：现代图像自适应与渐进式占位体验
响应式图片中，属性 `srcset="small.jpg 400w, large.jpg 800w"` 与 `sizes="(max-width: 600px) 400px, 800px"` 是如何协同浏览器设备像素比（DPR）来决策下载哪张资源的？针对图片渐进式占位体验，低质量占位图（LQIP）与 Blurhash 各自的实现机制、数据体积与适用场景分别是什么？

### 题目 3：Vue 响应式系统的大数据性能损耗
在 Vue 2 与 Vue 3 中，面对一个包含 10,000+ 条数据且仅作只读展示的复杂嵌套报表，默认的响应式依赖收集为什么会导致界面卡顿掉帧？Vue 2 和 Vue 3 分别有哪些手段来彻底切断这种不必要的响应式开销？各自在数据需要局部刷新时有何差异？

### 题目 4：运行时 DOM 渲染与不定高虚拟列表（Virtual List）
虚拟列表（Virtual List）渲染视口节点的核心计算公式是什么？当遇到列表项高度不固定（动态由文本或内容撑开）的场景时，业界通常采用什么算法方案来精准计算滚动条总高度与可视区偏移量？

### 题目 5：构建分包（Code Splitting）策略与内存防泄漏
路由懒加载 `() => import('./Home.vue')` 在 Webpack / Vite 底层是如何被打包和执行的？分包打包时如果不加限制，往往会产生过多细小碎片 chunk 反而加剧 HTTP 请求开销，应当如何配置分包策略？在 Vue 组件生命周期中，有哪些极为隐蔽但常见的内存泄漏场景及排查手段？

---

# 第二部分：题目与深度答案解析

---

### 题目 1：网络与关键渲染路径（LCP 与资源加载优先级）
> **题目**：在单页面应用（SPA）中，首屏加载时如何识别并优化关键渲染路径上的 LCP（Largest Contentful Paint）元素？`<link rel="preload">` 与 `<link rel="prefetch">` 在浏览器的网络调度优先级和缓存生命周期上有何本质区别？针对 Web 字体文件做预加载时，为什么必须显式声明 `crossorigin` 属性？

#### 【详细解答】

#### 1. LCP 的识别与系统优化
* **核心定义**：LCP（Largest Contentful Paint，最大内容绘制）衡量视口内最大的可见图片、视频海报或文本块渲染完成的时间点，Google 建议将其控制在 **2.5 秒以内**。
* **识别方式**：在 Chrome DevTools 的 `Performance` 面板录制加载流程，在 Timings 轨道中定位 `LCP` 标签，点击即可直接高亮对应的 DOM 节点；或在控制台通过 `PerformanceObserver` 监听：
  ```javascript
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP 元素:', lastEntry.element, '耗时:', lastEntry.renderTime || lastEntry.loadTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  ```
* **优化策略**：
  * **提前发现**：首屏 LCP 往往由 CSS 背景图或 JS 动态挂载插入，浏览器推迟发现。应在 HTML `<head>` 中用 `<link rel="preload" as="image" href="..." fetchpriority="high">` 提前抢占网络带宽。
  * **避坑防线**：严禁对首屏 LCP 元素使用 `loading="lazy"`，否则浏览器会主动延后其加载时机。
  * **尺寸预占位**：为 LCP 元素设置明确的 CSS 宽高比（如 `aspect-ratio: 16 / 9`），避免图片渲染后将后续文档流推开，引发累积布局偏移（CLS）。

#### 2. `preload` 与 `prefetch` 的本质区别
| 对比维度 | `preload`（预加载） | `prefetch`（预获取） |
| :--- | :--- | :--- |
| **优先级** | **最高（High / Very High）**，强制抢占当前关键渲染带宽 | **最低（Idle）**，仅在浏览器网络和主线程空闲时默默抓取 |
| **使用时机** | **当前页面**立即渲染所必需的关键资源（首屏字体、LCP 图片、首屏 CSS） | **未来页面**（如用户极可能点击的下一个路由 Chunk） |
| **生命周期** | 下载后存入内存缓存（Memory Cache），若当前页面 3 秒内未消费，控制台会抛出黄色 Warning | 下载后存入 HTTP 磁盘缓存（Disk Cache），供跨页面导航时直接命中 |

#### 3. 字体文件做 `preload` 必须加 `crossorigin` 的底层原因
* **规范规定**：根据 W3C 规范，Web 字体文件（如 `.woff2`）被 CSS `@font-face` 消费时，**强制要求使用匿名跨域模式（Anonymous CORS）**，哪怕字体文件与当前网页位于完全相同的同源域名下。
* **双倍请求陷阱**：如果在 `<link rel="preload" as="font" href="...">` 中省略了 `crossorigin`，浏览器会以普通的非 CORS 模式预先加载字体并缓存；随后 CSS 解析到字体时，强制发起带 CORS 请求。由于缓存匹配策略（Cache Key）不一致，**浏览器会直接无视预加载的缓存，重新发起一次全新的下载**，导致字体被重复请求两次。

---

### 题目 2：现代图像自适应与渐进式占位体验
> **题目**：响应式图片中，属性 `srcset="small.jpg 400w, large.jpg 800w"` 与 `sizes="(max-width: 600px) 400px, 800px"` 是如何协同浏览器设备像素比（DPR）来决策下载哪张资源的？针对图片渐进式占位体验，低质量占位图（LQIP）与 Blurhash 各自的实现机制、数据体积与适用场景分别是什么？

#### 【详细解答】

#### 1. `srcset` + `sizes` 的协同决策计算公式
在 HTML 解析阶段，浏览器尚未下载图片，不知道图片的物理像素有多大。这两个属性为浏览器提供了决策依据：
* **`400w`、`800w`（Width Descriptor）**：告知浏览器图片的真实固有物理像素宽度。
* **`sizes`（展示意图）**：告知浏览器在不同视口宽度下，该图片打算在页面中占多少 CSS 像素宽度。

浏览器内部决策算法：
$$\text{目标物理像素需求} = \text{页面展示宽度 (CSS 像素)} \times \text{设备像素比 (DPR)}$$

* **真实场景 A（普通 PC 屏）**：屏幕宽 1200px（> 600px，命中默认展示宽度 800px），DPR = 1。  
  需求物理像素：$800 \times 1 = 800$。浏览器在 `srcset` 中精准下载 `large.jpg (800w)`。
* **真实场景 B（iPhone 高清屏）**：屏幕宽 375px（<= 600px，命中展示宽度 400px），苹果 Retina 屏 DPR = 2。  
  需求物理像素：$400 \times 2 = 800$。虽然视口窄，但为了保证高清不模糊，浏览器同样智能选择 `large.jpg (800w)`；若是非高清机（DPR = 1），则下载 `small.jpg (400w)`，节省一半流量。

#### 2. LQIP vs Blurhash 实现机制对比
* **LQIP（Low-Quality Image Placeholder，低质量占位图）**：
  * **原理**：图片上传时，后端或构建工具将原图缩放为宽 10~20px 的微缩图并转为 Base64（约 200B~500B），直接内联在 HTML 或随 API JSON 吐出。前端使用 CSS `filter: blur(20px)` 将马赛克高斯模糊，原图下载完成后通过 `opacity` 渐变覆盖。
  * **优点**：纯原生 HTML/CSS 实现，无需任何第三方 JS 依赖库。
  * **场景**：博客封面、新闻详情页等单页面图片数量较少的场景。
* **Blurhash**：
  * **原理**：基于离散余弦变换（DCT）数学算法，将整张图片的构图与主色调编码为一段 20~30 个英文字符串（如 `LEHLh[WB2yk8`）。体积仅 **20~30 字节**，前端引入轻量解码库将其在 `<canvas>` 上瞬间绘制出渐变轮廓。
  * **优点**：体积极致小，几千张图片的 Blurhash 字符串加起来也不过几十 KB。
  * **场景**：无限滚动瀑布流、海量商品列表、摄影社交社区（如 Unsplash、小红书）。

---

### 题目 3：Vue 响应式系统的大数据性能损耗
> **题目**：在 Vue 2 与 Vue 3 中，面对一个包含 10,000+ 条数据且仅作只读展示的复杂嵌套报表，默认的响应式依赖收集为什么会导致界面卡顿掉帧？Vue 2 和 Vue 3 分别有哪些手段来彻底切断这种不必要的响应式开销？各自在数据需要局部刷新时有何差异？

#### 【详细解答】

#### 1. 响应式依赖收集造成卡顿的根本原因
* **Vue 2**：`Observer` 实例化时会对数据进行递归遍历，通过 `Object.defineProperty` 为每个属性重写 getter/setter。10,000 条数据若包含数十个字段，瞬间会生成数十万个闭包以及 `Dep` 依赖管理器实例，造成严重的 CPU 峰值与内存占用。
* **Vue 3**：虽然采用 Proxy 实现了惰性代理，但当庞大的表格被模板渲染（`v-for`）遍历读取时，依然会瞬间触发深层代理与海量的 `track()` 依赖收集操作，霸占主线程导致页面卡顿。

#### 2. 解决方案与局部更新机制对比
* **Vue 2：使用 `Object.freeze()`**
  * **原理**：在数据赋值前执行 `this.tableData = Object.freeze(bigList)`。Vue 2 源码在 `observe` 方法中会做校验：`if (Object.isFrozen(value)) return;`，从而彻底跳过属性劫持。
  * **局部更新机制**：被冻结的对象无法直接修改内部属性（`this.tableData[0].name = 'xx'` 静默失败或报错）。**若要更新，必须替换整个数组引用**：
    ```javascript
    const updated = [...this.tableData];
    updated[0] = { ...updated[0], name: '新数据' };
    this.tableData = Object.freeze(updated);
    ```
* **Vue 3：使用 `shallowRef()` 或 `markRaw()`**
  * **原理**：
    * `shallowRef`：只监听 `.value` 的根级别变更，其内部的 10,000 个对象完全保持原生 JavaScript 纯对象形态，零递归 Proxy。
    * `markRaw`：在对象本身打上 `__v_skip: true` 标记，告诉响应式系统永远不要将该对象转为 Proxy。
  * **更新机制**：
    ```javascript
    import { shallowRef, triggerRef } from 'vue';
    const tableData = shallowRef([]);

    // 方式 A：整体替换（推荐）
    tableData.value = newBigData;

    // 方式 B：修改深层属性后强制通知更新
    tableData.value[0].name = '新数据';
    triggerRef(tableData); // 手动触发依赖通知
    ```

---

### 题目 4：运行时 DOM 渲染与不定高虚拟列表（Virtual List）
> **题目**：虚拟列表（Virtual List）渲染视口节点的核心计算公式是什么？当遇到列表项高度不固定（动态由文本或内容撑开）的场景时，业界通常采用什么算法方案来精准计算滚动条总高度与可视区偏移量？

#### 【详细解答】

#### 1. 固定高度场景核心公式
视口只渲染可见的少量 DOM 节点（通常为 10~20 个），上下各加 2~3 个缓冲区节点（Buffer）：
* **起始索引**：$startIndex = \lfloor scrollTop / itemHeight \rfloor - buffer$
* **结束索引**：$endIndex = \lfloor (scrollTop + clientHeight) / itemHeight \rfloor + buffer$
* **偏移量位移**：$startOffset = startIndex \times itemHeight$，通过外层容器 `transform: translateY(startOffset px)` 将真实渲染列表钉在当前可视窗口内。

#### 2. 不定高（动态内容）核心三步实现方案
当每条社交动态、商品评价内容长短不一时，物理高度无法预知：

1. **预估高度（Estimated Height）与位置字典初始化**：
   * 设定预估高度 `estimatedItemHeight = 80px`，初始化一个数组 `positions`：
     ```javascript
     positions[i] = {
       index: i,
       height: estimatedItemHeight,
       top: i * estimatedItemHeight,
       bottom: (i + 1) * estimatedItemHeight
     }
     ```
   * 滚动容器总高度预设为 `positions[positions.length - 1].bottom`，撑开滚动条。
2. **渲染后真实尺寸回填（ResizeObserver / 缓存修正）**：
   * 节点渲染入 DOM 后，通过 `ResizeObserver` 捕获其物理高度 `realHeight`；
   * 若 `realHeight !== positions[i].height`，计算高度差值 $\Delta d = realHeight - positions[i].height$；
   * 将当前项及后续所有项的 `top` 与 `bottom` 全部累加 $\Delta d$ 修正偏移量，并动态刷新滚动条总高度。
3. **滚动位置检索：二分查找（Binary Search）**：
   * 在发生滚动监听 `onScroll` 时，由于每个节点的 `bottom` 是单调递增的，通过**二分查找法**在 `positions` 数组中以 $O(\log n)$ 的极高效率匹配当前 `scrollTop` 所处的 `startIndex`，避免 $O(n)$ 线性遍历导致滚动掉帧。

---

### 题目 5：构建分包（Code Splitting）策略与内存防泄漏
> **题目**：路由懒加载 `() => import('./Home.vue')` 在 Webpack / Vite 底层是如何被打包和执行的？分包打包时如果不加限制，往往会产生过多细小碎片 chunk 反而加剧 HTTP 请求开销，应当如何配置分包策略？在 Vue 组件生命周期中，有哪些极为隐蔽但常见的内存泄漏场景及排查手段？

#### 【详细解答】

#### 1. 动态 `import()` 的底层机制
* **构建编译期**：Webpack/Rollup 遍历 AST 语法树识别到动态 `import()` 时，将其标记为**代码分割点（Split Point）**，将该入口及其独占依赖单独打包成一个独立 chunk（如 `Home.[hash].js`）。
* **运行时消费**：当触发路由跳转执行到该函数时，底层动态创建 `<script type="module">` 标签插入到 `<head>` 中发起网络请求。加载解析完成后，触发 Promise 的 `resolve`，将 Vue 组件对象交付渲染。

#### 2. 分包过碎（Over-splitting）治理配置
碎片化 chunk 会导致浏览器发起过多高并发连接，严重阻塞主线程：
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 合理的聚合分包策略
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 基础框架类：极少变动，长效强缓存
            if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
              return 'vendor-vue-core';
            }
            // 重型图表/数据可视化库单独抽离
            if (id.includes('echarts') || id.includes('zrender')) {
              return 'vendor-echarts';
            }
            // 其余通用依赖打包为 vendor
            return 'vendor-libs';
          }
        }
      }
    }
  }
});
```

#### 3. Vue 常见隐蔽内存泄漏场景与排查
* **全局事件监听未解绑**：在组件内通过 `window.addEventListener('resize', fn)` 绑定事件，若在 `beforeUnmount` / `unmounted` 中遗漏 `removeEventListener`，组件实例将被 window 的闭包死死抓牢，导致整个组件无法被垃圾回收（GC）。
* **全局 EventBus / 第三方观察者未注销**：使用 `mitt` 或全局事件派发器注册的监听器，组件销毁时若未执行 `off` 销毁。
* **未清理的定时器与异步任务**：`setInterval` 或长轮询 `setTimeout` 内部引用了组件响应式变量，组件销毁后定时器仍持续驻留宏任务队列。
* **第三方大类实例绑定在深层响应式对象上**：将富文本编辑器（TinyMCE/Quill）、地图（Mapbox/Leaflet）、ECharts 实例直接赋值给 `reactive()` 或 `this` 实例。Vue 的深度代理劫持会导致实例内部大量的原生 DOM 与闭包相互循环引用，无法释放。
* **排查手段**：打开 Chrome DevTools 的 `Memory` 面板，在组件打开与销毁后分别录制一次 **Heap Snapshot（堆快照）**，筛选 `Detached HTMLElement`（分离的 DOM 节点）并比对 Delta 增量，若存在未释放的 DOM 树即可逆向定位到闭包引用路径。
