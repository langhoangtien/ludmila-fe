'use client';

import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Chip, Tooltip, useTheme } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCartContext } from 'src/components/cart';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';
import ShippingFreeIcon from 'src/components/icons/free-shipping-icon';

import ProductPrice from '../../common/product-price';

// ----------------------------------------------------------------------

export default function ProductViewGridItem({ product, sx, ...other }) {
  const { addToCart } = useCartContext();
  const themeMui = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleAddToCart = () => {
    if (!product.variants || product.variants.length === 0) {
      enqueueSnackbar('Đã có lỗi xảy ra với sản phẩm', { variant: 'error' });
      return;
    }
    if (product.variants.length !== 1) {
      router.push(`${paths.product}/${product.slug}-${product.id}`);
      return;
    }

    const variant = {
      ...product.variants[0],
      name: product.name,
      image: product.variants[0].image || product.image,
    };

    addToCart(variant, 1);
    enqueueSnackbar('Thêm vào giỏ hàng thành công', { variant: 'success' });
  };
  const handleRedirectToProduct = () => {
    router.push(`${paths.product}/${product.slug}-${product.id}`);
  };
  return (
    <Stack
      sx={{
        position: 'relative',
        [themeMui.breakpoints.up('md')]: {
          '&:hover .add-to-cart': {
            opacity: 1,
          },
        },
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Tooltip title={product.variants?.length === 1 ? 'Thêm vào giỏ hàng' : 'Xem mẫu mã'} arrow>
          <Fab
            className="add-to-cart"
            color="primary"
            size="small"
            sx={{
              right: 8,
              zIndex: 9,
              bottom: 8,
              opacity: { md: 0, xs: 1 },
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('opacity', {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.shortest,
                }),
            }}
          >
            <Iconify
              onClick={handleAddToCart}
              icon={product.variants?.length === 1 ? 'ion:bag-add-outline' : 'ion:bag-outline'}
            />
          </Fab>
        </Tooltip>
        <Image
          onClick={handleRedirectToProduct}
          src={product.image}
          ratio="1/1"
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
            cursor: 'pointer',
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <Link
          component={RouterLink}
          href={`${paths.product}/${product.slug}-${product.id}`}
          color="inherit"
          underline="none"
        >
          <TextMaxLine variant="body2" line={2} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} salePrice={product.salePrice} />
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {!!(product.salePrice > 500000) && (
            <ShippingFreeIcon
              style={{ width: 28, height: 28, color: '#2dd4bf' }}
              className=" text-teal-400 "
            />
          )}
          {!!product.discount && (
            <Chip label={`Giảm ${product.discount} %`} size="small" color="primary" />
          )}
          <Chip label="COD" size="small" variant="outlined" color="primary" />
        </Stack>
        <Stack direction="row" alignItems="center" fontSize={14} spacing={0.25}>
          {product.ratingAverage}{' '}
          <Iconify
            width={16}
            heigth={16}
            icon="fluent:star-20-filled"
            style={{ color: 'orange' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

ProductViewGridItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    sold: PropTypes.number,
    label: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    coverUrl: PropTypes.string,
    salePrice: PropTypes.number,
    ratingAverage: PropTypes.number,
    id: PropTypes.string,
    slug: PropTypes.string,
    variants: PropTypes.array,
    image: PropTypes.string,
    discount: PropTypes.number,
  }),
  sx: PropTypes.object,
};
