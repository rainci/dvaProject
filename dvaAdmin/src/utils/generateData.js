/**
 * 
 * @param {Array} data 
 * @return {Array}
 * @author rainci(刘雨熙)
 */
export const generateData = (()=>{//将多层级的数据处理成单层级的数据方法
    let dealData = [];
    return function dealDataFn(data=[]) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        let { children } = node;
        dealData.push(node);
        if (children && children.length) {
          dealDataFn(children);
        }
      }
      return dealData; 
    } 
  })();