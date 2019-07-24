/** 
 * @param {Array} child
 * @return {Array} 
 * @author rainci(刘雨熙) 
 * 主要针对权限配置(menu)的数据做结构拆分和组合
 */
export function dealMenuData(child) {
    let result = [];
    child.forEach((item, index) => {
      const { children, func={} } = item;
      const { funcId, name, url, type } = func;
      result[index] = {
        id: funcId,
        sub: {
          icon: 'mail',
          title: name,
          url,
          type,
        },
        list: dealMenuData(children)
      }
    })
  
    return result;
  }