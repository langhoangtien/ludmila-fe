import Link from 'next/link';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import TextMaxLine from 'src/components/text-max-line';
import { useCartContext } from 'src/components/cart/use-cart-context';
import { useProductContext } from 'src/components/product/use-product-contex';

import IncrementerButton from './incrementer-button';
import ProductOptionPicker from '../../common/product-option-picker';

// ----------------------------------------------------------------------

const InfoDetail = ({ title, link, name }) => (
  <Stack direction="row">
    <Typography sx={{ fontStyle: 'italic' }} variant="body2">
      {title}:&nbsp;
    </Typography>
    <Link passHref legacyBehavior href={`/${link}`}>
      <Typography sx={{ cursor: 'pointer' }} color="primary.main" variant="body2">
        {name}
      </Typography>
    </Link>
  </Stack>
);
InfoDetail.propTypes = { title: PropTypes.string, link: PropTypes.string, name: PropTypes.string };
export default function ProductDetailsInfo({ quantity, changeQuantity }) {
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
    brand,
    country,
    code,
    category,
  } = product;
  const cart = useCartContext();
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
    const image = currentVariant.image || product.image;
    const variantSelected = { ...currentVariant, name, image };
    cart.addToCart(variantSelected, quantity);
    router.push(paths.cart);
  };
  return (
    <>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating size="small" value={ratingAverage} readOnly precision={0.5} />

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ({totalReviews} Đánh giá)
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography sx={{ fontStyle: 'italic' }} variant="body2">
            Mã sản phẩm:&nbsp;
          </Typography>

          <Typography variant="body2">{code}</Typography>
        </Stack>
        <InfoDetail
          name={category.name}
          link={`category/${category.code}-${category._id}`}
          title="Danh mục"
        />

        <InfoDetail
          name={brand.name}
          link={`brand/${brand.code}-${brand._id}`}
          title="Thương hiệu"
        />

        <InfoDetail
          name={country.name}
          link={`country/${country.code}-${country._id}`}
          title="Xuất xứ"
        />
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
            <Stack key={attribute.name} spacing={2}>
              <Typography color={error ? 'error.main' : null} variant="subtitle2">
                {attribute.name}
              </Typography>
              <ProductOptionPicker
                value={attributesSelect[index].value}
                onChangeAtt={(att) => setAttribute(index, att)}
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
