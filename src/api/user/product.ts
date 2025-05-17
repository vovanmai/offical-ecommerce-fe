import api from '@/api/user/axiosClient';


export function list(params: object = {}) {
  return api.get('api/products', {params});
}

export function listByCategory(slug: string, params: object = {}) {
  return api.get(`api/categories/${slug}/products`, {params});
}