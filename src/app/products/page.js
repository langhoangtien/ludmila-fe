import ProductsView from 'src/sections/view/products-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'E-commerce: Products',
};

export const revalidate = 30;
export default async function ProductsPage(props) {
  const searchParams = props?.searchParams?.search;
  return <ProductsView search={searchParams} />;
}
