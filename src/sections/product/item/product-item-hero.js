import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function ProductItemHero({ product }) {
  const theme = useTheme();

  const { name, introduction, image, discount, _id, slug } = product;

  return (
    <Grid
      container
      rowSpacing={{
        xs: 5,
        md: 0,
      }}
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid xs={12} md={6}>
        <Box
          sx={{
            maxWidth: { md: 440 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Label color="warning" sx={{ mb: 2 }}>
            Giảm giá {discount} %
          </Label>

          <TextMaxLine variant="h3" sx={{ mb: 2 }}>
            {name}
          </TextMaxLine>

          <TextMaxLine variant="body2" sx={{ mb: 5, color: 'text.secondary' }}>
            {introduction}
          </TextMaxLine>

          <Button
            component={RouterLink}
            href={`${paths.product}/${slug}-${_id}`}
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            Mua ngay
          </Button>
        </Box>
      </Grid>

      <Grid xs={12} md={6}>
        <Image
          src={image}
          sx={{
            filter: `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`,
            maxWidth: 400,
            ml: 'auto',
            mr: { xs: 'auto', md: 'unset' },
          }}
        />
      </Grid>
    </Grid>
  );
}

ProductItemHero.propTypes = {
  product: PropTypes.shape({
    introduction: PropTypes.string,
    image: PropTypes.string,
    discount: PropTypes.number,
    name: PropTypes.string,
    _id: PropTypes.string,
    slug: PropTypes.string,
  }),
};
