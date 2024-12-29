import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import { useCartContext } from 'src/components/cart';

import IncrementerButton from '../product/details/incrementer-button';

// ----------------------------------------------------------------------

export default function CartItem({ product, wishlist }) {
  const { removeFromCart, changeQuantity } = useCartContext();

  const handleChangeQuantity = (quantity) => {
    if (quantity < 0) return;
    changeQuantity(product._id, quantity);
  };

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            alt={product.name}
            src={product.image}
            sx={{ width: 64, height: 64 }}
          />

          <Stack spacing={0.5}>
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 200 }}>
              {product.name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                typography: 'body2',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.attributes?.map((attr) => `${attr.name}: ${attr.value}`).join(', ')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </TableCell>

      <TableCell> {fCurrency(product.salePrice)} </TableCell>

      <TableCell>
        <Box sx={{ width: 100, textAlign: 'right' }}>
          <IncrementerButton changeQuantity={handleChangeQuantity} quantity={product.quantity} />
        </Box>
      </TableCell>

      <TableCell align="right"> {fCurrency(product.salePrice * product.quantity)} </TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={() => removeFromCart(product._id)}>
          <Iconify icon="fluent:delete-20-regular" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

CartItem.propTypes = {
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
