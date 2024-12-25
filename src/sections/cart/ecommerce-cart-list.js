import PropTypes from 'prop-types';

import { Card, Table, TableRow, TableBody, TableCell, TableHead } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

import CartItem from './ecommerce-cart-item';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'product', label: 'Sản phẩm' },
  { id: 'price', label: 'Giá' },
  { id: 'quantity', label: 'Số lượng' },
  { id: 'totalAmount', label: 'Tổng', align: 'right' },
  { id: '' },
];
export default function CartList({ products, wishlist = false }) {
  return (
    <Card>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((headCell) => (
                <TableCell key={headCell.id} align={headCell.align} sx={{ pr: 3 }}>
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <CartItem key={product._id} product={product} wishlist={wishlist} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}

CartList.propTypes = {
  products: PropTypes.array,
  wishlist: PropTypes.bool,
};
