import api from '@/api/admin/axiosClient';


export function list(params: object) {
  return api.get('api/admin/banners', {params});
}

export function getById(id: number) {
  return api.get(`api/admin/banners/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/banners', data);
}

export function update(id: any, data: object) {
  return api.put(`api/admin/banners/${id}`, data);
}

export function deleteBanner(id: number) {
  return api.delete(`api/admin/banners/${id}`);
}