import api from '@/api/admin/axiosClient';


export function list(params: object) {
  return api.get('api/admin/pages', {params});
}

export function getById(id: number) {
  return api.get(`api/admin/pages/${id}`);
}

export function create(data: object) {
  return api.post('api/admin/pages', data);
}

export function update(id: any, data: object) {
  return api.put(`api/admin/pages/${id}`, data);
}

export function deletePage(id: number) {
  return api.delete(`api/admin/pages/${id}`);
}