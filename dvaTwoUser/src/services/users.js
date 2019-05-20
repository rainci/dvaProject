import request from '../utils/request';

export function fetch({ page = 1 }) {
  return request(`http://localhost:8000/api/users?_page=${page}&_limit=5`);
}
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}