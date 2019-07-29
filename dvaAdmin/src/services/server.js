import request from '../utils/request';
const api = '/api'
export function loginFn({userName,password}){
    return request(`${api}/login`,{
        // return request(`${api}/login?userName=${userName}&password=${password}`,{
        method: 'get',
        params: {userName,password},
    })
}