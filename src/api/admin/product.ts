import api from '@/api/axiosClient';


export function list(params: object) {
  return api.get('api/admin/products', {params});
}

export function getById(id: number) {
  return api.get(`api/admin/products/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/products', data);
}

export function update(id: any, data: object) {
  return api.put(`api/admin/products/${id}`, data);
}

export function deleteProduct(id: number) {
  return api.delete(`api/admin/products/${id}`);
}