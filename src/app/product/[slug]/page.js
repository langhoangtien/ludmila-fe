import { notFound } from 'next/navigation';

import { convertImagePathToUrl } from 'src/utils/common';

import { HOST_API } from 'src/config-global';

import { ProductProvider } from 'src/components/product';

import EcommerceProductView from 'src/sections/_ecommerce/view/ecommerce-product-view';

async function getData(url) {
  const res = await fetch(url);
  if (res.status !== 200) {
    console.log('Failed to fetch data');
    return null;
  }
  return res.json();
}
export const revalidate = 30;

export default async function DetailProductPage(props) {
  const slug = props?.params?.slug ?? null;
  const id = slug.split('-').pop();
  const result = await getData(`${HOST_API}/products/${id}`);
  if (!result) return notFound();
  const images = result.images.map((img) => convertImagePathToUrl(img));
  const variants = result.variants.map((item) => ({
    ...item,
    image: convertImagePathToUrl(item.image),
  }));
  const variantsImages = variants.filter((item) => item.image).map((variant) => variant.image);
  const firstVariant = variants[0];
  let minPrice = firstVariant.price;
  let maxPrice = firstVariant.price;
  let minSalePrice = firstVariant.salePrice;
  let maxSalePrice = firstVariant.salePrice;

  result.variants.forEach((item) => {
    minPrice = Math.min(minPrice, item.price);
    maxPrice = Math.max(maxPrice, item.price);
    minSalePrice = Math.min(minSalePrice, item.salePrice);
    maxSalePrice = Math.max(maxSalePrice, item.salePrice);
  });
  const image = convertImagePathToUrl(result.image);
  const totalRating = result.ratings?.reduce((acc, cur) => acc + cur, 0) ?? 0;
  const product = {
    ...result,
    image,
    images: images.concat(variantsImages,image),
    totalReviews: totalRating,
    variants,
    minPrice,
    maxPrice,
    minSalePrice,
    maxSalePrice,
  };

  return (
    <ProductProvider product={product}>
      <EcommerceProductView
        ratingAverage={product.ratingAverage}
        totalReviews={product.totalReviews}
        ratings={product.ratings}
      />
    </ProductProvider>
  );
}
