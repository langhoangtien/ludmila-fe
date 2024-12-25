import { Stack } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';

import { endpoints } from 'src/utils/fetch';
import { encodeData, convertImagePathToUrl } from 'src/utils/common';

import ProductList from 'src/sections/product/list/product-list';

export default async function DetailCategoryPage(props) {
  const slug = props?.params?.slug ?? null;
  const page = props?.searchParams?.page ?? 1;
  const id = slug.split('-').pop();
  const limit = 20;
  const skip = (page - 1) * limit;
  const categoryFilter = [id];

  const filterRaw = {
    category: categoryFilter,
  };
  const url = `${endpoints.product.list}?limit=${limit}&skip=${skip}&filterRaw=${encodeData(
    filterRaw
  )}`;
  const categoryUrl = `${endpoints.category.list}/${id}`;

  const category = await fetch(categoryUrl, { method: 'GET', next: { revalidate: 3600 } });
  const products = await fetch(url, {
    method: 'GET',
    next: { revalidate: 30 },
  });

  const categoryJson = await category.json();
  const productsJson = await products.json();
  // console.log("SSS",categoryJson,productsJson);
  const productsMapped = productsJson.items.map((product) => ({
    ...product,
    image: convertImagePathToUrl(product.image),
  }));
  const count = Math.ceil(productsJson.count / limit);
  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{
          mb: 8,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          Danh mục:&quot;
          <Box sx={{ color: 'primary.main' }} component="span">
            {categoryJson.name}
          </Box>
          &quot;
        </Typography>
      </Stack>

      <Stack direction="column">
        <ProductList
          pagination={false}
          loading={false}
          viewMode="grid"
          count={count}
          products={productsMapped}
          homePage
        />
      </Stack>
    </Container>
  );
}
