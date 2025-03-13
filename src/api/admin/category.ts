import api from '@/api/axiosClient';

export function getRoles(params: object) {
  return api.get('api/admin/categories', { params: params});
}

export function getAll() {
  return api.get('api/admin/categories');
}

export function getRole(id: number) {
  return api.get(`api/roles/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/categories', data);
}

export function updateOrder(data: object) {
  return api.post('api/admin/categories/update-order', data);
}

export function deleteRole(id: number) {
  return api.delete(`api/roles/${id}`);
}