import "./globals.css";
import Header from "@/components/Header/Header";
import HeaderFooter from "@/components/Header/HeaderFooter";
import Footer from "@/components/Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RTKProvider from "@/utils/RTKProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-bodyFont bg-gray-300 bg-opacity-40 relative min-h-screen">
        <RTKProvider>
          <Header />
          <HeaderFooter />
          <div className="pb-20">{children}</div>
          <div className="absolute bottom-0 z-50 w-full">
            <Footer />
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </RTKProvider>
      </body>
    </html>
  );
}
