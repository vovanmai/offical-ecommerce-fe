import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('api/orders', {params});
}

export function create(data: object) {
  return api.post('api/orders', data);
}

export function update(id: any, data: object) {
  return api.put('api/orders/' + id, data);
}

