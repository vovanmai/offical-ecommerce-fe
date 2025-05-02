import api from '@/api/admin/axiosClient';


export function list(params: object) {
  return api.get('api/admin/posts', {params});
}

export function getById(id: number) {
  return api.get(`api/admin/posts/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/posts', data);
}

export function update(id: any, data: object) {
  return api.put(`api/admin/posts/${id}`, data);
}

export function deletePost(id: number) {
  return api.delete(`api/admin/posts/${id}`);
}