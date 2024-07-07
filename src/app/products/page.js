import EcommerceProductsView from 'src/sections/_ecommerce/view/ecommerce-products-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'E-commerce: Products',
};

export const revalidate = 30;
export default async function EcommerceProductsPage(props) {
  const searchParams = props?.searchParams?.search;
  return <EcommerceProductsView search={searchParams} />;
}