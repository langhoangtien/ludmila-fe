import Image from 'next/image';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AboutUsView() {
  return (
    <Container
      sx={{
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography
        paragraph
        variant="h5"
        sx={{ color: 'primary.main', textAlign: { xs: 'center', md: 'left' } }}
      >
        Về chúng tôi
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        sx={{
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid xs={12} md={12} lg={12} sx={{ color: 'text.secondary' }}>
          <Stack spacing={{ xs: 3, md: 10 }}>
            <Typography variant="body2">
              Ludmila là kênh mua bán trực tuyến chuyên cung cấp các sản phẩm vitamin, thực phẩm
              chức năng và các sản phẩm hỗ trợ sức khỏe khác nhập khẩu chính hãng từ các thương hiệu
              nổi tiếng đến từ các nước như Nga, Úc, Nhật Bản hay Hàn Quốc.
            </Typography>

            <Grid container justifyContent="center">
              <Grid item>
                <Image
                  alt="career about"
                  src="/assets/images/company/about_us.jpg"
                  width={1000}
                  height={450}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            <Typography variant="body2">
              Ludmila tự hào là một trong những <strong>nhà phân phối đầu tiên</strong> tập trung
              khám phá vai trò dưỡng chất thực vật – vi chất có trong rau củ quả tự nhiên đa sắc
              màu, với nhiều lợi ích tối quan trọng được ứng dụng triệt để giúp tăng cường sức khỏe
              cho con người. Ludmila luôn trung thành với triết lý kết hợp tinh hoa từ khoa học và
              tinh túy từ thiên nhiên.
            </Typography>

            <Typography variant="body2">
              Với mong muốn mang đến cho khách hàng những sản phẩm hỗ trợ sức khỏe có thân thiện với
              mọi nhà nhưng cũng đảm bảo được chất lượng quốc tế của sản phẩm, Ludmila luôn tìm tòi
              và học hỏi cũng như đảm bảo nguồn hàng của mình được nhập khẩu từ các quốc gia uy tín
              như Úc, Mỹ, Canada... với mức giá cạnh tranh nhất. Và với quan điểm
              <strong>&ldquo;sức khỏe của khách hàng là trên hết, bằng mọi giá&rdquo;</strong>
              <strong>nói không với hàng giả, hàng nhái, hàng kém chất lượng</strong>, Ludmila hy
              vọng sẽ mang lại lòng tin cho khách hàng.
            </Typography>

            <Typography variant="body2">
              Ludmila còn hy vọng sẽ là một trong những kênh phân phối các nhãn hàng sản phẩm hỗ trợ
              sức khỏe lớn nhất tai Nga như Mirrolla, Glavproduct, Lumi hay Cigapan với các
              <strong>danh mục sản phẩm về sức khỏe đa dạng nhất</strong>, để có thể góp phần hỗ trợ
              sức khỏe cho mọi người dân Việt.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------
