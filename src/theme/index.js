'use client';

import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useSettingsContext } from 'src/components/settings';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import RTL from './options/right-to-left';
import { customShadows } from './custom-shadows';
import { createPresets } from './options/presets';
import { componentsOverrides } from './overrides';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const settings = useSettingsContext();

  const presets = createPresets(settings.themeColorPresets);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(settings.themeMode),
        ...presets.palette,
      },
      customShadows: {
        ...customShadows(settings.themeMode),
        ...presets.customShadows,
      },
      direction: settings.themeDirection,
      shadows: shadows(settings.themeMode),
      shape: { borderRadius: 6 },
      typography,
    }),
    [settings.themeMode, settings.themeDirection, presets.palette, presets.customShadows]
  );

  const theme = createTheme(memoizedValue);

  theme.components = componentsOverrides(theme);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={settings.themeDirection}>
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
