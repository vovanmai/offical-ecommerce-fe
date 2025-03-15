'use client'
import { Inter } from "next/font/google";
import "@/assets/admin/globals.scss"
import "react-nestable/dist/styles/index.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

import AppProvider from '@/context/AppProvider'
import store from '@/store/admin/store'
import { Provider } from 'react-redux'
import { useAppSelector } from '@/store/admin/hooks'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getPrimaryColor } from "@/store/admin/appSlice"

import 'dayjs/locale/vi'

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const primaryColor = useAppSelector(getPrimaryColor);

  const customTheme = {
    token: {
      colorPrimary: primaryColor,
    },
  };

  return (
    <ConfigProvider theme={customTheme} locale={viVN}>
      <AppProvider>
        {children}
        <ToastContainer />
      </AppProvider>
    </ConfigProvider>
  );
}

const inter = Inter({ subsets: ["latin"] }); // ✅ Định nghĩa ở module scope


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className={inter.className} suppressHydrationWarning={true}>
      <Provider store={store}>
        <AntdRegistry>
          <ThemeWrapper>{children}</ThemeWrapper>
        </AntdRegistry>
      </Provider>
    </body>
  );
}
