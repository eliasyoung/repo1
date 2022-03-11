# Vue2

## 1. Vue-router 编程式导航

### params

需要在路由中设置占位符。 ###编程式导航对象写法中 path 不能和 params 一起使用
编程式导航中必须在路由中设置 name 并在传参时使用 name 才能使用 params 传参。
如果提供了 path，传递的对象中的 params 会自动被忽略。

```javascript
// src/router/index.js
const routes = [
  {
    path: "/link/:sth",
    name: "routeName",
  },
];

// in component
$router.push({
  name: "routeName",
  params: { sth: "bla" },
  query: { queryValue: "ga" },
});
$router.push({ path: "/link/bla" });
```

#### 指定 params 参数可传可不传

```javascript
const routes = [{ path: "/link/:sth?" }]; //参数后加问号
```

#### params 参数可传可不传的情况下，若传递的 params 为空串如何解决

若 value 为空串，表达式取值为 undefined，视为未传 params 参数。
若不做处理则为传递空字符串导致报错。

```javascript
let value = "";
const routes = [{ path: "/link/:sth?", name: "routeName" }];

$router.push({
  name: "routeName",
  params: { sth: value || undefined }, //若value为空串，表达式取值为undefined，视为未传params参数
});
```

### query

无论使用路径 path 还是命名路由 name，都可传递 query 参数。

```javascript
const routes = [{ path: "/link/:sth?", name: "routeName" }];

$router.push({path:'/link'},query:{queryValue:'ga'}})
$router.push({name:'routeName',query:{queryValue:'ga'}})

//声明式路由路径写法：
let url = '/link?queryValue='ga'
```

### props

**布尔模式:** 在路由中设置 props 为 true，则传递的 params 参数会作为 props 参数传递至组件。

```javascript
const routes = [{ path: "/link/:sth?", props: true }];
```

**对象模式:** 也可在路由中通过对象指定静态参数通过 props 传递至组件。

```javascript
const routes = [
  { path: "/link/:sth?", props: { a: "huwu", b: "qifei", c: 123, d: true } },
];
```

**函数模式:**
下例中 URL /link?queryValue=bla 或对象 {path:'/link',query:{queryValue:'bla'}} 会将 {query:'bla',a:123} 做为参数传递给组件

```javascript
const routes = [
  { path: "/link/:sth?",
  props: route=>{
    query:route.query.queryValue
    a: 123
  },
];
```

## 2. 声明式导航 router-link

### 基本用法

```javascript
<router-link to=`/search/${value}`></router-link>
```

### 注意

<router-link>是一个组件，如果页面内有过多用<router-link>实现的导航会导致卡顿

## 3. 解决 NavigationDuplicated:

_该问题出现在重复使用同参数跳转至同路由的情况下_

重写 VueRouter.prototype.push & VueRouter.prototype.replace,
使用 call() | apply() | bind() 方法使得调用原 push/replace 方法时的 this(上下文)为$router(VueRouter 的实例对象)

```javascript
// /src/main.js
import VueRouter from "vue-router";

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve || reject) {
    return originPush.call(this, location, resolve, reject);
  }
  return originPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err;
    }
    return Promise.reject(err);
  });
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve || reject) {
    return originReplace.call(this, location, resolve, reject);
  }
  return originReplace.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err;
    }
    return Promise.reject(err);
  });
};
```

## 4. 箭头函数与Vue2

### 定义methods内的方法时不应使用箭头函数

理解：vue2通过bind()将组件内methods中的方法的this绑定为VueComponent实例对象(vm)，而箭头函数的this在定义时已经决定，无法通过bind()更改。故在methods中的方法不能使用箭头函数定义，否则无法正确通过this获取实例中的data,computed等数据。

```javascript
methods:{
    add(){
        this.bla++   //this最终正确指向VueComponent实例对象
    }
}

methods:{
    add:()=>{
        this.bla++	//this为undefined
    }
}
```

## 5. 事件委派



## ?. 封装Axios

## ?. Vuex

### Vuex的基本配置

#### src/store/index.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state: 存储仓库数据
const state = {}
// mutations: 修改state中的数据
const mutations = {}
// actions: 处理action，书写业务逻辑，也可以处理异步
const actions = {}
// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

