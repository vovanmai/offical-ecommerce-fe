// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-4xl font-bold text-red-600">404 - Không tìm thấy trang</h1>
      <p className="mt-4 text-lg text-gray-700">
        Trang bạn đang tìm không tồn tại hoặc đã bị xóa.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Quay lại trang chủ
      </Link>
    </div>
  )
}
