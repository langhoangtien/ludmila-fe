import { Box, Skeleton } from '@mui/material';

export default function ReviewItemSkeleton() {
  return (
    <Box sx={{ display: 'flex', marginBottom: 3, py: 3 }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, marginX: 2 }}>
        <Skeleton variant="text" sx={{ width: { xs: '80%', md: '40%' } }} />
        <Skeleton variant="text" sx={{ width: { xs: '80%', md: '40%' } }} />
        <Skeleton variant="text" sx={{ width: { xs: '80%', md: '40%' } }} />
        <Skeleton variant="text" sx={{ width: { xs: '100%', md: '60%' } }} />
      </Box>
    </Box>
  );
}
