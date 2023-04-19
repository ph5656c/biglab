import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Product() {
    const [opennew, setopennew] = useState(false);

    const handleOpennew = () => {
        setopennew(true);
    }

    const handleClosenew = () => {
        setopennew(false);
    }

    // const handleSubmitnew = async (values, { setSubmitting }) => {
    //     const { productphoto, ...rest } = values;

    //     // 將 image 值轉換為 File 物件
    //     const file = new File([productphoto], productphoto.name, { type: productphoto.type });

    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = async () => {
    //         // 獲取讀取的數據 URL
    //         const dataUrl = reader.result;
    //         // 移除開頭的 "data:image/png;base64," 部分，得到實際的 Base64 編碼字符串
    //         const base64EncodedImage = dataUrl.split(",")[1];
    //         try {
    //             // 將 Base64 編碼的圖片作為參數傳遞到 POST 請求中
    //             await axios.post("http://127.0.0.1:3702/product", {
    //                 productname: rest.productname,
    //                 productphoto: base64EncodedImage,
    //             });
    //             console.log({productphoto: base64EncodedImage})
    //             console.log("新增成功");
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setSubmitting(false);
    //         }
    //         handleClosenew();
    //     };
    // };

    const handleSubmitnew = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('productname', values.productname);
        formData.append('productphoto', values.productphoto);
        axios.post('http://127.0.0.1:3702/product/create', formData).then((response) => {
            console.log(response.data);
            });
            setSubmitting(false);
            handleClosenew();
            };





    return (
        <Box>
            <Button variant='contained' color='primary' onClick={handleOpennew}>
                新增產品資料
            </Button>
            <Dialog open={opennew} onClose={handleClosenew}
                maxWidth='lg'
                sx={{ '& .MuiTextField-root': { m: 1, mt: 2 }, }}>
                <DialogTitle>新增產品資料</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            
                            productname: '',
                            productphoto: ''
                        }}
                        validationSchema={Yup.object({
                            
                            productname: Yup.string().required('必填'),
                            productphoto: Yup.mixed().required('必須選擇一個圖片'),
                        })}
                        onSubmit={handleSubmitnew}
                    >
                        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
                            <Box component={Form} onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                          
                                         InputLabelProps={{
                                            style:{ fontSize: 16 }
                                        }}
                                            id="productname"
                                            name="productname"
                                            label="產品名稱"
                                            fullWidth
                                            value={values.productname}
                                            onChange={handleChange}
                                            error={touched.productname && Boolean(errors.productname)}
                                            helperText={touched.productname && errors.productname}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <input
                                            id="productphoto"
                                            name="productphoto"
                                            label="產品照片"
                                            type='file'
                                            
                                            onChange={(event) => {
                                                setFieldValue('productphoto', event.currentTarget.files[0]);
                                            }}
                                            error={touched.productphoto && Boolean(errors.productphoto)}
                                            helperText={touched.productphoto && errors.productphoto}
                                        />
                                        {values.productphoto && (
                                            <div>
                                                <img src={URL.createObjectURL(values.productphoto)} alt="proudct" />
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Button onClick={handleClosenew} color="primary">取消</Button>
                                    <Button type="submit">儲存</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box >
    )
}