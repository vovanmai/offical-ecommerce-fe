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
    {
      regex: /^\/admin\/products\/\d+\/edit$/,
      path: ADMIN_ROUTES.PRODUCT_LIST
    },
    {
      regex: /^\/admin\/pages$/,
      path: ADMIN_ROUTES.PAGE_LIST
    },
    {
      regex: /^\/admin\/pages\/create$/,
      path: ADMIN_ROUTES.PAGE_LIST
    },
    {
      regex: /^\/admin\/pages\/\d+\/edit$/,
      path: ADMIN_ROUTES.PAGE_LIST
    },
    {
      regex: /^\/admin\/banners$/,
      path: ADMIN_ROUTES.BANNER_LIST
    },
    {
      regex: /^\/admin\/banners\/create$/,
      path: ADMIN_ROUTES.BANNER_LIST
    },
    {
      regex: /^\/admin\/banners\/\d+\/edit$/,
      path: ADMIN_ROUTES.BANNER_LIST
    },
    {
      regex: /^\/admin\/post-categories$/,
      path: ADMIN_ROUTES.CATEGORY_POST_LIST
    },
    {
      regex: /^\/admin\/post-categories\/\d+\/edit$/,
      path: ADMIN_ROUTES.CATEGORY_POST_LIST
    },
    {
      regex: /^\/admin\/posts$/,
      path: ADMIN_ROUTES.POST_LIST
    },
    {
      regex: /^\/admin\/posts\/create$/,
      path: ADMIN_ROUTES.POST_LIST
    },
    {
      regex: /^\/admin\/posts\/\d+\/edit$/,
      path: ADMIN_ROUTES.POST_LIST
    },
    {
      regex: /^\/admin\/settings$/,
      path: ADMIN_ROUTES.SETTING
    },
    {
      regex: /^\/admin\/users$/,
      path: ADMIN_ROUTES.USER_LIST
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


export const getFileLink = (upload: any) => {
  return `${upload.data.endpoint_url}/${upload.path}/${upload.filename}`;
}