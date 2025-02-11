import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              We are a modern e-commerce platform offering the latest in technology and fashion.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {["FAQ", "Returns", "Shipping", "Track Order"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-muted-foreground hover:text-primary">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Modern E-commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

