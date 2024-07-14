import { useEffect } from 'react';
import PropTypes from 'prop-types';

const loadScript = (src) =>
  // eslint-disable-next-line consistent-return
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

const GoogleAuth = ({ callback }) => {
  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client';
    const id = '1002330755367-aure456vkajh93d9otp75toeon5lkvve.apps.googleusercontent.com';

    loadScript(src)
      .then(() => {
        /* global google */
        console.log(google);
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
          theme: 'outline',
          size: 'large',
          width: 280,
        });
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCredentialResponse(response) {
    console.log(`Encoded JWT ID token: ${response.credential}`);
    callback({ idToken: response.credential });
  }

  return <div id="buttonDiv" />;
};

export default GoogleAuth;
GoogleAuth.propTypes = {
  callback: PropTypes.func,
};
