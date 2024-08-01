import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCartContext } from 'src/components/cart';

import IncrementerButton from '../product/details/incrementer-button';

// ----------------------------------------------------------------------

export default function EcommerceCartItem({ product, wishlist }) {
  const { removeFromCart, changeQuantity } = useCartContext();

  const handleChangeQuantity = (quantity) => {
    if (quantity < 0) return;
    changeQuantity(product._id, quantity);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={product.image}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{product.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {product.attributes?.map((attr) => `${attr.name}: ${attr.value}`).join(', ')}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 120 }}>
        <IncrementerButton changeQuantity={handleChangeQuantity} quantity={product.quantity} />
      </Stack>

      <Stack sx={{ width: 120, typography: 'subtitle2' }}>
        {' '}
        {fCurrency(product.salePrice * product.quantity)}{' '}
      </Stack>

      <IconButton onClick={() => removeFromCart(product._id)}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>

      {wishlist && (
        <IconButton>
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}
    </Stack>
  );
}

EcommerceCartItem.propTypes = {
  product: PropTypes.shape({
    coverUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    quantity: PropTypes.number,
    discount: PropTypes.number,
    _id: PropTypes.string,
    image: PropTypes.string,
    attributes: PropTypes.array || null,
  }),
  wishlist: PropTypes.bool,
};
