/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';

import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import { LocalizationProvider } from 'src/locales';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { AuthProvider } from 'src/auth/context/jwt';
import { CartProvider } from 'src/components/cart';
import { SnackbarProvider } from 'src/components/snackbar';

// ----------------------------------------------------------------------

import { GOOGLE_CLIENT_ID } from 'src/config-global';

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Ludmila - Hàng chính hãng từ Nga',
  description:
    'Ludmila - Hàng chính hãng từ Nga. Chuyên cung cấp các sản phẩm chăm sóc da, mỹ phẩm, thực phẩm chức năng từ Nga.',
  keywords: 'Nga, Ludmila, mỹ phẩm, thực phẩm chức năng, chăm sóc da, hàng chính hãng',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
      <meta name="google-signin-client_id" content={GOOGLE_CLIENT_ID} />
      <meta name="google-site-verification" content="dBh_OXHizr7KzdTrU7Wt0qNMuslfaF4V59M2XsM6LDA" />

      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeColorPresets: 'default', // 'default' | 'preset01' | 'preset02' | 'preset03' | 'preset04' | 'preset05'
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <ProgressBar />
                    <SettingsDrawer />
                    <CartProvider>{children}</CartProvider>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
