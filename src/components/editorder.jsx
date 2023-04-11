import { useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function EditForm({ open, onClose, data, onSave }) {
  const [id, setId] = useState(data.id);
  const [productName, setProductName] = useState(data.productName);
  const [orderDate, setOrderDate] = useState(data.orderDate);
  const [shippingDate, setShippingDate] = useState(data.shippingDate);
  const [status, setStatus] = useState(data.status);
  const [remainingTime, setRemainingTime] = useState(data.remainingTime);
  const [customerName, setCustomerName] = useState(data.customerName);

  const handleSave = () => {
    onSave({ ...data, id, productName, orderDate, shippingDate, status,  remainingTime, customerName});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>編輯</DialogTitle>
      <DialogContent>
        <TextField label="訂單編號" value={id} onChange={(e) => setId(e.target.value)} />
        <TextField label="客戶名稱" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <TextField label="產品品名" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <TextField label="建單日期" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
        <TextField label="出貨日期" value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} />
        <TextField label="目前狀況" value={status} onChange={(e) => setStatus(e.target.value)} />
        <TextField label="剩餘天數" value={remainingTime} onChange={(e) => setRemainingTime(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSave}>儲存</Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditForm;
