import { notFound } from 'next/navigation';

import { Stack } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';

import { endpoints } from 'src/utils/fetch';

import ProductList from 'src/sections/product/list/product-list';

export default async function DetailCountryPage(props) {
  const slug = props?.params?.slug ?? null;

  const id = slug.split('-').pop();

  const countryUrl = `${endpoints.country.list}/${id}`;

  const country = await fetch(countryUrl, { method: 'GET', next: { revalidate: 3600 } });

  if (!country.ok) return notFound();
  const countryJson = await country.json();
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
          Xuất xứ:&nbsp;&quot;
          <Box sx={{ color: 'primary.main' }} component="span">
            {countryJson.name}
          </Box>
          &quot;
        </Typography>
      </Stack>

      <Stack direction="column">
        <ProductList viewMode="grid" country={countryJson._id} homePage />
      </Stack>
    </Container>
  );
}
