/**
 * 
 * @param {String} str 
 * @auther Rainci 刘雨熙
 * @time 2019.6.18 
 */
function splitNum(str) {
  let nowStr = '',//暂存number
    operArr = [],//存储运算符
    re = /[\+\-\*\/]/g;//正则，匹配加减乘除
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(re) == null) {
      nowStr += str[i]
    } else {
      operArr.push(str[i]);
      nowStr += ',';//说明此时是操作符，字符串加，用于区分数字
    }
  }
  return {
    operArr,
    numArr: nowStr.split(','),//数据数组
  }
}
/**
 * 
 * @param {Array} numArr 数字组合
 * @param {Array} operArr 操作符组合
 * @auther Rainci 刘雨熙
 * @time 2019.6.18
 */
function multDiv(numArr,operArr){
  let aa = '';
  let temp = 0; //存储乘除计算值
  let arrPM = [];
  for (let i = 0; i < operArr.length; i++) {
    if (i == 0 && operArr[i] === ('+' || '-')) {
      arrPM.push(numArr[0])
      arrPM.push(operArr[i])
      continue;
    }

    if (operArr[i] == '+' || operArr[i] == '-') {
      if (temp) {
        arrPM.push(temp)
        arrPM.push(operArr[i])
        temp = 0;
      } else {
        arrPM.push(numArr[i])
        arrPM.push(operArr[i])
      }

    } else if (operArr[i] === '*') {
      
      if (temp) {
        temp *= numArr[i + 1]
      } else {
        temp = numArr[i] * numArr[i + 1]
      }
    } else if (operArr[i] == '/') {
      if (temp) {
        temp /= numArr[i + 1]
      } else {
        temp = numArr[i] / numArr[i + 1]
      }
    }
    if (i == operArr.length - 1) {
      // aa += temp
      if(temp){//当操作到最后一个值的时候，如果有temp，将计算后的temp直接放到数组末尾
        arrPM.push(temp)
      }else{
        arrPM.push(numArr[i+1])
      }
      
    }
  }
  return arrPM;
}
/**
 * 
 * @param {String} str 用于计算的字符串表达式
 * @auther Rainci 刘雨熙
 * @time 2019.6.18
 */
function count(str) {
  let { operArr, numArr } = splitNum(str);
  let arrPM = multDiv(numArr,operArr),
      totle = arrPM[0]*1;
  for(let i=1;i<arrPM.length;i++){
    if(arrPM[i] === '+'){
      totle += arrPM[i+1]*1
    }
    if(arrPM[i] === '-'){
      totle -= arrPM[i+1]*1
    }
  }
  return totle;
}

let str = '13+4*5/2-9+6*20';
count(str) //134