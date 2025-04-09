import { ADMIN_ROUTES } from "../../../constants/routes"
import { FaCircle } from "react-icons/fa";


const menus = [
  {
    key: ADMIN_ROUTES.CATEGORY_PRODUCT_LIST,
    label: 'Danh mục sản phẩm',
    icon: <FaCircle />
  },
  {
    key: ADMIN_ROUTES.PRODUCT_LIST,
    label: 'Sản phẩm',
    icon: <FaCircle />
  },
  {
    key: ADMIN_ROUTES.PAGE_LIST,
    label: 'Trang',
    icon: <FaCircle />
  },
  {
    key: ADMIN_ROUTES.BANNER_LIST,
    label: 'Banners',
    icon: <FaCircle />
  },
  {
    key: ADMIN_ROUTES.CATEGORY_POST_LIST,
    label: 'Danh mục bài viết',
    icon: <FaCircle />
  },
  {
    key: ADMIN_ROUTES.POST_LIST,
    label: 'Bài viết',
    icon: <FaCircle />
  },
  {
    key: ADMIN_ROUTES.SETTING,
    label: 'Cài đặt',
    icon: <FaCircle />
  },
]

export default menus