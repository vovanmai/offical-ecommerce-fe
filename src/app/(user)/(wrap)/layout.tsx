import React from 'react'

export const metadata = {
  icons: {
    icon: '/lamsfarm_logo.jpeg',
    shortcut: '/lamsfarm_logo.jpeg',
    apple: '/lamsfarm_logo.jpeg',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
