import PropTypes from 'prop-types';

import Header from './header';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
