'use client';

import { _testimonials } from 'src/_mock';

import ProductHome from '../landing/product-hompage';
import EcommerceLandingHero from '../landing/ecommerce-landing-hero';
import EcommerceTestimonial from '../testimonial/ecommerce-testimonial';

// ----------------------------------------------------------------------

export default function EcommerceLandingView({ data }) {
  const { topNewestProducts, topDiscountProducts } = data;

  return (
    <>
      <EcommerceLandingHero products={topDiscountProducts} />
      <ProductHome products={topNewestProducts} />

      {/* <EcommerceLandingCategories />

      <EcommerceLandingHotDealToday />

      <EcommerceLandingFeaturedProducts />

      <EcommerceLandingSpecialOffer />

      <EcommerceLandingFeaturedBrands />

      <EcommerceLandingPopularProducts />

      <EcommerceLandingTopProducts /> */}

      <EcommerceTestimonial testimonials={_testimonials} />
    </>
  );
}
