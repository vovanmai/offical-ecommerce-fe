import api from '@/api/admin/axiosClient';

export function getAll(params: object = {}) {
  return api.get('api/permissions', { params: params});
}

