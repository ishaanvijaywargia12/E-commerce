import type { ReactNode } from "react"
import Header from "./header"
import Footer from "./footer"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

