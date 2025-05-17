import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('api/categories', { params });
}

export function getDetail(slug: string, params: object = {}) {
  return api.get(`api/categories/${slug}`, params);
}
