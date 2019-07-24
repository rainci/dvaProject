/**
 * 
 * @param {String} num 要处理的时间，默认毫秒
 * @return {String} 
 * @author rainci(刘雨熙)
 * @time 2019.5.27
 */
export const timeTransform = (num) => {//计算时分秒
    if(!num) return '';
    // if(!num) return '00:00:00';
    var days = parseInt(num / (1000 * 60 * 60 * 24),10);
    var hours = timeZero(parseInt((num % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days*24,10));
    var minutes = timeZero(parseInt((num % (1000 * 60 * 60)) / (1000 * 60),10));
    var seconds = timeZero(Math.floor((num % (1000 * 60)) / 1000));
    return `${hours}:${minutes}:${seconds}`
}
const timeZero = (t) => {//转换展现形式
    if (t > 0 && t < 10)return `0${t}`;
    if(t > 10)return `${t}`;
    return '00';   
} 