/**
 * 
 * @param {Array} data 要处理的数组
 * @param {String} key 要筛选的key值
 * @return {Array} 
 * @author rainci(刘雨熙)
 * @time 2019.6.20
 * @attention 对数组进行重复过滤，每个值保持唯一性
 */
export const uniqueArray = (data=[],key) => {//过滤数据唯一性，数组中每条对象都是唯一的
    if(data.constructor.name !== 'Array' || !data.length)return [];
	if(!key) return data;
    const saveMap = new Map();
    return data.filter(item => {
        if(!Object.keys(item).includes(key)) return false;
        return !saveMap.has(item[key]) && saveMap.set(item[key],1)
    })
}