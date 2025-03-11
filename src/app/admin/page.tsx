'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation"
import { ADMIN_ROUTES } from "@/constants/routes";

const Dashboard = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(ADMIN_ROUTES.CATEGORY_PRODUCT_LIST)
  }, [router])
  return (
    <div>Đang tải...</div>
  )
}

export default Dashboard