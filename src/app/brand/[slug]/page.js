import Image from 'next/image';

import { Stack } from '@mui/system';
import { Card, Grid, Container, Typography, CardContent } from '@mui/material';

import { endpoints } from 'src/utils/fetch';
import { convertImagePathToUrl } from 'src/utils/common';

import TextMaxLine from 'src/components/text-max-line';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductList from 'src/sections/product/list/product-list';

export default async function DetailBrandPage(props) {
  const slug = props?.params?.slug ?? null;

  const id = slug.split('-').pop();

  const brandUrl = `${endpoints.brand.list}/${id}`;

  const brand = await fetch(brandUrl, { method: 'GET', next: { revalidate: 30 } });

  const brandJson = await brand.json();

  return (
    <Container>
      <Stack direction="column" spacing={4}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Trang chủ',
              href: '/',
            },
            {
              name: 'Thương hiệu',
              href: '/brands',
            },
            {
              name: brandJson.name,
            },
          ]}
          sx={{ my: 5 }}
        />
        <Card>
          {' '}
          <Grid container sx={{ p: 1 }} spacing={2}>
            <Grid item xs={12} md={3}>
              <Image
                width={200}
                height={200}
                style={{ objectFit: 'cover' }}
                src={convertImagePathToUrl(brandJson.image, 250)}
                title="green iguana"
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {brandJson.name}
                </Typography>
                <TextMaxLine variant="body2" color="text.secondary" line={3}>
                  {brandJson.description}
                </TextMaxLine>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        <Stack direction="column">
          <ProductList viewMode="grid" brand={brandJson._id} homePage />
        </Stack>
      </Stack>
    </Container>
  );
}
