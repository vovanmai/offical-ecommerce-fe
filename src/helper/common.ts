import { ADMIN_ROUTES } from '../constants/routes'
export const removeEmptyFields = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
};

export const getActiveAdminMenuByRoute = (pathname: string) => {
  const matchRoutes = [
    {
      regex: /^\/admin\/categories$/,
      path: ADMIN_ROUTES.CATEGORY_PRODUCT_LIST
    },
  ]

  const route = matchRoutes.find((route) => {
    return route.regex.test(pathname)
  })

  return route ? route.path : null
}


export const validateMessages = {
  required: 'Vui lòng nhập.',
  types: {
    email: 'Định dạng email không hợp lệ.',
    number: 'Phải là một số.',
  },
  string: {
    max: 'Không được vượt quá ${max} ký tự.',
    min: 'Tối thiểu ${min} ký tự.',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
  pattern: {
    mismatch: 'Không đúng định dạng.'
  }
};
