<template>
  <div class="type-nav">
      <div class="container">
          <!-- 事件的委派 -->
          <div @mouseleave="leaveHandler">
              <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
              <!--商品分类的地方:虽然刚开始的时候商品分类结构在底部,调整到当前位置，但是页面结构没有太大的变化,因为老师们已经把样式搞定了-->
              <transition name="sort">
                  <div class="sort" v-show="show">
                      <div class="all-sort-list2">
                          <!--一级分类地盘-->
                          <div class="item" v-for="(c1, index) in category" :key="c1.categoryId">
                              <h3
                                  @mouseenter="enterHandler(index)"
                                  :class="{ active: currentIndex == index }">
                                  <a @click="goSearch1(c1.categoryName, c1.categoryId)">{{
                                      c1.categoryName
                                  }}</a>
                              </h3>
                              <div style="height: 10px; width: 100%; backgroundcolor: red"></div>
                              <!-- 通过JS实现动态行内样式，进行二级、三级分类的显示与隐藏(display:none|block切换的) -->
                              <div
                                  class="item-list clearfix"
                                  :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                  <!--二级分类-->
                                  <div
                                      class="subitem"
                                      v-for="c2 in c1.categoryChild"
                                      :key="c2.categoryId">
                                      <dl class="fore">
                                          <dt>
                                              <a
                                                  @click="
                                                      goSearch2(c2.categoryName, c2.categoryId)
                                                  "
                                                  >{{ c2.categoryName }}</a
                                              >
                                          </dt>
                                          <dd>
                                              <!--三级分类-->
                                              <em
                                                  v-for="c3 in c2.categoryChild"
                                                  :key="c3.categoryId">
                                                  <a
                                                      @click="
                                                          goSearch3(
                                                              c3.categoryName,
                                                              c3.categoryId
                                                          )
                                                      "
                                                      >{{ c3.categoryName }}</a
                                                  >
                                              </em>
                                          </dd>
                                      </dl>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </transition>
          </div>
          <nav class="nav">
              <a href="###">服装城</a>
              <a href="###">美妆馆</a>
              <a href="###">尚品汇超市</a>
              <a href="###">全球购</a>
              <a href="###">闪购</a>
              <a href="###">团购</a>
              <a href="###">有趣</a>
              <a href="###">秒杀</a>
          </nav>
      </div>
  </div>
</template>

<script>
//利用辅助函数获取仓库state数据--->mapState
import { mapState } from 'vuex'
//mapState辅助函数执行:数组、对象
//底下的这种写法:是将lodash全部API引入,将来项目打包的时候，体积会大一些
// import _ from "lodash";
//引入手段:按需引入
// import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
      return {
          //利用响应式属性,将来存储用户鼠标进入哪一个一级分类的索引值
          currentIndex: -1,
          show: true, //默认显示
      }
  },
  methods: {
      //鼠标进入的方法
      enterHandler: function (index) {
          //修改响应式数据
          this.currentIndex = index
          //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
          //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
          //函数的防抖与节流技术
          console.log('处理业务' + index)
      },
      //鼠标移出事件
      leaveHandler() {
          //鼠标移出高亮的效果消失
          this.currentIndex = -1
          console.log('mouseLeave')
          //隐藏商品分类
          //鼠标离开:在search路由下,在修改数据
          if (this.$route.path != '/home') {
              this.show = false
          }
      },
      //全部商品分类鼠标进入
      changeShow() {
          //鼠标进入:在search路由下,在修改数据
          if (this.$route.path != '/home') {
              this.show = true
          }
      },
      //一级分类a标签的事件的回调
      goSearch1(categoryName, id) {
          //携带query参数:categoryName,category1Id
          this.$router.push({
              name: 'search',
              query: { categoryName, category1Id: id },
          })
      },
      goSearch2(categoryName, id) {
          //携带query参数:categoryName,category1Id
          this.$router.push({
              name: 'search',
              query: { categoryName, category2Id: id },
          })
      },
      goSearch3(categoryName, id) {
          //携带query参数:categoryName,category1Id
          this.$router.push({
              name: 'search',
              query: { categoryName, category3Id: id },
          })
      },
  },
  //不管是Home|Search利用的都是全局组件TypeNav,TypeNav在Home路由与Search路由下状态不一样的。
  //VC身上有一个很值钱的东西$route,这玩意可以让你知道当前TypeNav处于那个路由下
  mounted() {
      //派发action
      //路由切换的时候,路由组件会被销毁重建【子组件不也是】
      if (this.$route.path != '/home') {
          this.show = false
      }
  },
  //计算属性
  computed: {
      //数组的写法:目前书写的是大仓库state的K  ...mapState(['home'])

      ...mapState({
          //对象写法,对象的K,给VC新增的属性
          //新增的属性erha,右侧属性值为箭头函数返回的结果。作为新增属性的属性值
          //箭头函数执行，注入一个参数state->大仓库【包含小仓库】
          category: (state) => state.home.category, //对象简写形式
      }),
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
          width: 210px;
          height: 45px;
          background-color: #e1251b;
          line-height: 45px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
      }

      .nav {
          a {
              height: 45px;
              margin: 0 22px;
              line-height: 45px;
              font-size: 16px;
              color: #333;
          }
      }

      .sort {
          position: absolute;
          left: 0;
          top: 45px;
          width: 210px;
          height: 461px;
          position: absolute;
          background: #fafafa;
          z-index: 999;

          .all-sort-list2 {
              .item {
                  h3 {
                      line-height: 30px;
                      font-size: 14px;
                      font-weight: 400;
                      overflow: hidden;
                      padding: 0 20px;
                      margin: 0;

                      a {
                          color: #333;
                      }

                      &.active {
                          background: yellowgreen;
                      }
                  }

                  .item-list {
                      display: none;
                      position: absolute;
                      width: 734px;
                      min-height: 460px;
                      background: #f7f7f7;
                      left: 210px;
                      border: 1px solid #ddd;
                      top: 0;
                      z-index: 9999 !important;

                      .subitem {
                          float: left;
                          width: 650px;
                          padding: 0 4px 0 8px;

                          dl {
                              border-top: 1px solid #eee;
                              padding: 6px 0;
                              overflow: hidden;
                              zoom: 1;

                              &.fore {
                                  border-top: 0;
                              }

                              dt {
                                  float: left;
                                  width: 54px;
                                  line-height: 22px;
                                  text-align: right;
                                  padding: 3px 6px 0 0;
                                  font-weight: 700;
                              }

                              dd {
                                  float: left;
                                  width: 415px;
                                  padding: 3px 0 0;
                                  overflow: hidden;

                                  em {
                                      float: left;
                                      height: 14px;
                                      line-height: 14px;
                                      padding: 0 8px;
                                      margin-top: 5px;
                                      border-left: 1px solid #ccc;
                                  }
                              }
                          }
                      }
                  }
                  /*温馨提示:豪哥不想利用样式控制二级、三级分类显示与隐藏,下面的代码进行注释*/
                  /* &:hover {
          .item-list {
            display: block;
          }
        }
        */
              }
          }
      }

      /*过渡动画:商品分类 进入阶段*/
      .sort-enter {
          height: 0px;
      }

      .sort-enter-active {
          transition: all 0.3s;
      }
      .sort-enter-to {
          height: 461px;
      }
  }
}
</style>
