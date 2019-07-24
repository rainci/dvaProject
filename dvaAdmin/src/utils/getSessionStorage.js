/** 
 * 
 * @param {String} key
 *  @return {Object} 对应的value
 * @author rainci(刘雨熙) 
 * sessionStorage取数据
 */
export function getList (key) {
    var value = sessionStorage.getItem(key)
    if (!value)return []
    try {
      return JSON.parse(value)
    } catch (e) {
      return []
    }
  }