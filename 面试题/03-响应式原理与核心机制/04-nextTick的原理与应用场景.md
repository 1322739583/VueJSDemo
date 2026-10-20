# 04. nextTick 的原理与应用场景（为什么需要微任务异步批量更新？）

## 一、 面试标准作答（30秒口答速记版）
> **【口答核心】**：  
> 1. **核心概念**：`nextTick` 是 Vue 提供的在**下一次 DOM 更新循环结束后执行延迟回调**的 API。当响应式数据变化后，Vue **不会立即同步更新真实 DOM**，而是开启一个异步任务队列，把同一个 Event Loop 中所有数据变化引起的 DOM 更新进行**批量去重与合并**。
> 2. **解决的核心痛点**：如果不采用异步批处理，如果在同步代码中一个循环修改了数据 1000 次，浏览器就会执行 1000 次高开销的 DOM 计算、重排（Reflow）与重绘（Repaint），主线程会瞬间卡死。异步批处理将 1000 次变更合并为最终的 1 次更新。
> 3. **底层实现**：
>    * **Vue 3**：全面拥抱现代浏览器，底层直接使用 `Promise.resolve().then(flushJobs)` 微任务队列实现。
>    * **Vue 2**：采用四级优雅降级策略：优先采用微任务（`Promise.then` -> `MutationObserver`），若不支持则降级为宏任务（`setImmediate` -> `setTimeout(fn, 0)`）。
> 4. **应用场景**：在修改数据后，**立刻需要获取基于最新数据渲染出来的真实 DOM 信息**（如：获取更新后的容器宽高、滚动条滚动到最底部、动态展示 input 后立即调用 `.focus()` 聚焦等）。

---

## 二、 为什么必须是异步批量更新？（底层设计哲学）

### 1. 设想：如果是“同步更新”会发生什么灾难？
```javascript
// 假设 Vue 是同步更新 DOM 的：
for (let i = 0; i < 1000; i++) {
  this.count = i; 
  // 同步触发 Setter -> 同步触发 Dep.notify() -> 同步触发 Watcher.run() -> 同步修改真实 DOM！
}
```
* **后果**：浏览器引擎被迫连续执行 1000 次样式计算与 DOM 重排回流，页面发生严重掉帧甚至无响应假死。
* **Vue 的真实机制**：循环修改 1000 次 `count`，触发 1000 次 Setter，但内部的 `queueWatcher` 会通过一个字典对象 `has[id]` 检查当前 Watcher 是否已经在队列中，最终整个队列里**只有 1 个更新任务**，只在同步代码全部执行完毕后，执行 1 次真实的 DOM 更新。

---

### 2. 结合浏览器事件循环（Event Loop）的全流程图解

```text
【用户同步主线程代码执行】
  │  this.count = 1  ──> 触发 setter ──> 收集 watcher 进更新队列 (queueWatcher)
  │  this.count = 2  ──> 触发 setter ──> has[id] 去重，同一个 watcher 忽略入队
  │  this.$nextTick(cb) ──> 把用户回调放入同一异步队列
  ▼
【同步任务栈清空】
  │
  ▼
【微任务队列 (Microtask Queue) 依次出队执行】
  │  任务 1：flushSchedulerQueue() ──> 执行组件 render & patch ──> 真正更新真实 DOM！
  │  任务 2：执行用户的 nextTick 回调 cb ──> 此时在 cb 中即可稳定拿到最新的真实 DOM！
  ▼
【GUI 渲染线程】──> 将最新的真实 DOM 渲染至屏幕上（用户看到画面）
```

---

## 三、 深入源码：nextTick 的底层实现机制

### 1. Vue 2 的“四级降级”机制（源码核心还原）
Vue 2 必须兼容低版本环境，因此内部封装了 `timerFunc` 异步兜底机制：

```javascript
// Vue 2 内部 timerFunc 的伪代码实现
let timerFunc;

if (typeof Promise !== 'undefined') {
  // 1. 首选微任务：Promise.then
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
} else if (typeof MutationObserver !== 'undefined') {
  // 2. 备选微任务：MutationObserver
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, { characterData: true });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined') {
  // 3. 首选宏任务：setImmediate（IE/Node 环境性能优于 setTimeout）
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  // 4. 终极兜底宏任务：setTimeout 0
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
```

