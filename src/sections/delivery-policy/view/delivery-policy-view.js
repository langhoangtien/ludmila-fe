import Link from 'next/link';

import { Stack, Container, Typography } from '@mui/material';

export default function DeliveryPolicyView() {
  return (
    <Container>
      <Stack p={3} mt={{ md: 4, xs: 2 }} spacing={1}>
        <Typography variant="h4" textTransform="uppercase" component="h3">
          CHÍNH SÁCH GIAO HÀNG
        </Typography>

        <Typography variant="body1">
          Ludmila có dịch vụ <strong>giao hàng tận nơi</strong> trên toàn quốc, áp dụng cho khách
          mua hàng trên website, fanpage và gọi điện thoại, hay mua trực tiếp tại cửa hàng.
        </Typography>
        <Typography variant="body1">
          Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp thông qua công ty vận
          chuyển trung gian.
        </Typography>

        <Typography color="primary.main" variant="h5">
          1. Thời gian giao hàng:
        </Typography>
        <Typography variant="subtitle1">
          1.1 Đơn hàng nội và ngoại thành Hà Nội và TP.HCM:
        </Typography>
        <Typography variant="body1">Thời gian giao hàng là 1-2 ngày sau khi đặt hàng.</Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Đơn hàng trước 3h chiều thì sẽ giao trong buổi chiều cùng ngày
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Đơn hàng sau 3h chiều sẽ giao trong buổi tối và sáng hôm sau.
            </Typography>
          </li>
        </ul>
        <Typography variant="subtitle1">1.2 Đơn hàng ở các tỉnh thành khác:</Typography>
        <Typography variant="body1">
          Thời gian là 2-3 ngày đối với khu vực trung tâm tỉnh thành phố, 3-5 ngày đối với khu vực
          ngoại thành, huyện, xã, thị trấn…
        </Typography>
        <Typography variant="body1">(Không tính thứ bảy, chủ nhật hay các ngày lễ tết)</Typography>
        <Typography variant="body1">
          Thời gian xử lý đơn hàng sẽ được tính từ khi quý khách hàng xác nhận đơn hoặc từ khi nhận
          được thanh toán hoàn tất của quý khách.
        </Typography>
        <Typography variant="body1">
          Có thể thay đổi thời gian giao hàng nếu khách hàng yêu cầu và Ludmila chủ động đổi trong
          trường hợp chịu ảnh hưởng của thiên tai hoặc các sự kiện đặc biệt khác.
        </Typography>
        <Typography variant="body1">
          - Đơn hàng của quý khách sẽ được hỗ trợ giao tối đa 3 lần thông qua Giao Hàng Tiết Kiệm
          (GHTK). Trường hợp lần đầu giao hàng không thành công, sẽ có nhân viên liên hệ để sắp xếp
          lịch giao hàng lần 2 với quý khách, trong trường hợp vẫn không thể liên lạc lại được sau 3
          lần hoặc không nhận được bất kì phản hồi nào từ phía quý khách, đơn hàng sẽ được thu hồi
          về.
        </Typography>
        <Typography variant="body1">
          - Hỗ trợ điều chỉnh địa chỉ giao hàng sau khi kho đã giao hàng: khách hàng hỗ trợ phí thay
          đổi địa chỉ là 10,000VND bằng các đơn vị vận chuyển toàn quốc (GHTK, Viettelpost, GHN...)
          hoặc sẽ được báo giá cụ thể nếu giao bằng các đơn vị hỏa tốc khác (Grab, Ahamove...)
        </Typography>
        <Typography variant="body1">
          Để kiểm tra thông tin hoặc tình trạng đơn hàng của quý khách, xin vui lòng inbox fanpage{' '}
          <Link href="https://www.facebook.com/ludmilavietnam">
            <span>Ludmila</span>
          </Link>{' '}
          hoặc gọi số hotline <span>0832 667 711</span>, cung cấp tên, số điện thoại để được kiểm
          tra.
        </Typography>
        <Typography variant="body1">
          Khi hàng được giao đến quý khách, vui lòng ký xác nhận với nhân viên giao hàng và kiểm tra
          lại số lượng cũng như loại hàng hóa được giao có chính xác không. Xin quý khách vui lòng
          giữ lại biên lại vận chuyển và hóa đơn mua hàng để đối chiếu kiểm tra. Tham khảo thêm{' '}
          <strong>
            <Link href="/return-policy">Chính sách đổi trả tại Ludmila</Link>
          </strong>
          .
        </Typography>
        <Typography color="primary.main" variant="h5">
          2. Phí giao hàng:
        </Typography>
        <Typography variant="body1">
          - Giao bằng các đơn vị vận chuyển GHTK/Viettelpost/GHN: 30,000 VND (gồm cả nội thành và
          ngoại thành)
        </Typography>
        <Typography variant="body1">
          - Giao hỏa tốc nội thành Hà Nội, TPHCM: áp dụng theo mức giá báo của Ahamove/Grab và quý
          khách hàng sẽ được báo trực tiếp khi đặt hàng tại website hoặc fanpage Ludmila.
        </Typography>

        <Typography variant="body1">
          - Chương trình miễn phí giao hàng đối với các đơn trên 500.000đ:
        </Typography>
        <Typography variant="body1">
          + Đơn hàng khối lượng dưới 5kg: Miễn phí giao hàng cơ bản bằng các đơn vị vận chuyển GHTK,
          Viettelpost, GHN đối với các đơn giao toàn quốc từ 1 triệu đồng.
        </Typography>
        <Typography variant="body1">
          Hỗ trợ phí tối đa 30,000 VND phí giao hàng hỏa tốc bằng các đơn vị Ahamove/Grab... đối với
          các đơn giao hỏa tốc nội và ngoại thành TPHCM.
        </Typography>
        <Typography variant="body1">
          + Đơn hàng cồng kềnh* từ 5kg trở lên: Hỗ trợ phí tối đa 30,000 VND phí giao hàng bằng các
          đơn vị vận chuyển thông thường hoặc hỏa tốc.
        </Typography>
        <Typography variant="body1">
          Nhân viên chăm sóc khách hàng sẽ liên hệ báo phí trực tiếp sau khi Ludmila nhận được đơn
          hàng cồng kềnh từ quý khách hàng.
        </Typography>
        <Typography variant="body1">
          *Hàng cồng kềnh: là những loại hàng hóa có kích thước to, lớn và thường chiếm nhiều diện
          tích. Do đó, nếu không có phương án vận chuyển phù hợp và an toàn sẽ gây ra tình trạng quá
          tải, cản trở giao thông, thậm chí tiềm ẩn nguy cơ gây tai nạn. Một số loại hàng hóa có
          kích thước quá khổ và cồng kềnh tại Ludmila như là các dạng vitamin và thực phẩm chức năng
          dạng lỏng (collagen nước, nước giải rượu, nước nghệ...) hay là các dạng có khối lượng nặng
          hơn 2kg/hộp và kích thước to hơn 50 x 40 x 50cm.
        </Typography>
      </Stack>
    </Container>
  );
}
