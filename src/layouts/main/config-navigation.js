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
      { title: 'Hướng dẫn thanh toán', path: paths.login },
      { title: 'Hướng dẫn mua hàng Online', path: paths.login },
      { title: 'Góp ý, Khiếu Nại', path: paths.login },
      { title: 'Liên hệ', path: paths.login },
    ],
  },
  {
    subheader: 'Đồ hộp',
    items: [
      { title: 'Hướng dẫn thanh toán', path: paths.login },
      { title: 'Hướng dẫn mua hàng Online', path: paths.login },
      { title: 'Góp ý, Khiếu Nại', path: paths.login },
      { title: 'Liên hệ', path: paths.login },
    ],
  },
];
export const pageLinksFooter = [
  {
    subheader: 'Tài khoản',
    items: [
      { title: 'Giỏ hàng', path: paths.cart },
      { title: 'Đơn hàng', path: paths.account.orders },
      { title: 'Tài khoản', path: paths.account.personal },
      { title: 'Yêu thích', path: paths.account.wishlist },
      { title: 'Mã giảm giá', path: paths.account.vouchers },
    ],
  },
  {
    subheader: 'Hỗ trợ khách hàng',
    items: [
      { title: 'Hướng dẫn mua hàng', path: paths.orderGuide },
      { title: 'Góp ý, Khiếu Nại', path: paths.contactUs },
    ],
  },
  {
    subheader: 'Giới thiệu Ludmila',
    items: [
      { title: 'Về chúng tôi', path: paths.aboutUs },
      { title: 'Đăng ký làm CTV', path: paths.contactUs },
      { title: 'Liên hệ', path: paths.contactUs },
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
