import PropTypes from 'prop-types';

import ProductHome from '../landing/product-hompage';
import EcommerceLandingHero from '../landing/ecommerce-landing-hero';

// ----------------------------------------------------------------------

export default function EcommerceLandingView({ data }) {
  const { topNewestProducts, topDiscountProducts } = data;

  return (
    <>
      <EcommerceLandingHero products={topDiscountProducts} />
      <ProductHome products={topNewestProducts} />

      {/* <EcommerceLandingCategories />

      <EcommerceLandingHotDealToday />

      <EcommerceLandingFeaturedProducts /> */}

      {/* <EcommerceLandingSpecialOffer />

      <EcommerceLandingFeaturedBrands />

      <EcommerceLandingPopularProducts />

      <EcommerceLandingTopProducts />

      <EcommerceTestimonial testimonials={_testimonials} /> */}
    </>
  );
}

EcommerceLandingView.propTypes = {
  data: PropTypes.object.isRequired,
};
