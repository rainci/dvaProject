/**
 * 
 * @param {Array} data 要处理的数组
 * @param {String} key 要筛选的key
 * @param {String} value 要筛选的key值
 * @return {Number} index值
 * @author rainci(刘雨熙)
 * @time 2019.6.20
 * @attention 对数组进行重复过滤，每个值保持唯一性
 */
export const getArrayKeyIndex = ({data=[],key, value}) => {//过滤某条数据的key值所在的index
    if(data.constructor.name !== 'Array' || !data.length || !key)return;
    let idx;
    data.some(( item, index ) => {
        if( item[key] === value ){
            return idx = index
        }
        return false
    })
    return idx
}