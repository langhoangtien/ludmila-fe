'use client';

import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Badge, Dialog, IconButton, DialogContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { endpoints } from 'src/utils/fetch';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { MegaMenuDesktopHorizontal } from 'src/components/mega-menu';
import { useCartContext } from 'src/components/cart/use-cart-context';

import LoginView from 'src/sections/auth/login-view';
import RegisterView from 'src/sections/auth/register-view';

import NavMobile from './nav/mobile';
import { HEADER } from '../config-layout';
import SearchDemo from '../common/search-demo';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';

// ----------------------------------------------------------------------
const shakeAnimation = keyframes`
25% {
    transform:translateX(6px)
  }
  50% {
    transform:translateX(-4px);
  }
  75% {
    transform:translateX(2px);
  }
  100% {
    transform:translateX(0);
  }
`;
export default function Header({ headerOnDark }) {
  const theme = useTheme();
  const dialog = useBoolean();
  const offset = useOffSetTop();
  const [loginPage, setLoginPage] = useState(true);
  const mdUp = useResponsive('up', 'md');
  const { totalProduct, shake } = useCartContext();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menuLocal = sessionStorage.getItem('menu');
        if (!menuLocal) {
          const response = await fetch(endpoints.home.menu);
          const data = await response.json();
          const dataMapped = data.map((item) => ({
            subheader: item.name,
            items: item.children.map((child) => ({
              title: child.name,
              path: `${paths.category}/${child.code}-${child._id}`,
            })),
          }));
          const nav = [
            {
              title: 'Danh mục',
              path: paths.pages,
              children: dataMapped,
            },
            { title: 'Sản phẩm', path: paths.products },
            { title: 'Thương hiệu', path: paths.contactUs },
          ];
          sessionStorage.setItem('menu', JSON.stringify(nav));
          setMenu(nav);
        } else {
          setMenu(JSON.parse(menuLocal));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMenu();
  }, []);

  const renderContent = (
    <Stack direction="column" pt={1} flexGrow={1}>
      {mdUp && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />
          </Box>

          <Stack
            alignItems="center"
            sx={{
              height: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <MegaMenuDesktopHorizontal data={menu} />
          </Stack>
          {/* <SearchDemo flexGrow={1} /> */}

          <Stack spacing={1} justifyContent="space-between" direction="row">
            <Badge badgeContent={totalProduct} color="error">
              <IconButton
                component={RouterLink}
                href={paths.cart}
                size="small"
                color="inherit"
                sx={{ p: 0, animation: shake && `${shakeAnimation} .4s ease-in-out infinite` }}
              >
                <Iconify icon="fluent:cart-20-regular" height={28} width={28} />
              </IconButton>
            </Badge>
            <SettingsButton />
          </Stack>
        </Stack>
      )}

      {!mdUp && (
        <>
          {' '}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0.5}
            flexGrow={1}
            position={{ xs: 'relative', md: 'static' }}
          >
            <NavMobile data={menu} />
            {/* <Box sx={{ lineHeight: 0, position: 'relative' }}>
              <Logo />
            </Box> */}
            <SearchDemo flexGrow={1} />
            <Stack spacing={1} justifyContent="space-between" direction="row">
              <Badge badgeContent={totalProduct} color="error">
                <IconButton
                  component={RouterLink}
                  href={paths.cart}
                  size="small"
                  color="inherit"
                  sx={{ p: 0, animation: shake && `${shakeAnimation} .4s ease-in-out infinite` }}
                >
                  <Iconify icon="fluent:cart-20-regular" height={28} width={28} />
                </IconButton>
              </Badge>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );

  return (
    <>
      <AppBar>
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_DESKTOP,
            },
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(headerOnDark && {
              color: 'common.white',
            }),
            backgroundColor: theme.palette.background.header,
            ...(offset && {
              ...bgBlur({ color: theme.palette.background.header }),
              color: 'text.primary',
              height: {
                md: HEADER.H_DESKTOP,
              },
            }),
          }}
        >
          <Container
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderContent}
          </Container>
        </Toolbar>

        {offset && <HeaderShadow />}
      </AppBar>
      <Dialog maxWidth="xs" fullWidth onClose={dialog.onFalse} open={dialog.value}>
        <DialogContent>
          <Stack
            spacing={4}
            sx={{
              p: 4,
              width: 1,
              mx: 'auto',

              borderRadius: 2,

              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {loginPage ? (
              <LoginView dialog={dialog} onChangePage={() => setLoginPage(false)} />
            ) : (
              <RegisterView dialog={dialog} onChangePage={() => setLoginPage(true)} />
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
