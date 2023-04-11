import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//編輯表單
function EditableTableCell({ value, onChange }) {
    return (
        <TableCell>
            <TextField
                fullWidth
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </TableCell>
    );
}
//增加一列
function AddTableRow({ onAdd }) {
    const [productitems, setProductitems] = useState('');
    const [productname, setProductname] = useState('');
    const [spec, setSpec] = useState('');
    const [quty, setQuty] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');

    const handleAdd = () => {
        onAdd({ productitems, productname, spec, quty, price, total });
        setProductitems('');
        setProductname('');
        setSpec('');
        setQuty('');
        setPrice('');
        setTotal('');

    };

    return (
        <Button onClick={handleAdd} color="primary">
            新增
        </Button>
    );
}



export default function NewOrder() {
    const [open, setopen] = useState(false);

    const [formData, setformData] = useState({
        ordernumber: '',
        createdate: '',
        modifieddate: '',
        deliverydate: '',
        customername: '',
        customerphone: '',
        customeraddress: '',
        customeremail: '',
    })

    const handleClickOpen = () => {
        setopen(true);
    };

    const handleClose = () => {
        setformData({});
        settableData([{ productitems: 1, productname: '', spec: '', quty: '', price: '', total: '' }]);
        setopen(false);
    };
    //form 資料
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setformData({ ...formData, [name]: value })
    }

    //table 
    const [tableData, settableData] = useState([
        { productitems: 1, productname: '', spec: '', quty: '', price: '', total: '' },

    ]);



    const handleCellChange = (productitems, field, value) => {
        settableData((prevData) =>
            prevData.map((row) =>
                row.productitems === productitems ? { ...row, [field]: value } : row
            )
        );
    };

    const handleAddRow = (rowData) => {
        const newId = tableData.length + 1;
        const newData = { ...rowData, productitems: newId };
        settableData([...tableData, newData]);
    };


    //onClick sumbit 發送資料
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // TODO: 使用axios将formData发送到后端API
        console.log(tableData);
        handleClose();
    };



    return (
        <div>
            <div style={{ display:'flex' ,justifyContent:'right'}}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                新增訂單
            </Button>
            </div>
            <Box component="form">
                <Dialog open={open}
                    onClose={handleClose}
                    sx={{ '& .MuiTextField-root': { m: 1, mt: 2 }, }}
                    maxWidth='lg'
                >
                    <DialogTitle>新增/修改訂單</DialogTitle>
                    <DialogContent>
                        <Box onSubmit={handleSubmit} >
                            <FormControl fullWidth>
                                <Grid container spacing={2}>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">

                                        <TextField
                                            label="訂單編號:"
                                            name="ordernumber"
                                            fullWidth
                                            value={formData.ordernumber}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="建單日期:"
                                            name="createdate"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={formData.createdate}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl fullWidth>
                                <Grid container spacing={2}>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="客戶名稱:"
                                            name="customername"
                                            fullWidth
                                            value={formData.customername}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="交貨日期:"
                                            name="deliverydate"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={formData.deliverydate}
                                            onChange={handleInputChange}>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl fullWidth>
                                <Grid container spacing={2}>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="客戶電話:"
                                            name="customerphone"
                                            fullWidth
                                            value={formData.customerphone}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                        <TextField
                                            label="客戶e-mail:"
                                            name="customeremail"
                                            type="e-mail"
                                            fullWidth
                                            value={formData.customeremail}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl fullWidth>
                                <Grid container spacing={2}>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center" fullWidth>
                                        <TextField
                                            label="客戶地址:"
                                            name="customeraddress"
                                            fullWidth
                                            value={formData.customeraddress}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">產品品名</TableCell>
                                        <TableCell align="center">規格</TableCell>
                                        <TableCell align="center" sx={{ width: "100px" }}>數量</TableCell>
                                        <TableCell align="center" sx={{ width: "100px" }}>單價</TableCell>
                                        <TableCell align="center" sx={{ width: "100px" }}>總額</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row) => (
                                        <TableRow key={row.productitems}>

                                            <EditableTableCell
                                                value={row.productname}
                                                onChange={(value) => handleCellChange(row.productitems, 'productname', value)}
                                            />
                                            <EditableTableCell
                                                value={row.spec}
                                                onChange={(value) => handleCellChange(row.productitems, 'spec', value)}
                                            />
                                            <EditableTableCell
                                                value={row.quty}
                                                onChange={(value) => handleCellChange(row.productitems, 'quty', value)}
                                            />
                                            <EditableTableCell
                                                value={row.price}
                                                onChange={(value) => handleCellChange(row.productitems, 'price', value)}
                                            />
                                            <EditableTableCell
                                                value={row.total}
                                                onChange={(value) => handleCellChange(row.productitems, 'total', value)}
                                            />
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <AddTableRow
                                                onAdd={handleAddRow}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">取消</Button>
                        <Button onClick={handleSubmit} color="primary">儲存</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div >
    )
}
