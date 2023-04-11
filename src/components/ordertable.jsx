import React, { useState } from 'react';

import { Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';




function getDaysDiff(date1, date2) {
    const timeDiff = date2.getTime() - date1.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

const OrdersTable = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            productName: 'Product A',
            orderDate: '2022-03-01',
            shippingDate: '2022-03-05',
            status: 'Processing',
            remainingTime: '3 days',
            customerName: 'Customer A',
        },
        {
            id: 2,
            productName: 'Product B',
            orderDate: '2022-03-02',
            shippingDate: '2022-03-06',
            status: 'Shipped',
            remainingTime: '0 days',
            customerName: 'Customer B',
        },
        {
            id: 3,
            productName: 'Product C',
            orderDate: '2022-03-03',
            shippingDate: '2022-03-08',
            status: 'Delivered',
            remainingTime: '',
            customerName: 'Customer C',
        },
    ]);

    const [filter, setFilter] = useState({
        orderId: '',
        orderDate: '',
        customerName: '',
    });

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const filteredOrders = orders.filter((order) => {
        const { orderId, orderDate, customerName } = filter;
        return (
            order.id.toString().includes(orderId) &&
            order.orderDate.includes(orderDate) &&
            order.customerName.toLowerCase().includes(customerName.toLowerCase())
        );
    });

    //edit
    const [clickOpen, setclickOpen] = useState(false);
    const [orderdate, setOrderDate] = useState(null);

    const handleRowClick = (order) => {
        setOrderDate(order);
        setclickOpen(true);
    };

    const handleClose = () => {
        
        setclickOpen(false);
    };

    // const handleDialogSave = () => {
    //     // Do something with the updated data
    //     const updatedRows = orders.map(row =>
    //         row.id === orderdate.id ? orderdate : row
    //       );
    //       setOrders(updatedRows);
    //     setclickOpen(false);
        
    // };

    const handleSaveClick = () => {
        // 在這裡將修改後的數據保存到資料庫
        // 然後更新狀態以刷新表格
        console.log(orderdate);
        console.log(orders);
        const updatedRows = orders.map(row =>
                     row.id === orderdate.id ? orderdate : row
                   );
        setOrders(updatedRows);
        setclickOpen(false);
      };
    
    // const handleCellChange = (event) => {
    //     const { name, value } = event.target;
    //     setOrderDate({ ...orderdate, [name]: value });
    // };


    return (
        <TableContainer>
            <div>
                <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="orderId"
                        label="訂單編號"
                        value={filter.orderId}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="orderDate"
                        label="建單日期"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filter.orderDate}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="customerName"
                        label="客戶名稱"
                        value={filter.customerName}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ textAlign: 'center' }}>訂單編號</TableCell>
                        <TableCell>客戶名稱</TableCell>
                        <TableCell>產品品名</TableCell>
                        <TableCell>建單日期</TableCell>
                        <TableCell>出貨日期</TableCell>
                        <TableCell>目前狀況</TableCell>
                        <TableCell>剩餘天數</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id} onClick={() => handleRowClick(order)}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>{order.productName}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.shippingDate}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{getDaysDiff(new Date(), new Date(order.shippingDate))}天</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleRowClick(order)}>
                                    編輯
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {orderdate && (
        <Dialog open={clickOpen} onClose={handleClose}>
          <DialogTitle>編輯訂單</DialogTitle>
          <DialogContent>
            <TextField
              label="訂單編號"
              value={orderdate.id}
              fullWidth
              disabled
            />
            <TextField
              label="產品名稱"
              value={orderdate.productName}
              fullWidth
              disabled
            />
            <TextField
              label="建單日期"
              type="date"
              value={orderdate.orderDate}
              fullWidth
              disabled
            />
            <TextField
              label="出貨日期"
              type="date"
              value={orderdate.shippingDate}
              fullWidth
              onChange={(event) =>
                setOrderDate({
              ...orderdate,
              shippingDate: event.target.value,
              })
              }
              />
              <TextField
              label="目前狀況"
              value={orderdate.status}
              fullWidth
              onChange={(event) =>
                setOrderDate({
              ...orderdate,
              status: event.target.value,
              })
              }
              />
              <Button variant="contained" onClick={handleSaveClick}>
              儲存
              </Button>
              </DialogContent>
              </Dialog>
              )}
            
        </TableContainer>
    );
};

export default OrdersTable;
