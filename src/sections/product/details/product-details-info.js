import Link from 'next/link';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box, Table, TableRow, TableBody, TableCell } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';
import { useCartContext } from 'src/components/cart/use-cart-context';
import { useProductContext } from 'src/components/product/use-product-contex';

import IncrementerButton from './incrementer-button';
import ProductOptionPicker from '../../common/product-option-picker';

// ----------------------------------------------------------------------

const InfoDetail = ({ title, link, name, category }) => {
  const renderCategory = () => {
    if (category && category.length > 0) {
      return (
        <Stack>
          {category.map((item) => (
            <Link
              key={item._id}
              style={{ textDecoration: 'none' }}
              href={`/category/${item.code}-${item._id}`}
            >
              <Typography sx={{ cursor: 'pointer' }} color="primary.main" variant="body2">
                {item.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      );
    }

    if (link)
      return (
        <Link style={{ textDecoration: 'none' }} href={link}>
          <Typography sx={{ cursor: 'pointer' }} color="primary.main" variant="body2">
            {name}
          </Typography>
        </Link>
      );
    return (
      <TextMaxLine variant="body2" line={3}>
        {' '}
        {name}{' '}
      </TextMaxLine>
    );
  };
  return (
    <TableRow sx={{ display: { xs: 'flex', md: 'table' }, flexDirection: 'column' }}>
      <TableCell
        sx={{
          width: 115,
          py: { md: 1, xs: 0.5 },
          color: { xs: 'text.secondary', md: 'inherit' },
          px: 0,
        }}
      >
        {title}
      </TableCell>
      <TableCell sx={{ py: { md: 1, xs: 0.5 }, px: 0 }}>{renderCategory()}</TableCell>
    </TableRow>
  );
};
InfoDetail.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.array,
};
export default function ProductDetailsInfo({ quantity, changeQuantity }) {
  const { product, attributesSelect, currentVariant, handleSelectVariant } = useProductContext();

  const {
    name,
    introduction,
    ratingAverage,
    totalReviews,

    attributes,
    brand,
    country,
    code,
    category,
  } = product;
  const cart = useCartContext();
  const [error, setError] = useState(false);
  const dialog = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const handleAddToCart = () => {
    setError(!currentVariant);
    if (!currentVariant) {
      return;
    }
    const image = currentVariant.image || product.image;
    const variantSelected = { ...currentVariant, name, image };

    cart.addToCart(variantSelected, quantity);
    enqueueSnackbar('Thêm vào giỏ hàng thành công', { variant: 'success' });
    dialog.onTrue();
  };
  const handleAddToCartAndBuyNow = () => {
    setError(!currentVariant);
    if (!currentVariant) {
      return;
    }
    const image = currentVariant.image || product.image;
    const variantSelected = { ...currentVariant, name, image };
    cart.addToCart(variantSelected, quantity);
    router.push(paths.cart);
  };
  return (
    <>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Stack direction="row">
          <Typography variant="body2">Thương hiệu:&nbsp;</Typography>
          <Link passHref legacyBehavior href={`/brand/${brand.code}-${brand._id}`}>
            <Typography sx={{ cursor: 'pointer' }} color="primary.main" variant="body2">
              {brand.name}
            </Typography>
          </Link>
        </Stack>

        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="body2">{code}</Typography>

          {!!ratingAverage && (
            <Stack direction="row" alignItems="center" spacing={0.25}>
              <Typography variant="subtiltle2">{ratingAverage}</Typography>
              <Iconify width={18} icon="fluent:star-20-filled" color="warning.main" />
              <Box
                component="a"
                href="#reviews"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  textDecoration: 'none',
                }}
              >
                ({totalReviews} đánh giá)
              </Box>
            </Stack>
          )}
        </Stack>

        <Stack py={1} spacing={2}>
          <Stack direction="column" spacing={0.5}>
            <Typography variant="h3" color="primary">
              {fCurrency(currentVariant.salePrice)}
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {currentVariant.price !== currentVariant.salePrice && fCurrency(currentVariant.price)}
            </Typography>
          </Stack>
        </Stack>
        <Table>
          <TableBody>
            <InfoDetail category={category} title="Danh mục" />
            <InfoDetail
              name={country.name}
              link={`/country/${country.code}-${country._id}`}
              title="Xuất xứ"
            />

            {/* <InfoDetail name="Hộp" title="Quy cách" /> */}
            <InfoDetail name={introduction} title="Mô tả ngắn" />
          </TableBody>
        </Table>
      </Stack>

      <Stack spacing={2} sx={{ my: 5 }}>
        {attributes &&
          attributes.map((attribute, index) => (
            <Stack key={attribute.name} spacing={2}>
              <Typography color={error ? 'error.main' : null} variant="subtitle2">
                {attribute.name}
              </Typography>
              <ProductOptionPicker
                value={attributesSelect[index].value}
                onChangeAtt={(att) => handleSelectVariant(attribute.name, att)}
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

      <Stack spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          onClick={handleAddToCart}
          variant="contained"
        >
          Thêm vào giỏ hàng
        </Button>

        <Button
          fullWidth
          onClick={handleAddToCartAndBuyNow}
          size="large"
          color="primary"
          variant="contained"
        >
          Mua ngay
        </Button>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />
    </>
  );
}

ProductDetailsInfo.propTypes = {
  quantity: PropTypes.number,
  changeQuantity: PropTypes.func,
};
