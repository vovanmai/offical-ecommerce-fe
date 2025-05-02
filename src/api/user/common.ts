import api from '@/api/admin/axiosClient';

export function createUpload(data: any, header = {}) {
  return api.post('api/uploads', data, header);
}
