'use client';

import PropTypes from 'prop-types';
import { id } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Chip, Tooltip } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';
import { useCartContext } from 'src/components/cart/use-cart-context';
import ShippingFreeIcon from 'src/components/icons/free-shipping-icon';

import ProductPrice from '../../common/product-price';

// ----------------------------------------------------------------------

export default function EcommerceProductViewListItem({ product, ...other }) {
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
  const handleRedirectToProduct = () => {
    router.push(`${paths.product}/${product.slug}-${product.id}`);
  };
  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
      }}
      {...other}
    >
      <Tooltip title={product.variants?.length === 1 ? 'Thêm vào giỏ hàng' : 'Xem mẫu mã'} arrow>
        <Fab
          className="add-to-cart"
          color="primary"
          size="small"
          disabled={shake}
          sx={{
            right: 8,
            zIndex: 9,
            top: 8,
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
              product.variants?.length === 1 ? 'ion:bag-add-outline' : 'carbon:shopping-catalog'
            }
          />
        </Fab>
      </Tooltip>
      <Image
        src={product.image}
        onClick={handleRedirectToProduct}
        ratio="1/1"
        sx={{
          mr: 2,
          width: 160,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
          cursor: 'pointer',
        }}
      />
      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <Link
            component={RouterLink}
            href={`${paths.product}/${product.slug}-${product._id}`}
            color="inherit"
            underline="none"
          >
            <TextMaxLine variant="h6" line={1}>
              {product.name}
            </TextMaxLine>
          </Link>
        </Stack>

        <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
          {product.introduction}
        </TextMaxLine>

        <ProductPrice
          price={product.price}
          salePrice={product.salePrice}
          sx={{ typography: 'h6' }}
        />
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

EcommerceProductViewListItem.propTypes = {
  product: PropTypes.shape({
    introduction: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    sold: PropTypes.number,
    ratingAverage: PropTypes.number,
    discount: PropTypes.number,
    _id: PropTypes.string,
    slug: PropTypes.string,
    id,
    variants: PropTypes.array,
  }),
};
