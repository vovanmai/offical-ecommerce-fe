import api from '@/api/admin/axiosClient';

export function list(params: object = {}) {
  return api.get('api/admin/settings', {params});
}

export function create(data: object) {
  return api.post('api/admin/settings', data);
}