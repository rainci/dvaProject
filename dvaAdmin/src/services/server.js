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
export function treeListFn({filter:{name,type,page=1}}){
    return request(`${api}/service/data/tag/tree/list?name=${name}&type=${type}&page=${page}&row=${10}`,{
        method: 'GET',
    })
}
export function addTenantsFn({filter}){
    return request(`${api}/tenant/add`,{
        method: 'POST',
        body: JSON.stringify(filter),
    })
}