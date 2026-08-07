'use client';

import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { FeaturedMedicines } from '@/components/FeaturedMedicines';
import { Categories } from '@/components/Categories';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { HealthcareServices } from '@/components/HealthcareServices';
import { Pharmacists } from '@/components/Pharmacists';
import { Testimonials } from '@/components/Testimonials';
import { Statistics } from '@/components/Statistics';
import { MobileAppPromotion } from '@/components/MobileAppPromotion';
import { FAQ } from '@/components/FAQ';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <FeaturedMedicines />
      <Categories />
      <WhyChooseUs />
      <HealthcareServices />
      <Pharmacists />
      <Testimonials />
      <Statistics />
      <MobileAppPromotion />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
