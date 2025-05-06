import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('api/carts', {params});
}

export function create(data: object) {
  return api.post('api/carts', data);
}
