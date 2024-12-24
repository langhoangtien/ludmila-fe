import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Stack, Avatar, Tooltip, Typography } from '@mui/material';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

//  utils
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { convertImagePathToUrl } from 'src/utils/common';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersTableRow({ row, onSelectRow, selected }) {
  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const inputStyles = {
    pl: 1,
    [`&.${inputBaseClasses.focused}`]: {
      bgcolor: 'action.selected',
    },
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ px: 1 }}>
          {row.products.map((product) => (
            <Link style={{ textDecoration: 'none' }} href={`/product/${product.productId}`}>
              <Stack alignItems="center" alignContent="center" spacing={1} direction="row">
                <Avatar alt={product.name} src={convertImagePathToUrl(product.image, 250)} />
                <Stack>
                  <Tooltip title="Xem sản phẩm">
                    <Typography
                      sx={{ textDecoration: 'none' }}
                      color="primary.main"
                      key={product._id}
                    >
                      {product.name}
                    </Typography>
                  </Tooltip>
                  <Typography variant="body2" color="text.secondary">
                    Số lượng: {product.quantity}
                  </Typography>
                </Stack>
              </Stack>
            </Link>
          ))}
        </TableCell>
        <TableCell sx={{ px: 1 }}>
          <InputBase value={fCurrency(row.totalPrice)} sx={inputStyles} />
        </TableCell>
        <TableCell>{fDate(row.createdAt)}</TableCell>
        <TableCell>{fDate(row.deliveredAt)}</TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'shipping' && 'warning') ||
              (row.status === 'cancelled' && 'error') ||
              (row.status === 'confirmed' && 'info') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="fluent:more-vertical-20-regular" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 160 },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify icon="fluent:eye-20-regular" sx={{ mr: 1 }} /> Xem
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="fluent:delete-20-regular" sx={{ mr: 1 }} /> Hủy
        </MenuItem>
      </Popover>
    </>
  );
}

EcommerceAccountOrdersTableRow.propTypes = {
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
