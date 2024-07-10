import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { FACEBOOK_APP_ID } from 'src/config-global';

import Iconify from 'src/components/iconify';

const FacebookLogin = ({ callback }) => {
  useEffect(() => {
    const fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      const newFbRoot = document.createElement('div');
      newFbRoot.id = 'fb-root';
      document.body.appendChild(newFbRoot);
    }

    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    setFbAsyncInit();
    loadSdkAsynchronously();
  }, []);

  const setFbAsyncInit = () => {
    window.fbAsyncInit = function fbAsyncInit() {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });
      window.FB.AppEvents.logPageView();
    };
  };

  const loadSdkAsynchronously = () => {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const submitLogin = (event) => {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response) => {
        if (response.status !== 'connected') {
          window.FB.login(
            (res) => {
              if (res.status === 'not_authorized') {
                reject(new Error('User not authorized'));
                return;
              }
              const { accessToken } = res.authResponse;
              resolve(accessToken);
            },
            { scope: 'public_profile,email' }
          );
        } else {
          const { accessToken } = response.authResponse;
          resolve(accessToken);
        }
      });
    })
      .then((accessToken) => {
        // Gọi đến callback với accessToken
        callback({ accessToken });
      })
      .catch((error) => {
        console.error('Error logging in with Facebook:', error);
        // Xử lý lỗi nếu cần
      });
  };

  return (
    <Button onClick={submitLogin} fullWidth size="large" color="inherit" variant="outlined">
      <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
    </Button>
  );
};

FacebookLogin.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default FacebookLogin;
