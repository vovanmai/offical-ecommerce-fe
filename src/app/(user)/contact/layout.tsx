
import React from "react";
import Header from "@/components/user/layout/Header";
import NavBar from "@/components/user/layout/NavBar";
import Footer from '@/components/user/layout/Footer';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Header/>
    <NavBar/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;