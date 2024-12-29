import Link from 'next/link';
import Image from 'next/image';

import { Stack } from '@mui/system';
import { Box, Card, Container, Typography } from '@mui/material';

import { endpoints } from 'src/utils/fetch';
import { convertImagePathToUrl } from 'src/utils/common';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductList from 'src/sections/product/list/product-list';

export default async function DetailCategoryPage(props) {
  const slug = props?.params?.slug ?? null;

  const id = slug.split('-').pop();

  const categoryUrl = `${endpoints.category.list}/${id}`;

  const category = await fetch(categoryUrl, { method: 'GET', next: { revalidate: 30 } });

  const categoryJson = await category.json();
  const categoryChild = categoryJson.childrens?.map((child) => ({
    ...child,
    image: convertImagePathToUrl(child.image, 250),
  }));

  return (
    <Container>
      <CustomBreadcrumbs
        links={[
          {
            name: 'Trang chủ',
            href: '/',
          },
          {
            name: 'Danh mục',
            href: '/categories',
          },
          {
            name: categoryJson.name,
          },
        ]}
        sx={{ my: 5 }}
      />
      <Stack my={2}>
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
        >
          {categoryChild.map((child) => (
            <Card key={child.id}>
              <Link passHref legacyBehavior href={`/category/${child.code}-${child._id}`}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  sx={{ cursor: 'pointer', p: 2 }}
                  alignItems="center"
                  spacing={2}
                >
                  <Image
                    style={{ borderRadius: 2, objectFit: 'cover' }}
                    src={child.image}
                    width={50}
                    height={50}
                  />
                  <Typography variant="subtitle2">{child.name}</Typography>
                </Stack>
              </Link>
            </Card>
          ))}
        </Box>
      </Stack>
      <Stack direction="column">
        <ProductList viewMode="grid" category={categoryJson._id} homePage />
      </Stack>
    </Container>
  );
}
