import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, FormControl, Grid,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
const initialValues = {
    ordernumber: '',
    createdate: '',
    modifieddate: '',
    deliverydate: '',
    customername: '',
    customerphone: '',
    customeraddress: '',
    customeremail: '',
    products: [{ productname: '', spec: '', quty: '', price: '' }],
};
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
    // const [productname, setProductname] = useState('');
    // const [spec, setSpec] = useState('');
    // const [quty, setQuty] = useState('');
    // const [price, setPrice] = useState('');


    // const handleAdd = () => {
    //     onAdd({ productname, spec, quty, price });
    //     setProductname('');
    //     setSpec('');
    //     setQuty('');
    //     setPrice('');
    // };

    return (
        <FieldArray name="products">
            {({ push }) => (
                <Button onClick={() => push({ productname: '', spec: '', quty: '', price: '' })} color="primary">
                    新增
                </Button>)}
        </FieldArray>
    );
}



export default function NewOrder() {
    const [open, setopen] = useState(false);

    // const [formData, setformData] = useState({
    //     ordernumber: '',
    //     createdate: '',
    //     modifieddate: '',
    //     deliverydate: '',
    //     customername: '',
    //     customerphone: '',
    //     customeraddress: '',
    //     customeremail: '',
    // })

    const handleClickOpen = () => {
        setopen(true);
    };

    const handleClose = () => {
        // setformData({});
        settableData([{ productname: '', spec: '', quty: '', price: '' }]);
        setopen(false);
    };
    //form 資料
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setformData({ ...formData, [name]: value })
    // }

    //table 
    const [tableData, settableData] = useState(initialValues.products);



    const handleCellChange = (productname, field, value) => {
        settableData((prevData) =>
            prevData.map((row) =>
                row.productname === productname ? { ...row, [field]: value } : row
            )
        );
    };



    const handleAddRow = () => {
        settableData([...tableData, { productname: '', spec: '', quty: '', price: '' }]);
    };


    //onClick sumbit 發送資料
    const handleSubmit = (values) => {
        // TODO: 使用axios将formData发送到后端API
        console.log(values);
        settableData([]);
        handleClose();
    };






    const validationSchema = Yup.object().shape({
        ordernumber: Yup.string().required('必填'),
        createdate: Yup.string().required('必填'),
        deliverydate: Yup.string().required('必填'),
        customername: Yup.string().required('必填'),
        products: Yup.array().of(
            Yup.object().shape({
                productname: Yup.string().required('必填'),
                spec: Yup.string().required('必填'),
                quty: Yup.number().required('必填'),
                price: Yup.number().required('必填'),
            }),
        ),
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    新增訂單
                </Button>
            </div>
            <Box component="form">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
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
                                                        value={values.ordernumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.ordernumber && Boolean(errors.ordernumber)}
                                                        helperText={touched.ordernumber && errors.ordernumber}
                                                    />
                                                </Grid>
                                                <Grid xs display="flex" justifyContent="center" alignItems="center">
                                                    <TextField
                                                        label="建單日期:"
                                                        name="createdate"
                                                        type="date"
                                                        fullWidth
                                                        InputLabelProps={{ shrink: true }}
                                                        value={values.createdate}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.createdate && Boolean(errors.createdate)}
                                                        helperText={touched.createdate && errors.createdate}
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
                                                        value={values.customername}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.customername && Boolean(errors.customername)}
                                                        helperText={touched.customername && errors.customername}
                                                    />
                                                </Grid>
                                                <Grid xs display="flex" justifyContent="center" alignItems="center">
                                                    <TextField
                                                        label="交貨日期:"
                                                        name="deliverydate"
                                                        type="date"
                                                        fullWidth
                                                        InputLabelProps={{ shrink: true }}
                                                        value={values.deliverydate}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.customername && Boolean(errors.customername)}
                                                        helperText={touched.customername && errors.customername}
                                                    />
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
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tableData.map((row) => (
                                                    <TableRow key={row.productname}>
                                                        <TableCell>
                                                            <TextField
                                                                name="productname"
                                                                value={row.productname}
                                                                onChange={(value) => handleCellChange(row.productitems, 'productname', value)}
                                                                error={touched.productname && !!errors.productname}
                                                                helperText={touched.productname && errors.productname}
                                                            />
                                                        </TableCell>
                                                        {/* <EditableTableCell
                                                            value={row.productname}
                                                            onChange={handleChange}
                                                        />
                                                        <EditableTableCell
                                                            value={row.spec}
                                                            onChange={handleChange}
                                                        />
                                                        <EditableTableCell
                                                            value={row.quty}
                                                            onChange={handleChange}
                                                        />
                                                        <EditableTableCell
                                                            value={row.price}
                                                            onChange={handleChange}
                                                        /> */}
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={5}>
                                                        <Button onClick={handleAddRow} color="primary">
                                                            新增
                                                        </Button>
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
                        </Form>
                    )}
                </Formik>
            </Box>
        </div >
    )
}
