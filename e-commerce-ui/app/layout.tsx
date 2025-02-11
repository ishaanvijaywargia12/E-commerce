import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { SearchProvider } from "@/components/search-provider";
import CartPreview from "@/components/CartPreview"; // Import the CartPreview component
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern E-commerce",
  description: "A modern e-commerce platform built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SearchProvider>
              <CartProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                {/* CartPreview is rendered here; it will only display if there are cart items */}
                <CartPreview />
              </CartProvider>
            </SearchProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}