'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import CountUp from 'src/components/count-up';

// ----------------------------------------------------------------------

const SUMMARY = [
  { name: 'Sản phẩm', number: 1000 },
  { name: 'Khách hàng', number: 110000 },
  { name: 'Đơn hàng', number: 145000 },
  { name: 'Đối tác', number: 60 },
];

// ----------------------------------------------------------------------

const StyledSection = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(10),
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    right: 0,
    width: '75%',
    left: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    width: '50%',
  },
}));

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

      <Section />
    </Container>
  );
}

// ----------------------------------------------------------------------

function Section() {
  return (
    <StyledSection>
      <Stack
        sx={{
          py: 10,
          zIndex: 9,
          ml: 'auto',
          position: 'relative',
          px: { xs: 2.5, md: 10 },
          width: { md: 0.75, lg: 0.5 },
        }}
      >
        <Stack
          sx={{
            mb: 5,
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2" paragraph>
            Chúng tôi đã đạt được..
          </Typography>
          <Typography sx={{ opacity: 0.72 }}>
            Xin chào. Đại lý của chúng tôi đã có mặt hơn 5 năm. Chúng tôi làm những điều tốt nhất
            cho tất cả khách hàng của mình.
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 5,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {SUMMARY.map((value) => (
            <Stack key={value.name} spacing={1}>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                <CountUp
                  start={value.number / 5}
                  end={value.number}
                  formattingFn={(newValue) => fShortenNumber(newValue)}
                />

                <Typography variant="h3" component="span" sx={{ verticalAlign: 'top', ml: 0.5 }}>
                  +
                </Typography>
              </Typography>

              <Typography variant="body2" sx={{ color: 'grey.500' }}>
                {value.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <StyledOverlay />

      <Box sx={{ position: 'absolute', width: 1, height: 1, top: 0 }}>
        <Image
          alt="career about"
          src="/assets/images/career/career_about_team.jpg"
          sx={{ width: 1, height: 1 }}
        />
      </Box>
    </StyledSection>
  );
}
