import api from '@/api/axiosClient';


export function list(params: object) {
  return api.get('api/admin/products', {params});
}

export function getById(id: number) {
  return api.get(`api/admin/categories/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/products', data);
}

export function update(id: any, data: object) {
  return api.put(`api/admin/categories/${id}`, data);
}

export function updateOrder(data: object) {
  return api.post('api/admin/categories/update-order', data);
}

export function deleteProduct(id: number) {
  return api.delete(`api/admin/products/${id}`);
}