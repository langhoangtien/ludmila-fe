'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';

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

import { bgBlur } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { MegaMenuDesktopHorizontal } from 'src/components/mega-menu';
import { useCartContext } from 'src/components/cart/use-cart-context';

import LoginBackgroundView from 'src/sections/auth/login-background-view';
import RegisterBackgroundView from 'src/sections/auth/register-background-view';

import NavMobile from './nav/mobile';
import { HEADER } from '../config-layout';
import SearchDemo from '../common/search-demo';
import { navConfig } from './config-navigation';
import HeaderShadow from '../common/header-shadow';
import AccountPopover from '../common/account-popover';

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
  const { authenticated } = useAuthContext();
  const offset = useOffSetTop();
  const [loginPage, setLoginPage] = useState(true);
  const mdUp = useResponsive('up', 'md');
  const { totalProduct, shake } = useCartContext();

  const renderContent = (
    <Stack direction="column" pt={2} spacing={2} flexGrow={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        flexGrow={1}
      >
        <Box sx={{ lineHeight: 0, position: 'relative' }}>
          <Logo />
        </Box>

        <Stack
          flexGrow={1}
          alignItems="center"
          sx={{
            height: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <MegaMenuDesktopHorizontal data={navConfig} />
        </Stack>
        {mdUp && <SearchDemo flexGrow={2} />}
        <Box flexGrow={1} />
        <Stack spacing={1.5} justifyContent="space-between" direction="row">
          {authenticated && (
            <Badge badgeContent={2} color="info">
              <IconButton
                component={RouterLink}
                href={paths.wishlist}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:favorite" width={24} />
              </IconButton>
            </Badge>
          )}
          <Badge badgeContent={totalProduct} color="error">
            <IconButton
              component={RouterLink}
              href={paths.cart}
              size="small"
              color="inherit"
              sx={{ p: 0, animation: shake && `${shakeAnimation} .4s ease-in-out infinite` }}
            >
              <Iconify icon="carbon:shopping-cart" width={24} />
            </IconButton>
          </Badge>
          {authenticated ? (
            <AccountPopover />
          ) : (
            <IconButton onClick={dialog.onTrue} size="small" color="inherit" sx={{ p: 0 }}>
              <Iconify icon="carbon:user" width={24} />
            </IconButton>
          )}
        </Stack>
        {!mdUp && <NavMobile data={navConfig} />}
      </Stack>

      {!mdUp && <SearchDemo pb={1} flexGrow={1} />}
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
            ...(offset && {
              ...bgBlur({ color: theme.palette.background.default }),
              color: 'text.primary',
              height: {
                md: HEADER.H_DESKTOP - 16,
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
              <LoginBackgroundView dialog={dialog} onChangePage={() => setLoginPage(false)} />
            ) : (
              <RegisterBackgroundView dialog={dialog} onChangePage={() => setLoginPage(true)} />
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
