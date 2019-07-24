/** 
 * @param {String} key
 * @param {Object} value
 * @author rainci(刘雨熙) 
 * sessionStorage存储数据
 */
export function setList(key, value) {
    if (typeof value === 'object') {
        sessionStorage.setItem(key, JSON.stringify(value))
    } else {
        throw new Error('value type is not object ')
    }

}
