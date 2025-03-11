'use client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      {children}
    </html>
  );
}