### 2. Vue 3 的极简现代化设计
在 Vue 3 中，由于最低要求支持 ES6+ 的现代浏览器，去除了所有低版本浏览器的冗余垫片（Polyfill），直接纯粹使用 `Promise`：

```typescript
// Vue 3 核心实现本质（packages/runtime-core/src/scheduler.ts）
const resolvedPromise = Promise.resolve() as Promise<any>;
let currentFlushPromise: Promise<void> | null = null;

export function nextTick<T = void>(
  this: T,
  fn?: ((this: T) => void) | undefined
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
```
* **优势**：极度轻量，不仅支持传入回调函数 `nextTick(() => {})`，更支持更现代的 **`async/await`** 语法糖：
  ```javascript
  this.msg = '新数据';
  await nextTick();
  console.log(this.$el.textContent); // 直接拿到最新 DOM
  ```

---

## 四、 面试超高频“时序陷阱题”：先改数据还是先 nextTick？

这是很多面试官用来检验候选人是否真的理解内部队列的关键题：

### 场景 A：先改数据，后调用 nextTick（正常写法）
```javascript
this.content = 'Hello World'; // 1. 触发 setter，DOM 更新任务入队微任务
this.$nextTick(() => {
  // 2. 用户的回调排在 DOM 更新任务之后入队
  console.log(this.$refs.box.innerText); // 打印：'Hello World'（成功拿到新数据）
});
```

### 场景 B：先调用 nextTick，后改数据（调换顺序）
```javascript
this.$nextTick(() => {
  // 1. 用户的回调先入队微任务
  console.log(this.$refs.box.innerText); // 打印：'旧数据'（拿不到最新数据！）
});
this.content = 'Hello World'; // 2. 触发 setter，DOM 更新任务排在用户回调后面
```
> **【核心结论】**：微任务队列是**先进先出（FIFO）**的！只有在修改数据**之后**触发的 `nextTick`，才能保证排在 DOM 更新任务后面，从而读取到最新 DOM。

---

## 五、 15 行代码极简手写一个 nextTick

在面试中，如果面试官要求“手写一个简易版的 nextTick”，写出以下代码足以拿满分：

```javascript
// 简易版的 myNextTick 实现
const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

export function myNextTick(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true; // 锁住，避免同一个 tick 重复向微任务队列推入任务
    Promise.resolve().then(flushCallbacks); // 推入微任务队列
  }
}
```

---

## 六、 面试官高频连环追问

### 追问 1：为什么必须优先使用“微任务”而不是“宏任务”？
> **【核心解答】**：  
> 1. **避免屏幕产生可见的闪烁（Flicker）**：根据浏览器的渲染时序，**一次 Event Loop 中微任务会在当前 GUI 渲染之前全部清空并执行完毕**。如果用微任务更新 DOM，浏览器在一次重排重绘中就能直接把最新的画面画出来；如果使用宏任务（如 `setTimeout`），中间很可能穿插了一次浏览器的 GUI 渲染，用户会肉眼看到页面先闪一下旧状态，下一个宏任务再跳变新状态。
> 2. **执行时机更快**：微任务紧跟在当前同步代码之后立即执行，不需要像宏任务那样等待额外的定时器调度周期（例如 `setTimeout 0` 实际有约 4ms 延迟）。

### 追问 2：如果在 `nextTick` 的回调函数中又修改了响应式数据，会发生什么？
> **【核心解答】**：  
> 会再次触发 Setter，并将新的更新任务推入异步队列，开启新一轮的派发。  
> 但是，如果逻辑编写错误，导致每次更新都无休止地触发自我修改，会形成**无限递归死循环**。  
> * **Vue 框架的保护机制**：Vue 内部维护了一个 `MAX_UPDATE_COUNT = 100` 的计数器。如果同一个 Watcher 在一次更新中被触发超过 100 次，控制台会强行报错中断循环：`[Vue warn]: You may have an infinite update loop in a component render function...`，避免整个浏览器标签页直接崩溃。

### 追问 3：为什么有时候在 `created` 生命周期里操作 DOM 必须用 `nextTick`？
> **【核心解答】**：  
> 因为 `created` 阶段仅仅完成了数据响应式观测（Data Observer）和事件初始化，此时**模板还未编译，真实 DOM 还没有挂载到页面上（`$el` 为 `undefined`）**。如果业务必须在 `created` 中提前操作真实 DOM，必须将其包裹在 `this.$nextTick` 中，等待组件完成挂载（此时实际相当于顺延到了 `mounted` 之后执行）。