"use client";
import "./globals.css";
import Header from "@/components/Header/Header";
import HeaderFooter from "@/components/Header/HeaderFooter";
import Footer from "@/components/Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "@/features/slices/apiSlice";
import { Provider } from "react-redux";
import store from "../../store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-bodyFont bg-gray-300 bg-opacity-40"
        suppressHydrationWarning={true}
      >
        <Provider store={store}>
          <Header />
          <HeaderFooter />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
