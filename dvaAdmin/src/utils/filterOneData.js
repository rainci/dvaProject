/**
 * 
 * @param {Array} data 筛选data
 * @param {Number} id 筛选id
 * @return {Array}
 * @author rainci(刘雨熙)
 */
export const filterOneData = (id, data) => { //筛选符合id的一条数据
    let arr = [];
    for (let o of data) {
        if (o.tagId === id || o.id === id ) {
            arr.push({ ...o })
            break;
        }
    }
    return arr
  }