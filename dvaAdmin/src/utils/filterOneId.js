/**
 * 
 * @param {Array} data 筛选data
 * @param {Number} filterId 筛选id
 * @return {Boolean}
 * @author rainci(刘雨熙)
 */
export const filterOneId = (filterId, data=[]) => {
    for(let {id,list} of data){
        if(id === filterId)return true
        if(list && list.length){
            let result = filterOneId(filterId, list)
            if(result)return true
        }
    }
  }