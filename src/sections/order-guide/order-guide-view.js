import { Stack, Container, Typography } from '@mui/material';

export default function OrderGuideView() {
  return (
    <Container>
      <Stack p={3} mt={{ md: 4, xs: 2 }} spacing={1}>
        <Typography variant="h4" textTransform="uppercase" component="h3">
          Hướng Dẫn Mua Hàng Tại LUDMILA
        </Typography>

        <Typography variant="body1">
          - Cách 1: Gọi điện thoại đến HOTLINE HN: 0832.667.711 hoặc : 0365.686.630 từ 8H30 - 22H
          (cả CN & ngày lễ) để đặt hàng, nhân viên chúng tôi luôn sẵn phục vụ, tư vấn và hỗ trợ quý
          khách mua được sản phẩm ưng ý.
        </Typography>
        <Typography variant="body1">
          - Cách 2: Đặt mua hàng online trên website ludmila.vn
        </Typography>

        <Typography variant="body1">
          - Cách 3: Đặt mua hàng tại zalo tại đây:{' '}
          <a href=" https://zalo.me/0832667711"> https://zalo.me/0832667711 </a> hoặc fanpage:
          <a href="https://www.facebook.com/ludmilavietnam">
            https://www.facebook.com/ludmilavietnam
          </a>{' '}
          để được tư vấn và hỗ trợ mua hàng.
        </Typography>
        <Typography variant="subtitle1">Thời gian giao hàng</Typography>
        <Typography variant="body1">Thời gian giao hàng là 1-2 ngày sau khi đặt hàng.</Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Đơn hàng trước 5h chiều thì sẽ giao trong buổi chiều cùng ngày
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Đơn hàng sau 5h chiều sẽ giao trong buổi tối và sáng hôm sau.
            </Typography>
          </li>
        </ul>
      </Stack>
    </Container>
  );
}
