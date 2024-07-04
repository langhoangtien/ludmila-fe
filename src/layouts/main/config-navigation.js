import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    subheader: 'E-commerce',
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
    subheader: 'Hỗ trợ khách hàng',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.loginCover },
      { title: 'Hướng dẫn mua hàng Online', path: paths.loginIllustration },
      { title: 'Góp ý, Khiếu Nại', path: paths.loginBackground },
      { title: 'Liên hệ', path: paths.registerCover },
    ],
  },
  {
    subheader: 'Giới thiệu',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.loginCover },
      { title: 'Hướng dẫn mua hàng Online', path: paths.loginIllustration },
      { title: 'Góp ý, Khiếu Nại', path: paths.loginBackground },
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
