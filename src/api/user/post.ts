import api from '@/api/user/axiosClient';


export function list(params: object = {}) {
  return api.get('api/posts', {params});
}

export function listByCategory(slug: string, params: object = {}) {
  return api.get(`api/categories/${slug}/posts`, {params});
}