import  React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [newdatas, setNewDatas] = useState({
        productname: '', 
        productnumber: '', 
        stockquantity: '', 
        photo: ''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                新增庫存資料
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增庫存資料</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {newdatas.productname}
                    </DialogContentText>
                    <TextField
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}