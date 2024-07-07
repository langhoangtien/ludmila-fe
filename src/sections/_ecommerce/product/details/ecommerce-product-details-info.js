import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Alert, Dialog, DialogContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { useCartContext } from 'src/components/cart/use-cart-context';
import { useProductContext } from 'src/components/product/use-product-contex';

import IncrementerButton from './incrementer-button';
import ProductOptionPicker from '../../common/product-option-picker';

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsInfo({ quantity, changeQuantity }) {
  const { product, attributesSelect, setAttribute, currentVariant } = useProductContext();
  const {
    name,
    introduction,
    ratingAverage,
    totalReviews,
    minPrice,
    maxPrice,
    minSalePrice,
    maxSalePrice,
    attributes,
  } = product;
  const cart = useCartContext();
  const mdUp = useResponsive('up', 'md');
  const [error, setError] = useState(false);
  const dialog = useBoolean();

  const router = useRouter();
  const handleAddToCart = () => {
    setError(!currentVariant);
    if (!currentVariant) {
      return;
    }
    const image = currentVariant.image || product.image;
    const variantSelected = { ...currentVariant, name, image };

    cart.addToCart(variantSelected, quantity);
    dialog.onTrue();
  };
  const handleAddToCartAndBuyNow = () => {
    setError(!currentVariant);
    if (!currentVariant) {
      return;
    }
    const variantSelected = { ...currentVariant, name };
    cart.addToCart(variantSelected, quantity);
    router.push(paths.cart);
  };
  return (
    <>
      <Label color="success" sx={{ mb: 3 }}>
        Còn hàng
      </Label>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating size="small" value={ratingAverage} readOnly precision={0.5} />

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ({totalReviews} Đánh giá)
          </Typography>
        </Stack>
      </Stack>

      <Stack p={1} spacing={2}>
        {currentVariant ? (
          <Stack direction="row" sx={{ typography: 'h6', color: 'error.main' }}>
            {fCurrency(currentVariant.salePrice)}
            <Box
              component="span"
              sx={{
                ml: 2,
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                {' '}
                {currentVariant.price !== currentVariant.salePrice &&
                  fCurrency(currentVariant.price)}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Stack direction="row" sx={{ typography: 'h5', color: 'error.main' }}>
            {minSalePrice !== maxSalePrice
              ? `${fCurrency(minSalePrice)} - ${fCurrency(maxSalePrice)}`
              : fCurrency(minSalePrice)}
            <Box
              component="span"
              sx={{
                ml: 2,
                color: 'text.disabled',

                textDecoration: 'line-through',
              }}
            >
              <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                {minPrice > minSalePrice && fCurrency(minPrice)}
                {maxPrice > maxSalePrice && ` - ${fCurrency(maxPrice)}`}
              </Typography>
            </Box>
          </Stack>
        )}

        <TextMaxLine variant="body2" line={3}>
          {' '}
          {introduction}
        </TextMaxLine>
      </Stack>

      <Stack p={1} spacing={3} sx={{ my: 5 }}>
        {attributes &&
          attributes.map((attribute, index) => (
            <Stack spacing={2}>
              <Typography color={error ? 'error.main' : null} variant="subtitle2">
                {attribute.name}
              </Typography>
              <ProductOptionPicker
                value={attributesSelect[index].value}
                onChange={(event) => setAttribute(index, event.target.value)}
                options={attribute.values}
              />
            </Stack>
          ))}
        {error && (
          <Typography color="error.main" variant="body2">
            Vui lòng chọn phân loại hàng
          </Typography>
        )}
      </Stack>
      <Stack py={2} spacing={2} direction="row">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          Số lượng
        </Typography>
        <IncrementerButton changeQuantity={changeQuantity} quantity={quantity} />
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="flex-start"
        alignItems={{ md: 'center' }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth={!mdUp}
            size="large"
            color="inherit"
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
          >
            Thêm vào giỏ hàng
          </Button>

          <Button
            fullWidth={!mdUp}
            onClick={handleAddToCartAndBuyNow}
            size="large"
            color="primary"
            variant="contained"
          >
            Mua ngay
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={3} direction="row" justifyContent={{ xs: 'center', md: 'unset' }}>
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:add-alt" sx={{ mr: 1 }} /> Compare
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:favorite" sx={{ mr: 1 }} /> Compare
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:share" sx={{ mr: 1 }} /> Compare
        </Stack>
      </Stack>
      <Dialog onClose={dialog.onFalse} open={dialog.value}>
        <DialogContent>
          <Stack spacing={3} px={2} py={4}>
            <Alert severity="success">Thêm vào giỏ hàng thành công</Alert>
            <Stack direction="row" alignItems="center" flexGrow={1}>
              <Image
                src={currentVariant?.image}
                sx={{
                  width: 60,
                  height: 60,
                  flexShrink: 0,
                  borderRadius: 1.5,
                  bgcolor: 'background.neutral',
                }}
              />

              <Stack spacing={0.5} sx={{ p: 2 }}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Color: Grey Space
                </Typography>
                <Box color="error.main" component="span">
                  {fCurrency(currentVariant?.salePrice)}

                  {currentVariant?.discount && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        color: 'text.disabled',

                        textDecoration: 'line-through',
                      }}
                    >
                      {fCurrency(currentVariant?.price)}
                    </Box>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Stack
              sx={{ variant: 'h5', color: 'error.main' }}
              justifyContent="space-between"
              spacing={2}
              direction="row"
            >
              <Box>Tổng</Box>
              <Box>{fCurrency(cart.totalPrice)}</Box>
            </Stack>
            <Stack spacing={1}>
              {' '}
              <Button
                onClick={dialog.onFalse}
                component={RouterLink}
                href={paths.cart}
                fullWidth
                color="primary"
                variant="contained"
              >
                Xem giỏ hàng
              </Button>
              <Button onClick={dialog.onFalse} fullWidth variant="contained">
                Tiếp tục mua sắm
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

EcommerceProductDetailsInfo.propTypes = {
  quantity: PropTypes.number,
  changeQuantity: PropTypes.func,
};
