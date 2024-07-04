import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { Button } from '@mui/material';

import { GOOGLE_CLIENT_ID } from 'src/config-global';

import Iconify from 'src/components/iconify';

const GoogleOneTap = ({ submitLogin }) => {
  const handleCredentialResponse = (response) => {
    console.log(`Encoded JWT ID token: ${response.credential}`);
    submitLogin(response.credential);
  };

  const handleClick = () => {
    // Trigger click event of hidden file input
    document.getElementById('buttonDiv').click();
  };
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // Render the One Tap button
      window.google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
        theme: 'outline',
        size: 'large',
      });

      // Prompt the One Tap dialog
      // window.google.accounts.id.prompt();
    }
  }, []);

  return (
    <>
      <Button onClick={handleClick} fullWidth size="large" color="inherit" variant="outlined">
        Google
        <Iconify icon="logos:google-icon" width={24} />
      </Button>
      <div style={{ display: 'none' }} id="buttonDiv" />;
    </>
  );
};

GoogleOneTap.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};
export default GoogleOneTap;
