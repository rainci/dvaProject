/**
 * 
 * @param {String} text 要处理的内容
 * @return {String} 
 * @author rainci(刘雨熙)
 * @time 2019.6.5
 */
export const textTransform = text => {//将文字段落中带有<>的标签去掉
    let re = /<[^>]+>/g;
    return text.replace(re, '')
}