import HeroBanner from "@/components/hero-banner"
import FeaturedCategories from "@/components/featured-categories"
import FeaturedProducts from "@/components/featured-products"
import Newsletter from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  )
}

