import api from '@/api/admin/axiosClient';

export function getRoles(params: object) {
  return api.get('api/admin/post-categories', { params: params});
}

export function getAll() {
  return api.get('api/admin/post-categories');
}

export function getById(id: number) {
  return api.get(`api/admin/post-categories/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/post-categories', data);
}

export function update(id: any, data: object) {
  return api.put(`api/admin/post-categories/${id}`, data);
}

export function updateOrder(data: object) {
  return api.post('api/admin/post-categories/update-order', data);
}

export function deleteCategory(id: number) {
  return api.delete(`api/admin/post-categories/${id}`);
}
