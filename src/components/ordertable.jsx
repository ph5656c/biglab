import React, { useState ,useEffect } from 'react';

import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';



function getDaysDiff(date1, date2) {
    const timeDiff = date2.getTime() - date1.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

const OrdersTable = () => {
    const [orders, setOrders] = useState([
    ]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3702/order')
            .then(response => {
                setOrders(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [filter, setFilter] = useState({
        orderid: '',
        orderdate: '',
        customername: '',
    });

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const filteredOrders = orders.filter((order) => {
        const { orderid, orderdate, customername } = filter;
        return (
            order.orderid?.toString().includes(orderid) &&
            order.orderdate?.includes(orderdate) &&
            order.customername?.toLowerCase().includes(customername.toLowerCase())
        );
    });

    //edit
    const [clickOpen, setclickOpen] = useState(false);
    const [orderdata, setOrderData] = useState(null);

    const handleRowClick = (order) => {
        setOrderData(order);
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
        console.log(orderdata);
        console.log(orders);
        const updatedRows = orders.map(row =>
            row.id === orderdata.id ? orderdata : row
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
                        name="orderid"
                        label="訂單編號"
                        value={filter.orderid}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="orderdate"
                        label="建單日期"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filter.orderdate}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="customername"
                        label="客戶名稱"
                        value={filter.customername}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ textAlign: 'center' }}>訂單編號</TableCell>
                        <TableCell>客戶名稱</TableCell>
                        {/* <TableCell>產品品名</TableCell> */}
                        <TableCell>建單日期</TableCell>
                        <TableCell>出貨日期</TableCell>
                        <TableCell>目前狀況</TableCell>
                        <TableCell>剩餘天數</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.orderid}>
                            <TableCell>{order.orderid}</TableCell>
                            <TableCell>{order.customername}</TableCell>
                            {/* <TableCell>{order.productName}</TableCell> */}
                            <TableCell>{order.orderdate}</TableCell>
                            <TableCell>{order.deliverydate}</TableCell>
                            <TableCell>{order.orderstate}</TableCell>
                            <TableCell>{getDaysDiff(new Date(), new Date(order.deliverydate))}天</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleRowClick(order)}>
                                    編輯
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* 編輯資料 */}
            {orderdata && (
                <Dialog open={clickOpen} onClose={handleClose} sx={{ '& .MuiTextField-root': { mt: 2 }, }}
                    maxWidth='lg'
                >
                    <DialogTitle>編輯訂單</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="訂單編號"
                            value={orderdata.orderid}
                            fullWidth
                            disabled
                        />
                        {/* <TextField
                            label="產品名稱"
                            value={orderdata.productName}
                            fullWidth
                            disabled
                        /> */}
                        <TextField
                            label="建單日期"
                            type="date"
                            value={orderdata.orderdate}
                            fullWidth
                            disabled
                        />
                        <TextField
                            label="出貨日期"
                            type="date"
                            value={orderdata.deliverydate}
                            fullWidth
                            onChange={(event) =>
                                setOrderData({
                                    ...orderdata,
                                    deliverydate: event.target.value,
                                })
                            }
                        />
                        <TextField
                            label="目前狀況"
                            value={orderdata.orderstate}
                            fullWidth
                            onChange={(event) =>
                                setOrderData({
                                    ...orderdata,
                                    orderstate: event.target.value,
                                })
                            }
                        />
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">取消</Button>
                            <Button variant="contained" onClick={handleSaveClick}>
                                儲存
                            </Button>
                        </DialogActions>
                    </DialogContent>

                </Dialog>
            )}

        </TableContainer>
    );
};

export default OrdersTable;
