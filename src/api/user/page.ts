import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('api/pages', { params });
}

export function getById(id: number) {
  return api.get(`api/categories/${id}`);
}
