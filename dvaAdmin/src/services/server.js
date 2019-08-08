import request from '../utils/request';
const api = '/api'
export function loginFn({userName,password}){
    return request(`${api}/login`,{
        // return request(`${api}/login?userName=${userName}&password=${password}`,{
        method: 'get',
        params: {userName,password},
    })
}
export function tenantListFn(filter,page=1){
    return request(`${api}/tenantList`,{
        // return request(`${api}/login?userName=${userName}&password=${password}`,{
        method: 'get',
        params: {...filter,page,row:10},
    })
}