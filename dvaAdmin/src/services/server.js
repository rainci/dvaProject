import request from '../utils/request';
const api = '/api'
export function loginFn(filter){
    return request(`${api}/login`,{
        method: 'post',
        data: {...filter},
    })
}