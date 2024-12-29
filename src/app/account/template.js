'use client';

import PropTypes from 'prop-types';

import { Card, CardContent } from '@mui/material';

import AccountLayout from 'src/layouts/account';

// ----------------------------------------------------------------------

export default function Template({ children }) {
  return (
    <AccountLayout>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </AccountLayout>
  );
}

Template.propTypes = {
  children: PropTypes.node,
};
