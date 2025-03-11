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

export function createRole(data: object) {
  return api.post('api/roles', data);
}

export function updateRole(id: number, data: object) {
  return api.put(`api/roles/${id}`, data);
}

export function deleteRole(id: number) {
  return api.delete(`api/roles/${id}`);
}