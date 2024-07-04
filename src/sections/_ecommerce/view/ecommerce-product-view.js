'use client';

import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useProductContext } from 'src/components/product/use-product-contex';

import ReviewEcommerce from '../../review/ecommerce/review-ecommerce';
import EcommerceProductDetailsInfo from '../product/details/ecommerce-product-details-info';
import EcommerceProductDetailsCarousel from '../product/details/ecommerce-product-details-carousel';
import EcommerceProductDetailsDescription from '../product/details/ecommerce-product-details-description';

// ----------------------------------------------------------------------

export default function EcommerceProductView() {
  const { product } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const handleChangeQuantity = (value) => {
    if (value < 0) {
      return;
    }
    setQuantity(value);
  };
  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Trang chủ',
              href: '/',
            },
            {
              name: 'Sản phẩm',
              href: '/products',
            },
            {
              name: product.name,
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel index={1} images={product.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              changeQuantity={handleChangeQuantity}
              quantity={quantity}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid lg={12}>
            <EcommerceProductDetailsDescription
              description={product.description}
              specifications={[
                { label: 'Category', value: 'Mobile' },
                { label: 'Manufacturer', value: 'Apple' },
                { label: 'Warranty', value: '12 Months' },
                { label: 'Serial number', value: '358607726380311' },
                { label: 'Ships From', value: 'United States' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>

      <ReviewEcommerce id={product._id} />
    </>
  );
}
