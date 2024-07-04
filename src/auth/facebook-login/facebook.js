import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { FACEBOOK_APP_ID } from 'src/config-global';

import Iconify from 'src/components/iconify';

const getIsMobile = () => {
  let isMobile = false;
  try {
    isMobile = !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match('CriOS') ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // continue regardless of error
  }
  return isMobile;
};

const FacebookLogin = ({
  isDisabled = false,
  callback,
  appId,
  xfbml = true,
  cookie = false,
  authType = '',
  scope = 'public_profile,email',
  state = 'facebookdirect',
  responseType = 'code',
  returnScopes = false,
  redirectUri = typeof window !== 'undefined' ? window.location.href : '/',
  autoLoad = false,
  disableMobileRedirect = false,
  isMobile = getIsMobile(),
  fields = 'name',
  version = '20.0',
  language = 'en_US',
  onClick,
  onFailure,
  render,
}) => {
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
    window.fbAsyncInit = function () {
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
      js.src = `https://connect.facebook.net/${language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const submitLogin = (event) => {
    event.preventDefault();
    window.FB.getLoginStatus((response) => {
      if (response.status !== 'connected') {
        return window.FB.login(
          (res) => {
            if (res.status === 'not_authorized') {
              return;
            }
            const { accessToken } = res.authResponse;
            callback(accessToken);
          },
          { scope: 'public_profile,email' }
        );
      }
      const { accessToken } = response.authResponse;
      callback(accessToken);
    });
  };

  return (
    <Button onClick={submitLogin} fullWidth size="large" color="inherit" variant="outlined">
      <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
    </Button>
  );
};

FacebookLogin.propTypes = {
  isDisabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  appId: PropTypes.string.isRequired,
  xfbml: PropTypes.bool,
  cookie: PropTypes.bool,
  authType: PropTypes.string,
  scope: PropTypes.string,
  state: PropTypes.string,
  responseType: PropTypes.string,
  returnScopes: PropTypes.bool,
  redirectUri: PropTypes.string,
  autoLoad: PropTypes.bool,
  disableMobileRedirect: PropTypes.bool,
  isMobile: PropTypes.bool,
  fields: PropTypes.string,
  version: PropTypes.string,
  language: PropTypes.string,
  onClick: PropTypes.func,
  onFailure: PropTypes.func,
  render: PropTypes.func.isRequired,
};

export default FacebookLogin;
