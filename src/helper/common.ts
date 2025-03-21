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
    {
      regex: /^\/admin\/categories\/\d+\/edit$/,
      path: ADMIN_ROUTES.CATEGORY_PRODUCT_LIST
    },
    {
      regex: /^\/admin\/products$/,
      path: ADMIN_ROUTES.PRODUCT_LIST
    },
    {
      regex: /^\/admin\/products\/create$/,
      path: ADMIN_ROUTES.PRODUCT_LIST
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

export const getCategoryOptions = (categories: any, ignoreId: any = null) => {
  return categories.filter((item: any) => (item.parent_id === null && item.id !== ignoreId)).map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    }
  })
}


export const buildCategoryTree = (items: any, parentId: number | null = null) => {
  return items
    .filter((item: any) => item.parent_id === parentId)
    .map((item: any) => ({
      ...item,
      text: item.name,
      value: item.id,
      title: item.name,
      children: buildCategoryTree(items, item.id),
    }));
};




