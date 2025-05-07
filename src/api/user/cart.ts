import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('api/carts', {params});
}

export function create(data: object) {
  return api.post('api/carts', data);
}

export function update(id: any, data: object) {
  return api.put('api/carts/' + id, data);
}

export function deleteCart(id: any) {
  return api.delete('api/carts/' + id);
}
