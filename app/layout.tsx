import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/context/auth/authProvider";
import Footer from "@/components/Footer";
import ProductProvider from "@/context/product/productProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React nodeSend app",
  description: "App for send and share files, enjoy it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
            <ProductProvider>
              <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                  <Header />
                  <main className="min-h-[70vh] mb-32 flex items-start justify-center">
                    {children}
                  </main>
                  <Footer
                    githubUrl="https://github.com/Carbal23"
                    linkedinUrl="https://www.linkedin.com/in/mauricio-javier-carbal-martinez-2b7080201/"
                    twitterUrl="https://x.com/mcarbal23"
                    portfolioUrl="https://mauricio-carbal-portfolio.vercel.app/"
                  />
                </div>
              </div>
            </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
