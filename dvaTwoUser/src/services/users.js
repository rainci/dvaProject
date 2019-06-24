import request from '../utils/request';
const api = '/api'
export function fetch({ page = 1 }) {
  return request(`${api}/users?_page=${page}&_limit=5`);
}
export function remove(id) {
  return request(`${api}/users/${id}`, {
    method: 'DELETE',
  });
}