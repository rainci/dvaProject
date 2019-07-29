/** 
 * @param {Object} target 目标对象
 * @param {String} format 格式，如'a.b.c'  let obj = {a:{b:{c}}}
 * @author rainci(刘雨熙) 
 * 从对象中获取想要的key对应的value
 */
export function avoidData(target, format) {
    let keys = format.split('.');
    let result = target;
    for (const key of keys) {
        if (result) {
            result = result[key];
        } else {
            return undefined;
        }
    }
    return result;
}