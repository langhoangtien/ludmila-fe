import { endpoints, fetchData } from 'src/utils/fetch';
import { convertImagePathToUrl } from 'src/utils/common';

import LandingView from 'src/sections/view/landing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Ludmila - Home',
};
export const revalidate = 30;

export default async function LandingPage() {
  const url = endpoints.home.root;
  const respon = await fetchData(url);

  const topNewestProducts = respon.topNewestProducts.map((product) => {
    const variants = product.variants.map((variant) => ({
      ...variant,
      image: variant.image ? convertImagePathToUrl(variant.image, 450) : undefined,
    }));

    return {
      ...product,
      image: convertImagePathToUrl(product.image, 250),
      variants,
    };
  });
  const topDiscountProducts = respon.topDiscountProducts.map((product) => {
    const images = product.images.map((image) => convertImagePathToUrl(image));

    return {
      ...product,
      image: convertImagePathToUrl(product.image, 450),
      images,
    };
  });
  const data = { topNewestProducts, topDiscountProducts };
  return <LandingView data={data} />;
}