```

#### src/main.js

```javascript
//...
import store from './store'

new Vue({
    render:h=>h(app),
    router,
    store	// 注册仓库，注册完后组件实例对象上多出一个属性$store
}).mount('#app')
```

### Vuex state

#### 基本使用

```javascript
computed:{
    count:function(){
        return this.$store.state.count
    }
}
```

#### mapState函数

函数自动生成从state中获取属性的计算方法，返回值为包含这些计算方法的对象，故使用时需要...运算符进行结构

```javascript
//mapState
import { mapState } from 'vuex'

computed:{
     // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
}

computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

//对象展开符与mapState
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}

//对象写法 可在组件中为key值命名
...mapState({bla:'sum',ga:'count',gua:'name'})   
...mapState({
    bla: state => state.count
})
//数组写法 组件中key的名字与state中属性名一致
...mapState(['sum','count','name'])

```

### Vuex mutations

#### 用法

定义一个函数作为mutation handler，该函数接收的第一个参数为state。要触发该mutation handler，需要调用store.commit方法。

```javascript
mutations: {
	increment(state){
		state.count++
	}
}

store.commit('increment')
```

除了第一个参数state外，还可以传递第二个参数payload，方便传值进行修改，建议传入对象做为payload，可读性更强。

```javascript
//传入的payload为数值
mutations:{
	increment(state,payload){
		state.count += payload
	}
}

store.commit('increment',1)

//传入的payload为对象
const a = { number:1 }
mutations:{
	increment(state,payload){
		state.count += payload.number
	}
}
store.commit('increment',a)
```

提交commit时也可直接传入包含type属性的对象进行提交。

```javascript
mutations:{
    increment(state,payload){
        state.count += payload.number
    }
}
store.commit({
    type: 'increment',
    number: 10
})
```

#### mapMutations

```javascript
import { mapMutations } from 'vuex'

export default {
    methods:{
        ...mapMutation([
            'increment',		// this.increment(){ this.$store.commit('increment') }
            'incrementBy'		// 支持载荷payload this.incrementBy(amount) { this.$store.commit('incrementBy',amount) }
        ])
        ...mapMutation({ add:'increment' })	// this.add(){ this.$store.commit('increment') }
    }
}
```

### Vuex actions

#### 用法

因mutations handler最好为同步函数，方便监听状态变化。故建议在actions中完成异步业务并触发mutations handler进行state中的数据修改。使用store.dispatch分发actions

```javascript
// /src/store/index.js
actions:{
	increment(context){
        context.commit('increment')
    }
    
    increment({ commit }){	//参数解构后的写法
        commit('increment')
    }
}

// component
export default {
    methods:{
     	increment(){
            this.$store.dispatch('increment')
        }   
    }
}
```

actions同样支持payload参数以及对象写法进行分发

```javascript
// 分发时添加payload参数
$store.dispatch('incrementBy',{ amount:10 })

// 使用对象写法进行分发
$store.dispatch({
    type:'incrementBy',
    amount:10
})
```

#### mapActions

```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

### 模块化开发

#### 基本用法

将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状
```

#### 命名空间

```javascript
const accountManage = {
    namespaced: true,
    state: {
        accountName:'bla'
    }
    getters: {
    	isAdmin () { ... } // -> getters['account/isAdmin']
    },
    actions: {
        login () { ... } // -> dispatch('account/login')
    },
    mutations: {
        login () { ... } // -> commit('account/login')
    },
}
        
const store = new Vuex.store({
  modules:{
    accountManange
  }
})

    
//component
store.dispatch('accountManage/login')
...mapState('accountManage',['accountName'])
...mapState('accountManage', { name: "accountName" }),
```

## ?. 防抖与节流

### 防抖 debounece

实现短时间大量触发事件时，只有最后一次事件会调用函数，节约资源。

```javascript
function debounce(func, delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(func,delay)
    }
}
```

### 节流 throttle

实现单位时间内，触发事件的回调函数只会被调用一次。

```javascript
function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            //fn()
            fn.apply(this,arguments)
            valid = true;
        }, delay)
    }
}
/* 
请注意，节流函数并不止上面这种实现方案,
例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
*/
```

### 可以使用lodash

```
npm i lodash -s

import _ from 'lodash'
	|
import ??? from 'lodash/???'
```

