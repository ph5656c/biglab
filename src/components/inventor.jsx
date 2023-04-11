import {
    Box, Container, Grid, Typography, CardMedia,
    CardContent, Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from '@mui/material';
import React, { useState } from 'react';

import Newinventor from './newinventor';

export default function GridCard() {
    const [cardData, setCardData] = useState([
        { productname: '產品a', productnumber: '001', stockquantity: '100', photo: 'test' },
        { productname: 'BBB', productnumber: '002', stockquantity: '500', photo: 'test' },
        { productname: 'CCC', productnumber: '003', stockquantity: '500', photo: 'test' },
        { productname: 'DDD', productnumber: '004', stockquantity: '500', photo: 'test' },
        { productname: 'EEE', productnumber: '005', stockquantity: '500', photo: 'test' },
        { productname: 'FFF', productnumber: '006', stockquantity: '500', photo: 'test' },
        { productname: 'GGG', productnumber: '007', stockquantity: '500', photo: 'test' },
        { productname: 'HHH', productnumber: '008', stockquantity: '500', photo: 'test' }]
    );

    //詳細資料
    const [open, setOpen] = useState(false);
    const [datas, setDatas] = useState(null);

    const handleClickOpen = (card) => {
        setDatas(card);
        setOpen(true);
    };

    const handleClose = () => {
        setDatas(null);
        setOpen(false);
    };

    const handleSave = () => {
        const updatedRows = cardData.map(row =>
            row.productnumber === datas.productnumber ? datas : row
        );
        setCardData(updatedRows);
        setOpen(false);

    }


    //搜索
    const [filter, setFilter] = useState({productname:''})
    const handleFilter = (event) =>{
        setFilter({...filter, [event.target.name]:event.target.value});
    }
    const filteredCard = cardData.filter((card) =>{
        const {productname} = filter;
        return(
            card.productname.toLowerCase().includes(productname.toLowerCase())
        );
    } )

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="productname"
                        label="產品名稱"
                        value={filter.productname}
                        onChange={handleFilter}
                    />
            </div>
            <Grid container spacing={3}>
                {filteredCard.map((card) => (
                    <Grid item xs={6} md={3} key={card.productnumber} onClick={() => handleClickOpen(card)}>
                        <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h6">
                                        {card.productname}
                                    </Typography>
                                    <Typography variant="產品編號" color="text.secondary" component="div" mt="20px">
                                        {card.productnumber}
                                    </Typography>
                                    <Typography variant="產品數量" color="text.secondary" component="div" mt="20px">
                                        數量:{card.stockquantity}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Button variant="contained" onClick={() => handleClickOpen(card)}>
                                        詳細資料
                                    </Button>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={card.photo}
                                alt="Prod"
                            />
                        </Card>
                    </Grid>
                ))}
                {datas && (
                    <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>庫存資訊</DialogTitle>
                        <DialogContent>
                            <TextField sx={{ mt: 3 }}
                                label="產品名稱"
                                value={datas.productname}
                                fullWidth

                                disabled
                            />
                            <TextField sx={{ mt: 5 }}
                                label="產品編號"
                                value={datas.productnumber}
                                fullWidth

                                disabled
                            />
                            <TextField sx={{ mt: 5 }}
                                label="數量"
                                value={datas.stockquantity}
                                fullWidth
                                onChange={(event) =>
                                    setDatas({
                                        ...datas,
                                        stockquantity: event.target.value,
                                    })}

                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>取消</Button>
                            <Button onClick={handleSave}>儲存</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Grid>
        </Container>
    );
}