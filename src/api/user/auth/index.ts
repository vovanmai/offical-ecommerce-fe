import api from '@/api/axiosClient';

export function getCompanies(params: object) {
  return api.get('api/companies', { params: params});
}

export function login(data: object) {
  return api.post('api/login', data);
}

export function register(data: object) {
  return api.post('api/register', data);
}

export function getProfile() {
  return api.get('api/admin/me');
}

export function logout() {
  return api.get('api/logout');
}