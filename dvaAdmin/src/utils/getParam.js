/**
 * @author rainci
 * @time 2019.8.19
 * return {Object} obj
 */
export function getParams() {
    let params = window.location.search.substring(1),
        arr = params && params.split('&'),
        obj = {};
    if (!arr.length) return obj;
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i].split('=')
        obj[item[0]] = item[1]
    }
    return obj
}