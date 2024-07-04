import PropTypes from 'prop-types';
import { id } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';
import { useCartContext } from 'src/components/cart/use-cart-context';

import ProductPrice from '../../common/product-price';
import ProductRating from '../../common/product-rating';

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
      {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          SALE
        </Label>
      )}

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
          mr: 2,
          width: 160,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
            {product.category}
          </TextMaxLine>

          <Link
            component={RouterLink}
            href={`${paths.product}/${product.slug}-${product._id}`}
            color="inherit"
          >
            <TextMaxLine variant="h6" line={1}>
              {product.name}
            </TextMaxLine>
          </Link>
        </Stack>

        <ProductRating ratingAverage={product.ratingAverage} label={`${product.sold} sold`} />

        <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
          {product.introduction}
        </TextMaxLine>

        <ProductPrice
          price={product.price}
          salePrice={product.salePrice}
          sx={{ typography: 'h6' }}
        />
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
    _id: PropTypes.string,
    slug: PropTypes.string,
    id,
    variants: PropTypes.array,
  }),
};
