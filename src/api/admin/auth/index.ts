import api from '@/api/admin/axiosClient';

export function getCompanies(params: object) {
  return api.get('api/companies', { params: params});
}

export function login(data: object) {
  return api.post('api/admin/login', data);
}

export function getProfile() {
  return api.get('api/admin/me');
}

export function logout() {
  return api.get('api/admin/logout');
}