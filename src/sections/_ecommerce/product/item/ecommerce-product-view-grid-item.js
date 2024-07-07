'use client';

import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCartContext } from 'src/components/cart';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';

import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

// ----------------------------------------------------------------------

const xKeyframes = keyframes` 
  100% {
    transform: translateX(calc(100vw - 150px));
  }
`;
const yKeyframes = keyframes` 100% {
    transform: translateY(-104px);
  }`;

export default function EcommerceProductViewGridItem({ product, sx, ...other }) {
  const { addToCart, shake } = useCartContext();
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
  return (
    <Stack
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          SALE
        </Label>
      )}

      <Box sx={{ position: 'relative', mb: 2 }}>
        <Tooltip title={product.variants?.length === 1 ? 'Thêm vào giỏ hàng' : 'Xem mẫu mã'} arrow>
          <Fab
            disabled={shake}
            className="add-to-cart"
            color="primary"
            size="small"
            sx={{
              animation:
                shake &&
                ` ${xKeyframes}  1s forwards cubic-bezier(1, 0.44, 0.84, 0.165), ${yKeyframes} 1s alternate forwards cubic-bezier(0.165, 0.84, 0.44, 1)`,
              right: 8,
              zIndex: 9,
              bottom: 8,
              opacity: 0,
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
              icon={
                product.variants?.length === 1
                  ? 'carbon:shopping-cart-plus'
                  : 'carbon:shopping-catalog'
              }
            />
          </Fab>
        </Tooltip>
        <Image
          src={product.image}
          ratio="1/1"
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.category}
        </TextMaxLine>

        <Link
          component={RouterLink}
          href={`${paths.product}/${product.slug}-${product.id}`}
          color="inherit"
        >
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} salePrice={product.salePrice} />

        <ProductRating ratingAverage={product.ratingAverage} label={`${product.sold} sold`} />
      </Stack>
    </Stack>
  );
}

EcommerceProductViewGridItem.propTypes = {
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
  }),
  sx: PropTypes.object,
};
