import React, { Component } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from './table.jsx';
import Ordertable from './ordertable.jsx';
import Pie from './pie';
import Neworder from './neworder';
import TextField from '@mui/material/TextField';
import Testtable from './testtable';
import Button from '@mui/material/Button';
import Neworder2 from './neworder2.jsx';
class Order extends Component {
    state = {}
    render() {

        return (
            <React.Fragment>
                <Container>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <div>訂單總覽</div>
                        </Grid>
                        <Grid xs={6} height="250px">
                            <div>訂單分布</div>
                            <Pie />
                        </Grid>
                        <Grid xs={6} height="250px">
                            <div>產品分布</div>
                            <Pie />
                        </Grid>
                        <Grid xs={12}>
                            <Neworder />
                            <Neworder2 />
                        </Grid>
                        <Grid xs={12}>
                            <Ordertable />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default Order;