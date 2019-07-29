export default {
    unitConvert(num = 0) {  //计算单位
        let endNum = `${num}`,
            numLen = endNum.length;
        if (numLen < 5) {
            return `${endNum}`
        }
        if (numLen >= 5 && numLen < 9) {
            endNum = (parseInt((endNum / 10000) * 100,10) / 100).toFixed(2);
            return `${endNum}万`
        }
        if (numLen >= 9 && numLen < 13) {
            endNum = (parseInt((endNum / 100000000) * 100,10) / 100).toFixed(2);
            return `${endNum}亿`
        }
        if (numLen >= 13) {
            endNum = (parseInt((endNum / 100000000000) * 100,10) / 100).toFixed(2);
            return `${endNum}千亿`
        }
    },
}