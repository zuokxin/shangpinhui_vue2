// 引入mockjs插件开始模拟数据
import Mock from 'mockjs';
// 引入数据：JSON数据格式数据
// 比如：图片资源、JSON资源【里面不用写export关键字】，默认对外暴漏
import banner from './banner.json';
import floor from './floor.json';

// 接口：相当于nodejs里面的中间件
// 第一个参数：接口的地址 第二个参数：向这个接口发送请求获取到的数据
// mock插件：中间默认是Get请求
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("mock/floor",{code:200,data:floor})