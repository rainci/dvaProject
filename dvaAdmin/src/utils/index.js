/**
 * 
 * @return {Object}
 * @author rainci(刘雨熙)
 * @time 2019.6.5
 * @about 关于方法集合
 */
import tool from './tool'
import { timeTransform } from './timeTransform'
import { textTransform } from './textTransform'
import { uniqueArray } from './uniqueArray'
import { dealMenuData } from './dealMenuData'
import { avoidData } from './avoidData'
import { getList } from './getSessionStorage'
import { setList } from './setSessionStorage'
// import { filterOneId } from './filterOneId'
import { filterOneData } from './filterOneData'
import { getUserSession } from './getUserSession'
import { generateData } from './generateData'
import { getArrayKeyIndex } from './getArrayKeyIndex'
export {   
    tool,
    timeTransform,//时间转换，将毫秒转换成00:00:00格式
    textTransform,//文字段落转换，将文字段落中带有<>的标签去掉
    uniqueArray,//对值为对象的数组进行唯一过滤
    dealMenuData,//处理menu data
    avoidData,//从对象中拿指定的key值
    getList,//从sessionStorage中获取数据
    setList,//设置sessionStorge值
    // filterOneId,//从数组里面筛选某一条对象值中是否包含此id
    filterOneData,////从数组里面筛选某一条对象值中对应此id的数据
    getUserSession,//获取用户session信息
    generateData,//将多层级的数据处理成单层级的数据
    getArrayKeyIndex,//获取数组中，某条对象的key值，所在的index
}