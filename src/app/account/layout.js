'use client';

import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <MainLayout>
      <AuthGuard>{children}</AuthGuard>
    </MainLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
