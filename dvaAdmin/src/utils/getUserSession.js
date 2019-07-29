/** 
 * sessionStorage取token数据
 * @return {Object}
 * @author rainci(刘雨熙) 
 */
export function getUserSession(){
    var ss = sessionStorage.getItem("jwtToken")
    if(ss){
        var {code, accessToken} = JSON.parse(ss)
        return {
            'Univer-Code': code,
            'Univer-token': accessToken
        }
    }
    return {}
    
}