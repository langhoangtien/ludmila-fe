import { useGoogleLogin } from '@react-oauth/google';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function GoogleLoginButton({ callback }) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const handleGoogleLogin = () => login();
  return (
    <Button onClick={handleGoogleLogin} fullWidth size="large" color="inherit" variant="outlined">
      <Iconify icon="logos:google-icon" width={24} />
    </Button>
  );
}
