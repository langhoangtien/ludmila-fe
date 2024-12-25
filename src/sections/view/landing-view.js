import PropTypes from 'prop-types';

import ProductHome from '../landing/product-hompage';
import LandingHero from '../landing/landing-hero';

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
