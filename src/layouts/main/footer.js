'use client';

import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Button, { buttonClasses } from '@mui/material/Button';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _socials } from 'src/_mock';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { navConfigFooter, pageLinksFooter } from './config-navigation';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');

  const pathname = usePathname();

  const mobileList = navConfigFooter.find((i) => i.title === 'Pages')?.children || [];

  const desktopList = pageLinksFooter.sort(
    (listA, listB) => Number(listA.order) - Number(listB.order)
  );

  const renderLists = mdUp ? desktopList : mobileList;

  const isHome = pathname === '/404';

  const simpleFooter = (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Logo single />

      <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
        © 2024. All rights reserved
      </Typography>
    </Container>
  );

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />

                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Nhà bán lẻ chính hãng sản phẩm vitamin, thực phẩm chức năng và các sản phẩm hỗ trợ
                  sức khỏe khác đến từ các thương hiệu nổi tiếng trong và ngoài nước.
                </Typography>
              </Stack>

              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="h6">Liên hệ</Typography>{' '}
                <Box
                  variant="body2"
                  sx={{ color: 'text.primary', alignItems: 'center', display: 'flex' }}
                >
                  <Iconify icon="fluent:location-20-regular" />
                  <Typography variant="body2">
                    &nbsp; T10 Tòa Benka, Lệ chi - Gia Lâm - Hà Nội
                  </Typography>
                </Box>
                <Box
                  variant="body2"
                  sx={{ color: 'text.primary', alignItems: 'center', display: 'flex' }}
                >
                  <Iconify icon="fluent:call-20-regular" />{' '}
                  <Typography variant="body2">&nbsp; 0832.66.77.11</Typography>
                </Box>
                <Box
                  variant="body2"
                  sx={{ color: 'text.primary', alignItems: 'center', display: 'flex' }}
                >
                  <Iconify icon="fluent:mail-20-regular" />
                  <Typography variant="body2"> &nbsp; support@ludmila.vn</Typography>
                </Box>
              </Stack>

              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">Giữ liên lạc với chúng tôi</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Đăng ký nhận email thông báo khuyến mãi hoặc để được tư vấn miễn phí
                  </Typography>
                </Stack>

                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" color="inherit" size="large" sx={{ mr: -1.25 }}>
                          Đăng ký
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Social</Typography>
                <Stack direction="row" alignItems="center">
                  {_socials.map((social) => (
                    <Link key={social.value} href={social.link}>
                      <IconButton key={social.value} color="primary">
                        <Iconify icon={social.icon} />
                      </IconButton>
                    </Link>
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Apps</Typography>
                <AppStoreButton />
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            {mdUp ? (
              <Masonry columns={4} spacing={2} defaultColumns={4} defaultSpacing={2}>
                {renderLists.map((list) => (
                  <ListDesktop key={list.subheader} list={list} />
                ))}
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                {renderLists.map((list) => (
                  <ListMobile key={list.subheader} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2024. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Help Center
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={
            listExpand.value ? 'fluent:chevron-down-20-regular' : 'fluent:chevron-right-20-regular'
          }
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
