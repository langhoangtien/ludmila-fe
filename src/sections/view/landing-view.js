import PropTypes from 'prop-types';

import LandingHero from '../landing/landing-hero';
import ProductHome from '../landing/product-hompage';

// ----------------------------------------------------------------------

export default function LandingView({ data }) {
  const { topNewestProducts, topDiscountProducts } = data;

  return (
    <>
      <LandingHero products={topDiscountProducts} />
      <ProductHome products={topNewestProducts} />
    </>
  );
}

LandingView.propTypes = {
  data: PropTypes.object.isRequired,
};
