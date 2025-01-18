import { Stack } from '@mui/system';
import { Container, Typography } from '@mui/material';

import { endpoints } from 'src/utils/fetch';
import { convertImagePathToUrl } from 'src/utils/common';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductList from 'src/sections/product/list/product-list';

import ListCategory from '../list-category';

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
          },
          {
            name: categoryJson.name,
          },
        ]}
        sx={{ my: 5 }}
      />
      <Stack my={2}>
        <ListCategory categories={categoryChild} />
      </Stack>
      <Stack direction="column">
        <Typography variant="h5" sx={{ py: 2, fontWeight: 'fontWeightBold' }}>
          Danh sách sản phẩm
        </Typography>
        <ProductList viewMode="grid" category={categoryJson._id} homePage />
      </Stack>
    </Container>
  );
}
