import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    subheader: 'Thực phẩm chức năng',
    items: [
      { title: 'Sản phẩm', path: paths.products },
      { title: 'Giỏ hàng', path: paths.cart },
      { title: 'Tài khoản', path: paths.account.personal },
      { title: 'Yêu thích', path: paths.account.wishlist },
      { title: 'Mã giảm giá', path: paths.account.vouchers },
      { title: 'Đơn hàng', path: paths.account.orders },
    ],
  },
  {
    subheader: 'Mỹ phẩm',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.loginCover },
      { title: 'Hướng dẫn mua hàng Online', path: paths.loginIllustration },
      { title: 'Góp ý, Khiếu Nại', path: paths.login },
      { title: 'Liên hệ', path: paths.registerCover },
    ],
  },
  {
    subheader: 'Đồ hộp',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.loginCover },
      { title: 'Hướng dẫn mua hàng Online', path: paths.loginIllustration },
      { title: 'Góp ý, Khiếu Nại', path: paths.login },
      { title: 'Liên hệ', path: paths.registerCover },
    ],
  },
];
export const pageLinksFooter = [
  {
    subheader: 'Tài khoản',
    items: [
      { title: 'Giỏ hàng', path: paths.cart },
      { title: 'Tài khoản', path: paths.account.personal },
      { title: 'Yêu thích', path: paths.account.wishlist },
      { title: 'Mã giảm giá', path: paths.account.vouchers },
      { title: 'Đơn hàng', path: paths.account.orders },
    ],
  },
  {
    subheader: 'Hỗ trợ khách hàng',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.loginCover },
      { title: 'Hướng dẫn mua hàng Online', path: paths.loginIllustration },
      { title: 'Góp ý, Khiếu Nại', path: paths.login },
      { title: 'Liên hệ', path: paths.registerCover },
    ],
  },
  {
    subheader: 'Giới thiệu',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.loginCover },
      { title: 'Hướng dẫn mua hàng Online', path: paths.loginIllustration },
      { title: 'Góp ý, Khiếu Nại', path: paths.login },
      { title: 'Liên hệ', path: paths.registerCover },
    ],
  },
  {
    subheader: 'Chính sách',
    items: [
      { title: 'Chính sách bảo mật thông tin', path: paths.privacyPolicy },
      { title: 'Chính sách đổi trả', path: paths.returnPolicy },
      { title: 'Chính sách vận chuyển', path: paths.deliveryPolicy },
    ],
  },
];
export const navConfig = [
  { title: 'Trang chủ', path: '/' },
  {
    title: 'Danh mục',
    path: paths.pages,
    children: pageLinks,
  },
  { title: 'Giới thiệu', path: paths.aboutUs },
];

export const navConfigFooter = [
  { title: 'Trang chủ', path: '/' },
  {
    title: 'Danh mục',
    path: paths.pages,
    children: pageLinksFooter,
  },
  { title: 'Giới thiệu', path: paths.aboutUs },
];
