import request from '../utils/request';
const api = '/api'
export function loginFn({userName,password}){
    return request(`${api}/getLogin`,{
        // return request(`${api}/login?userName=${userName}&password=${password}`,{
        method: 'POST',
        body: JSON.stringify({userName,password}),
    })
}
export function tenantListFn({filter,page=1}){
    return request(`${api}/getTenantList`,{
        // return request(`${api}/login?userName=${userName}&password=${password}`,{
        method: 'POST',
        body: JSON.stringify({...filter,page,row:10}),
    })
}