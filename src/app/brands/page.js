// ----------------------------------------------------------------------

import { Container } from '@mui/material';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BrandsView from 'src/sections/brand/brands-view';

export const metadata = {
  title: 'Thương hiệu',
};

export default async function ProductsPage() {
  return (
    <Container>
      <CustomBreadcrumbs
        links={[
          {
            name: 'Trang chủ',
            href: '/',
          },
          {
            name: 'Thương hiệu',
          },
        ]}
        sx={{ my: 5 }}
      />
      <BrandsView />
    </Container>
  );
}
