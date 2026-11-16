import { Hero } from '@/components/sections/Hero'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { PressOnTeaser } from '@/components/sections/PressOnTeaser'
import { PriceTeaser } from '@/components/sections/PriceTeaser'
import { BookPoliciesSection } from '@/components/sections/BookPoliciesSection'
import { QuoteBand } from '@/components/sections/QuoteBand'

export default function EnglishHomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedWork />
      <PressOnTeaser />
      <PriceTeaser />
      <BookPoliciesSection />
      <QuoteBand />
    </>
  )
}
