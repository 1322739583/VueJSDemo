# 05. 什么情况下 Vue 响应式会丢失？（Vue2 与 Vue3 避坑大盘点及解决方案）

## 一、 面试标准作答（30秒口答速记版）
> **【口答核心】**：  
> 响应式丢失（数据变了但视图不更新）在 Vue 2 和 Vue 3 中的**根本原因截然不同**：
> 1. **Vue 2 时代（受限于 Object.defineProperty 语法机制）**：
>    * **对象新增属性**（如 `this.obj.b = 1`）或**删除属性**（如 `delete this.obj.a`）无法被监听，因为是在初始化后动态添加的，没有建立 getter/setter。
>    * **数组通过下标直接修改**（如 `this.arr[0] = 1`）或**直接修改 length**（如 `this.arr.length = 0`）无法被监听，因为 Vue 2 出于性能考量未劫持数组下标。
>    * 👉 **解法**：使用 `this.$set()`、`this.$delete()`，或用数组 7 个变异方法（`splice` 等），或重新赋一个新对象引用。
> 2. **Vue 3 时代（受限于 Proxy 引用关系与 ES6 语法解构）**：
>    * **直接解构 `reactive` 对象**：解构出来的基本类型（Number/String/Boolean）变成了纯原生变量，彻底脱离了 Proxy 的捕获。
>    * **给 `reactive` 对象直接重新赋值**（如 `state = res.data`）：导致变量指向了新内存地址，原有的 Proxy 代理壳子被废弃。
>    * **浅层响应式深层修改**：使用 `shallowRef` / `shallowReactive` 修改嵌套属性。
>    * 👉 **解法**：解构使用 `toRefs()`；复杂对象/数组一律优先选用 `ref()` 并通过 `.value` 赋值；浅层响应式使用 `triggerRef()`。

---

## 二、 核心底层机制深度剖析

### 1. 为什么 Vue 2 无法监听“新增属性”与“数组下标”？

* **对象新增属性的盲区**：  
  Vue 2 在组件实例化（`initState`）时，通过 `Observer` 对 `data` 中的每一个属性进行一次性深度遍历，使用 `Object.defineProperty(obj, key, { get, set })` 注入劫持逻辑。
  对于初始化之后动态新增的属性，它在内存中只是一个普通 JS 属性，**根本不存在对应的 `Dep` 依赖管理器和闭包 `getter/setter`**，修改它自然不会触发派发更新（`dep.notify()`）。

* **数组下标不被劫持的真相**：  
  很多人误以为 `Object.defineProperty` 无法劫持数组，**实际上 JS 底层完全可以劫持数组索引**。尤雨溪在 GitHub Issue 中公开回应过：Vue 2 不劫持数组下标是**出于性能开销考量（Performance Cost）**。如果一个数组有数万个元素，逐一劫持下标会导致内存暴增、初始化严重卡顿。因此 Vue 2 选择了折中方案：通过**原型链重写（AOP 切面编程）**拦截了 `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse` 这 7 个改变原数组的方法。

---

### 2. 为什么 Vue 3 中解构 `reactive` 会丢失响应式？

* **Proxy 代理的是“对象整体”，而不是“基本类型”**：
  ```javascript
  const state = reactive({ count: 0 });
  // Proxy 内部机制：
  // 当你访问 state.count 时，触发 Proxy 的 get() 陷阱；
  // 当你修改 state.count = 1 时，触发 Proxy 的 set() 陷阱。

  let { count } = state; 
  // ES6 解构赋值等价于：let count = state.count;
  // 此时变量 count 只是在内存栈区保存了一个单纯的数字 0！
  count++; // 只是修改了一个局部数字变量，完全跳过了 state 这个 Proxy 对象，没有任何 set 陷阱被调用！
  ```

---

## 三、 Vue 2 vs Vue 3 响应式丢失全景对比表

