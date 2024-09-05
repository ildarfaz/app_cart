import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import { Header } from "@/components/header";

import "@/styles/globals.scss";
import { ReduxProvider } from "@/stores/store/redux-provider";
import { createContext } from "react";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "test task",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const res = await fetch("http://localhost:8080/api/shoppingcart/header");
  const { LogoImg, UserName } = await res.json();
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <ReduxProvider>
          <Header logo={LogoImg} userName={UserName} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}