"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { useSearch } from "@/components/search-provider"
import { useCart } from "@/components/cart-provider"
// import { Badge } from "@/components/ui/badge" // No longer needed

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { searchTerm, setSearchTerm } = useSearch()
  const { cart } = useCart()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        pathname === item.href ? "text-primary" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl">LOGO</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ width: isSearchOpen ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block"
            >
              {isSearchOpen && (
                <Input
                  placeholder="Search products"
                  className="w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </motion.div>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              <span className="sr-only">{isSearchOpen ? "Close search" : "Open search"}</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {/* Removed the Badge so the count is no longer shown */}
              </Link>
            </Button>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}