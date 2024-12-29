import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { Box, Stack, Container, Typography } from '@mui/material';

const rows = [
  {
    paymentMethod: 'Thanh toán bằng tiền mặt (COD)',
    returnMethod: 'Chuyển khoản',
    returnTime: '1-3 ngày làm việc',
  },
  {
    paymentMethod: 'Thanh toán qua thẻ ATM nội địa',
    returnMethod: 'Thẻ ATM nội địa',
    returnTime: '2-4 ngày làm việc',
  },
  {
    paymentMethod: 'Thanh toán bằng thẻ tín dụng, ghi nợ quốc tế',
    returnMethod: 'Thẻ tín dụng, ghi nợ',
    returnTime: '5-10 ngày làm việc',
  },

  {
    paymentMethod: 'Thanh toán qua Momo',
    returnMethod: 'Ví điện tử',
    returnTime: '1-3 ngày làm việc',
  },
  {
    paymentMethod: 'Thanh toán qua ZaloPay',
    returnMethod: 'Ví điện tử',
    returnTime: '1-3 ngày làm việc',
  },
];
export default function ReturnPolicyView() {
  return (
    <Container>
      <Stack p={3} mt={{ md: 4, xs: 2 }} spacing={1}>
        <Typography variant="h4" textTransform="uppercase" component="h3">
          Chính Sách Đổi Trả & Hoàn Tiền
        </Typography>

        <Typography variant="body1">
          <Box>Ludmila đồng ý nhận đổi trả cho những trường hợp sau:&nbsp;</Box>
        </Typography>
        <Typography variant="body1">
          <Box variant="h5" component={Typography} sx={{ color: 'primary.main' }}>
            <strong>1. Trường hợp đổi trả:</strong>
          </Box>
        </Typography>
        <ul>
          <li>
            <Box>
              Hàng không đúng chủng loại, mẫu mã hoặc thiếu mẫu&nbsp;trong đơn hàng đã đặt hoặc như
              trên website tại thời điểm đặt hàng.&nbsp;
            </Box>
          </li>
          <li>
            <Box>Không đủ số lượng, không đủ bộ như trong đơn hàng.</Box>
          </li>
          <li>
            <Box>Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…</Box>
          </li>
          <li>
            <Box>
              Nhân viên Ludmila lên đơn sai thông tin hoặc chưa có sự đồng ý của khách hàng* (Khách
              hàng vui lòng gửi đầy đủ thông tin qua hotline hoặc fanpage để được hướng dẫn giải
              quyết nhanh nhất)&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              Khách hàng đổi ý không mua nữa* (Vui lòng hỗ trợ Ludmila thanh toán phí giao hàng 2
              chiều đối với các trường hợp này)&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              <strong>
                Khách hàng phát hiện hàng giả, Ludmila sẽ áp dụng chính sách ĐỀN GẤP ĐÔI
              </strong>
            </Box>
          </li>
        </ul>
        <Typography variant="body1">
          <Box>
            Ngoài ra, quý Khách hàng có thể kiểm tra tình trạng hàng hóa và thông báo cho nhân viên
            bên Ludmila ngay tại thời điểm giao/nhận hàng nếu tình trạng hàng hóa thuộc 1 trong
            những trường hợp trên.&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box variant="h5" component={Typography} sx={{ color: 'primary.main' }}>
            <strong>2. Điều kiện đổi trả:&nbsp;</strong>
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            Ludmila chỉ hỗ trợ đền bù sản phẩm khi có{' '}
            <u>
              <strong>video quay lúc nhận hàng</strong>
            </u>{' '}
            và đối chiếu với shipper hoặc kiểm tra hàng trực tiếp với shipper đến từ các đối tác
            giao hàng.&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            Các trường hợp không có video quay hoặc không đối chiếu được với shipper và Ludmila có
            bằng chứng cung cấp đã cung cấp đúng và đủ số lượng như đơn hàng thì Ludmila không hỗ
            trợ đền bù hoặc hoàn tiền.&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            Trường hợp, nếu quý khách mong muốn đổi/trả lại hàng và sản phẩm hoàn toàn không bị lỗi
            cũng như do quý khách đổi ý,&nbsp;quý khách&nbsp;có thể trả lại sản phẩm đã mua khi thỏa
            mãn các điều kiện sau:
          </Box>
        </Typography>
        <ul>
          <li>
            <div className="li">
              <Box>
                Sản phẩm không có dấu hiệu đã qua sử dụng, còn nguyên tem, mác hay niêm phong của
                nhà sản xuất (Ludmila vẫn sẽ nhận những sản phẩm có hộp bị rách hoặc bong tróc do
                vận chuyển).
              </Box>
            </div>
          </li>
          <li>
            <div className="li">
              <Box>
                Sản phẩm còn đầy đủ phụ kiện, tem hoặc phiếu bảo hành cùng quà tặng kèm theo (nếu
                có).
              </Box>
            </div>
          </li>
          <li>
            <div className="li">
              <Box>
                Ludmila chỉ hỗ trợ các trường hợp trả hàng ngay tại thời điểm còn shipper hoặc đại
                diện của các đối tác vận chuyển. Ludmila không nhận hỗ trợ sau khi khách hàng nhận
                hàng và đổi ý để đảm bảo chất lượng của sản phẩm.
              </Box>
            </div>
          </li>
        </ul>
        <div className="li level1">
          <Box>
            Trong trường hợp bị thiếu sản phẩm, quý khách phải báo ngay với bộ phận chăm sóc khách
            hàng của Ludmila ngay lúc nhận hàng hoặc trong vòng 3 ngày&nbsp;sau khi nhận hàng và có
            video quay cảnh bạn mở hàng ra.&nbsp;
          </Box>
          <Box>
            Ludmila chỉ hỗ trợ các trường hợp trên trong vòng 3 ngày kể từ thời điểm nhận
            hàng.&nbsp;
          </Box>
          <Box>
            Ludmila không nhận hỗ trợ đổi trả sau 3 ngày khi khách hàng nhận hàng và đổi ý để đảm
            bảo chất lượng của sản phẩm và sẽ cung cấp bằng chứng xác nhận Ludmila đã đóng gói đủ
            hàng.
          </Box>
        </div>
        <Typography variant="body1">
          <Box>
            <strong>Lưu ý:&nbsp;</strong>
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>Ludmila sẽ không nhận đổi trả cho những sản phẩm sau:</Box>
        </Typography>
        <ul>
          <li>
            <Box>
              Sản phẩm đã được mở ra sử dụng/ bao bì bị bong, tróc hoặc sản phẩm nhìn khác so với
              lúc giao hàng.&nbsp;
            </Box>
          </li>
          <li>
            <Box className="wysiwyg-font-size-medium">Sản phẩm khuyến mại, tặng kèm.&nbsp;</Box>
          </li>
          <li>
            <Box className="wysiwyg-font-size-medium">Hàng mua tại các sự kiện Offline&nbsp;</Box>
          </li>
          <li>
            <Box className="wysiwyg-font-size-medium">Sản phẩm thanh lý</Box>
          </li>
          <li>
            <Box>
              <Box className="wysiwyg-font-size-medium">
                Sản phẩm có thông tin chi tiết không áp dụng đổi<Box>&nbsp;</Box>
              </Box>
              <Box className="wysiwyg-font-size-medium">trả.&nbsp;</Box>
            </Box>
          </li>
          <li>
            <Box className="wysiwyg-font-size-medium">
              Sản phẩm mua với hình thức thanh toán trả góp.
            </Box>
          </li>
        </ul>
        <Typography variant="body1">
          <Box variant="h5" component={Typography} sx={{ color: 'primary.main' }}>
            <strong>3. Quá trình đổi trả:</strong>&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>Khi có nhu cầu đổi trả, quý khách hàng vui lòng liên hệ Ludmila ngay lập tức.</Box>
        </Typography>
        <Typography variant="body1">
          <Box>Quý khách có thể liên hệ thông qua:&nbsp;</Box>
        </Typography>
        <ul>
          <li>
            <Box>Số hotline: 0832 667 711</Box>
          </li>
          <li>
            <Box>Zalo: 0832 667 711</Box>
          </li>
          <li>
            <Box>
              FB:&nbsp;
              <a href="https://www.facebook.com/ludmilavietnam">
                https://www.facebook.com/ludmilavietnam
              </a>
            </Box>
          </li>
        </ul>
        <Typography variant="body1">
          <Box>
            Ludmila sẽ tiếp nhận các đóng góp & khiếu nại, liên hệ làm rõ các yêu cầu của Khách hàng
            trong thời gian sớm nhất có thể và không quá 2 ngày làm việc, kể từ ngày nhận được yêu
            cầu.&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            <Box>
              Ludmila có thể yêu cầu Khách hàng cung cấp các thông tin, bằng chứng liên quan đến
              giao dịch, sản phẩm để xác minh, làm rõ vụ việc và có hướng xử lý thích hợp.
            </Box>
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>Nếu món hàng được duyệt đổi trả:&nbsp;</Box>
        </Typography>
        <ul>
          <li>
            <Box>
              Khách hàng sẽ chịu tiền phí vận chuyển và các chi phí khác phát sinh nếu khách hàng
              đổi ý không muốn giữ hàng.&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              Ludmila sẽ chịu tiền&nbsp;tiền phí vận chuyển và các chi phí khác phát sinh
              <strong>&nbsp;</strong>nếu sản phẩm bị lỗi/bể vỡ do vận chuyển/giao thiếu.&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              Ludmila sẽ hoàn trả lại tiền sau khi Ludmila nhận được món hàng và xác nhận tình trạng
              món hàng đúng theo yêu cầu bên trên. Trong trường hợp chuyển phát nhanh, Ludmila sẽ
              chỉ hoàn trả lại tiền sau khi hàng được chuyển về văn phòng và được kiểm duyệt.&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              Nếu sản phẩm vẫn đạt yêu cầu sau khi Ludmila kiểm tra và không đúng với lời nhận xét
              của khách hàng, Ludmila sẽ không phải hoàn trả lại tiền mua hàng và tiền phí vận
              chuyển 2 chiều. Khách hàng phải chịu trách nhiệm tiền phí vận chuyển trả hàng đến
              Ludmila và gửi hàng về lại khách hàng.&nbsp;
            </Box>
          </li>
        </ul>
        <Typography variant="body1">
          <Box>
            Nếu món hàng không được duyệt đổi trả, do không đáp ứng đủ các yêu cầu phía trên:&nbsp;
          </Box>
        </Typography>
        <ul>
          <li>
            <Box>
              Ludmila sẽ không chịu bất kì các chi phí nào phát sinh, nhưng Agrioly sẽ hỗ trợ quý
              khách hàng về quá trình bán lại cho khách hàng khác bằng cách đăng lên trang Facebook
              của Ludmila. Ngoài ra, Ludmila không chịu bất cứ trách nhiệm về sản phẩm.
            </Box>
          </li>
        </ul>
        <div>
          <Box>Thời gian hoàn tiền:&nbsp;</Box>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Phương thức thanh toán</TableCell>
                  <TableCell>Phương thức hoàn tiến</TableCell>
                  <TableCell>Thời gian hoàn tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.paymentMethod}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.paymentMethod}
                    </TableCell>

                    <TableCell>{row.returnMethod}</TableCell>
                    <TableCell>{row.returnTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            Lưu ý: Thời gian hoàn tiền sẽ được tính từ khi Ludmila xác nhận chính thức sẽ hoàn tiền
            qua điện thoại, Zalo, SMS, Fanpage, hoặc email, và áp dụng theo giờ hành chính không áp
            dụng vào thứ 7 & chủ nhật hoặc ngày lễ.&nbsp;
          </Box>
        </div>
        <Typography variant="body1">
          <Box variant="h5" component={Typography} sx={{ color: 'primary.main' }}>
            <strong>4. Quy định về thời gian thông báo và gửi sản phẩm đổi trả:&nbsp;</strong>
          </Box>
        </Typography>
        <ul>
          <li>
            <Box>
              <strong>Thời gian thông báo đổi trả</strong>:&nbsp;trong vòng 24h kể từ khi nhận sản
              phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ hoặc giao thiếu
              số lượng.&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              <strong>Thời gian gửi chuyển trả sản phẩm</strong>: trong vòng 7 ngày kể từ khi nhận
              sản phẩm.&nbsp;
            </Box>
          </li>
          <li>
            <Box>
              <strong>Địa điểm đổi trả sản phẩm</strong>: Khách hàng có thể mang hàng trực tiếp đến
              văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.&nbsp;
            </Box>
          </li>
        </ul>
        <Typography variant="body1">
          <Box variant="h5" component={Typography} sx={{ color: 'primary.main' }}>
            <strong>5. Đóng góp/Khiếu nại về sản phẩm:&nbsp;</strong>
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng
            sản phẩm, Quý Khách hàng vui lòng liên hệ Agrioly qua những phương thức trên.&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          Ludmila
          <Box>
            &nbsp;sẽ tiếp nhận các đóng góp & khiếu nại, liên hệ làm rõ các yêu cầu của Khách hàng
            trong thời gian sớm nhất có thể và không quá 5 ngày làm việc, kể từ ngày nhận được yêu
            cầu.&nbsp;
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            <Box>Mọi đóng góp & khiếu nại về sản phẩm sẽ được xem xét kĩ lưỡng.</Box>
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            <Box>Các đóng góp sẽ giúp chúng tôi cải thiện dịch vụ và sản phẩm của mình.&nbsp;</Box>
          </Box>
        </Typography>
      </Stack>
    </Container>
  );
}