| 场景 | 框架版本 | 错误写法（导致响应式丢失） | 正确解决方案 |
| :--- | :--- | :--- | :--- |
| **给对象新增属性** | Vue 2 | `this.obj.newProp = 'val'` | `this.$set(this.obj, 'newProp', 'val')` 或 `this.obj = { ...this.obj, newProp: 'val' }` |
| **删除对象属性** | Vue 2 | `delete this.obj.name` | `this.$delete(this.obj, 'name')` |
| **修改数组特定索引** | Vue 2 | `this.arr[0] = 'newVal'` | `this.$set(this.arr, 0, 'newVal')` 或 `this.arr.splice(0, 1, 'newVal')` |
| **修改数组长度清空** | Vue 2 | `this.arr.length = 0` | `this.arr.splice(0)` 或 `this.arr = []` |
| **解构状态对象** | Vue 3 | `let { count } = reactiveObj` | `const { count } = toRefs(reactiveObj)` |
| **整个替换数组/对象** | Vue 3 | `let list = reactive([]); list = res.data;` | 推荐改用 `ref`：`const list = ref([]); list.value = res.data;` |
| **浅层响应式深层修改** | Vue 3 | `shallowRefData.value.user.name = 'x'` | 替换根引用或调用 `triggerRef(shallowRefData)` |

---

## 四、 常见实战避坑代码演示

### 1. Vue 2 数组与对象标准写法
```javascript
export default {
  data() {
    return {
      userInfo: { name: '张三' },
      list: ['Vue', 'React']
    };
  },
  methods: {
    updateData() {
      // ❌ 错误示范（视图不更新）
      // this.userInfo.age = 18;
      // this.list[0] = 'Angular';

      // ✅ 正确解法 1：使用 $set
      this.$set(this.userInfo, 'age', 18);
      this.$set(this.list, 0, 'Angular');

      // ✅ 正确解法 2：重新赋值新引用或调用变异方法
      this.userInfo = Object.assign({}, this.userInfo, { age: 18 });
      this.list.splice(0, 1, 'Angular');
    }
  }
};
```

### 2. Vue 3 状态管理标准写法
```vue
<script setup>
import { reactive, ref, toRefs } from 'vue';

// ---------------- 场景 A：推荐使用 ref 处理数组 ----------------
const tableList = ref([]);

const loadData = async () => {
  const res = await fetch('/api/list').then(r => r.json());
  // ✅ 修改 .value 不会破坏 Proxy 引用，完全保持响应式
  tableList.value = res;
};

// ---------------- 场景 B：reactive 的正确解构姿势 ----------------
const state = reactive({
  keyword: '',
  loading: false
});

// ❌ 错误写法：const { keyword, loading } = state; （响应式瞬间丢失）
// ✅ 正确写法：使用 toRefs 包装，解构出的每一个属性都是 Ref 对象
const { keyword, loading } = toRefs(state);
</script>
```

---

## 五、 面试官高频连环追问

1. **追问 1：Vue 2 中执行了 `this.$set`，底层到底干了什么？**
   * **解答**：
     * 如果目标是**数组**：底层调用 `target.splice(indexOfItem, 1, val)`，直接复用已经重写过的 `splice` 变异方法来触发更新。
     * 如果目标是**对象**：首先判断 key 是否已经存在于 target 中（存在则直接赋值并返回）；若不存在，通过 `defineReactive(ob.value, key, val)` 手动给该属性绑定 getter/setter，并调用 `ob.dep.notify()` 强制派发一次视图更新。

2. **追问 2：Vue 3 中为什么社区越来越推荐“少用 reactive，全面拥抱 ref”？**
   * **解答**：
     * **避免解构失活**：`reactive` 只要一解构就丢响应式，开发中极易写出隐蔽 Bug，而 `ref` 必须通过 `.value` 访问，心智模型更显式且无论怎么传递都保持响应性；
     * **避免赋值断联**：异步拉取列表重置时，`reactive` 不能直接赋值覆盖（覆盖后 Proxy 失效），而 `ref.value = res.data` 天然支持整体重新赋值；
     * **类型推导更稳定**：在 TypeScript 支持上，`Ref<T>` 更加清晰自然。
