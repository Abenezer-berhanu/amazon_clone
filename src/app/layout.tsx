import "./globals.css";
import Header from "@/components/Header/Header";
import HeaderFooter from "@/components/Header/HeaderFooter";
import Footer from "@/components/Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RTKProvider from "@/utils/RTKProvider";

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
        <RTKProvider>
          <Header />
          <HeaderFooter />
          {children}
          <Footer />
        </RTKProvider>
      </body>
    </html>
  );
}
