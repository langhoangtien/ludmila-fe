import { Inter, Barlow } from 'next/font/google';

// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 14);
}

export function pxToRem(value) {
  return `${value / 14}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}
export const primaryFont = Inter({
  weight: ['500', '600', '700', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// export const primaryFont = Public_Sans({
//   weight: ['400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

export const secondaryFont = Barlow({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// ----------------------------------------------------------------------

// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontSecondaryFamily: secondaryFont.style.fontFamily,
  fontWeightRegular: 300,
  fontWeightMedium: 400,
  fontWeightSemiBold: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: pxToRem(32),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1.4,
    fontSize: pxToRem(20),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 500,
    lineHeight: 1.4,
    fontSize: pxToRem(18),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 500,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 400,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'none',
  },
};
