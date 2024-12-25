'use client';

import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useProductContext } from 'src/components/product/use-product-contex';

import Review from '../review/ecommerce/review-ecommerce';
import ProductDetailsInfo from '../product/details/product-details-info';
import ProductDetailsCarousel from '../product/details/product-details-carousel';
import ProductDetailsDescription from '../product/details/product-details-description';

// ----------------------------------------------------------------------

export default function ProductView() {
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
            <ProductDetailsCarousel index={1} images={product.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <ProductDetailsInfo changeQuantity={handleChangeQuantity} quantity={quantity} />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid lg={12}>
            <ProductDetailsDescription description={product.description} />
          </Grid>
        </Grid>
      </Container>

      <Review id={product._id} />
    </>
  );
}
