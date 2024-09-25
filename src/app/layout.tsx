'use client'
import { Inter } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';


const inter = Inter({ subsets: ["latin"] });

import AppProvider from './../context/AppProvider'
import store from '../store/store'
import { Provider } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customTheme = {
  token: {
    // Seed Token
    // colorPrimary: '#00b96b',
    colorPrimary: 'rgb(20 184 166)',
    // borderRadius: 2,

    // Alias Token
    // colorBgContainer: '#f6ffed',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      <Provider store={store}>
        <AntdRegistry>
          <ConfigProvider
            theme={customTheme}
            locale={viVN}
          >
            <AppProvider>
              {children}
              <ToastContainer />
            </AppProvider>
          </ConfigProvider>
        </AntdRegistry>
      </Provider>
      </body>

    </html>
  );
}
