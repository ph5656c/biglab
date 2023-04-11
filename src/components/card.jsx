import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, Container, Grid, grid2Classes } from '@mui/material';
import Newinventor from './newinventor';
export default function MediaControlCard() {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        產品名稱
                    </Typography>
                    <Typography variant="產品編號" color="text.secondary" component="div" mt="20px">
                        產品編號
                    </Typography>
                    <Typography variant="產品數量" color="text.secondary" component="div" mt="20px">
                        庫存數量
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Newinventor />
                    
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="/static/images/cards/cat.jpg"
                alt="Prod"
            />
        </Card>
    );
}