import { endpoints, fetchData } from 'src/utils/fetch';
import { convertImagePathToUrl } from 'src/utils/common';

import EcommerceLandingView from 'src/sections/_ecommerce/view/ecommerce-landing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Ludmila - Home',
};
export const revalidate = 30;

export default async function EcommerceLandingPage() {
  const url = endpoints.home.root;
  const respon = await fetchData(url);

  const topNewestProducts = respon.topNewestProducts.map((product) => ({
    ...product,
    image: convertImagePathToUrl(product.image,250),
  }));
  const topDiscountProducts = respon.topDiscountProducts.map((product) => {
    const images = product.images.map((image) => convertImagePathToUrl(image));
    return {
      ...product,
      image: convertImagePathToUrl(product.image,450),
      images,
    };
  });
  const data = { topNewestProducts, topDiscountProducts };
  return <EcommerceLandingView data={data} />;
}
