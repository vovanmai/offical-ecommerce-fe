import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('api/banners', {params});
}
