import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';
import { useActiveLink } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { convertImagePathToUrl } from 'src/utils/common';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Thông tin tài khoản',
    path: paths.account.personal,
    icon: <Iconify icon="fluent:person-20-regular" />,
  },
  {
    title: 'Đơn hàng',
    path: paths.account.orders,
    icon: <Iconify icon="fluent:document-text-20-regular" />,
  },
  {
    title: 'Yêu thích',
    path: paths.account.wishlist,
    icon: <Iconify icon="fluent:heart-20-regular" />,
  },
  {
    title: 'Mã giảm giá',
    path: paths.account.vouchers,
    icon: <Iconify icon="fluent:tag-multiple-20-regular" />,
  },

  {
    title: 'Thanh toán',
    path: paths.account.payment,
    icon: <Iconify icon="fluent:payment-20-regular" />,
  },
];

// ----------------------------------------------------------------------

export default function Nav({ open, onClose }) {
  const mdUp = useResponsive('up', 'md');
  const auth = useAuthContext();

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(mdUp && {
          width: 280,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
          <Avatar
            src={convertImagePathToUrl(auth?.user?.photo, 250)}
            sx={{ width: 64, height: 64 }}
          />
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {auth?.user?.fullName}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {auth?.user?.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
        >
          <ListItemIcon>
            <Iconify icon="fluent:sign-out-20-regular" />
          </ListItemIcon>
          <ListItemText
            primary="Đăng xuất"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const active = useActiveLink(item.path);

  return (
    <Link
      component={RouterLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};
