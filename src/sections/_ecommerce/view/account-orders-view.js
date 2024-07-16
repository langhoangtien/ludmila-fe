'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { endpoints } from 'src/utils/fetch';

import { _productsTable } from 'src/_mock';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';

import EcommerceAccountOrdersTableRow from '../account/ecommerce-account-orders-table-row';
import EcommerceAccountOrdersTableHead from '../account/ecommerce-account-orders-table-head';

// ----------------------------------------------------------------------

const TABS = [{ value: 'all', label: 'Tất cả' },{value:'completed',label: 'Hoàn thành'},
   {value:'shipping',label:'Đang vận chuyển'}, {value:'cancelled',label:'Đã hủy'}];

export const TABLE_HEAD = [

  { id: 'products', label: 'Sản phẩm' },
  { id: 'totalPrice', label: 'Giá trị', width: 100 },
  { id: 'createdAt', label: 'Ngày đặt hàng', width: 160 },
  { id: 'deliveryAt', label: 'Ngày nhận hàng', width: 160 },
  { id: 'status', label: 'Trạng thái', width: 100 },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {
  const [tabStatus, setTabStatus] = useState({ value: 'all', label: 'Tất cả' });

  const [order, setOrder] = useState('asc');
  const [orders, setOrders] = useState([]);

  const [orderBy, setOrderBy] = useState('createdAt');

  const [page, setPage] = useState(0);

  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeTab = useCallback((event, value) => {
    const newValue = TABS.find((tab) => tab.value === value);
    setTabStatus(newValue);
  }, []);

  const handleSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );


  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeDense = useCallback((event) => {
    setDense(event.target.checked);
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - _productsTable.length) : 0;

  const getOrders =async () => {
   try {
     const response = await fetch(endpoints.order.me,{
      headers:{
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        method: 'GET'
      }
     });
     const data = await response.json();
     setOrders(data.items);
   }catch(error){
     console.log(error);
   }
  }

  useEffect(() => {
    getOrders()
  }, []);
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Đơn hàng
      </Typography>

      <Tabs
        value={tabStatus.value}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {TABS.map((tab) => (
          <Tab    key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}    icon={
            <Label
              variant={
                ((tab.value === 'all' || tab.value === tabStatus.value) && 'filled') || 'soft'
              }
              color={
                (tab.value === 'completed' && 'success') ||
                (tab.value === 'shipping' && 'warning') ||
                (tab.value === 'cancelled' && 'error') ||
                'default'
              }
            >
             30
            </Label>
          }   />
        ))}
      </Tabs>

 

      <TableContainer
        sx={{
          overflow: 'unset',
          [`& .${tableCellClasses.head}`]: {
            color: 'text.primary',
          },
          [`& .${tableCellClasses.root}`]: {
            bgcolor: 'background.default',
            borderBottomColor: (theme) => theme.palette.divider,
          },
        }}
      >
     

        <Scrollbar>
          <Table
            sx={{
              minWidth: 720,
            }}
            size={dense ? 'small' : 'medium'}
          >
            <EcommerceAccountOrdersTableHead
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
              headCells={TABLE_HEAD}
      
              
            
            />

            <TableBody>
              {orders.map((row) => (
                  <EcommerceAccountOrdersTableRow
                    key={row.id}
                    row={row}
                  
                 
                  />
                ))}

              {emptyRows > 0 && (
                <TableRow
                  sx={{
                    height: (dense ? 36 : 57) * emptyRows,
                  }}
                >
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          page={page}
          component="div"
          count={_productsTable.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        />
      </Box>
    </>
  );
}
