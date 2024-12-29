import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

import Iconify from '../iconify/iconify';

const ButtonStyle = styled('button')({
  height: '40px',
  width: '280px',
  borderWidth: 0,
  background: 'white',
  color: '#737373',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  padding: '0px 10px',
  whiteSpace: 'nowrap',
  boxShadow: '1px 1px 0px 1px rgba(0,0,0,0.05)',
  border: '1px solid #dadce0',
  transitionProperty: 'background-color, box-shadow',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
  cursor: 'pointer',
  // padding: 0,

  '&:focus, &:hover': {
    boxShadow: '1px 4px 5px 1px rgba(0,0,0,0.1)',
  },

  '&:active': {
    backgroundColor: '#e5e5e5',
    boxShadow: 'none',
    transitionDuration: '10ms',
  },
});

const ButtonLogin = ({ icon, children, ...other }) => (
  <ButtonStyle {...other}>
    <Iconify icon={icon} width={18} />
    <Box
      sx={{
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '0 24px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#3c4043',
        fontFamily: '"Google Sans",arial,sans-serif',
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  </ButtonStyle>
);
ButtonLogin.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
};
export default ButtonLogin;
