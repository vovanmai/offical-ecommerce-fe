import Link from 'next/link'
import { Button, Result } from 'antd';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Rất tiếc. Trang này không được tìm thấy"
      extra={
        <Link href="/">
          <Button type="primary">Về trang chủ</Button>
        </Link>
      }
  />
  )
}
