'use client'
import { Inter } from "next/font/google";
import "@/assets/user/globals.scss"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

import AppProvider from '@/context/AppProvider'
import store from '@/store/user/store'
import { Provider } from 'react-redux'
import { useAppSelector } from '@/store/user/hooks'

import 'react-toastify/dist/ReactToastify.css';

import { getPrimaryColor } from "@/store/user/appSlice"

import dayjs from 'dayjs';
import 'dayjs/locale/vi'
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.locale('vi');
dayjs.extend(localizedFormat);

import Header from "@/components/user/layout/Header";
import PcMenu from "@/components/user/layout/PcMenu";
import Footer from '@/components/user/layout/Footer';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const primaryColor = useAppSelector(getPrimaryColor);

  const customTheme = {
    token: {
      colorPrimary: primaryColor,
    },
    components: {
      Card: {
        bodyPadding: 12
      },
    },
  };

  return (
    <ConfigProvider theme={customTheme} locale={viVN}>
      <AppProvider>
        {children}
      </AppProvider>
    </ConfigProvider>
  );
}

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className={inter.className} suppressHydrationWarning={true}>
      <Provider store={store}>
        <AntdRegistry>
          <ThemeWrapper>
            <Header/>
            <PcMenu/>
            <main>
              {children}
            </main>
            <Footer />
          </ThemeWrapper>
        </AntdRegistry>
      </Provider>
    </body>
  );
}
