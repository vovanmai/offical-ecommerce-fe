import { ADMIN_ROUTES } from "../../../constants/routes"
import { LockFilled } from "@ant-design/icons"
import { HiUsers } from "react-icons/hi2";
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
]

export default menus