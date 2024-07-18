import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Iconify from '../iconify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomDialogs({ open, onClose, title, children }) {
  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 1, p: 1 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Iconify icon="carbon:close" />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
CustomDialogs.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};
