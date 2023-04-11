import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

function EditableTableCell({ value, onChange }) {
  return (
    <TableCell>
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </TableCell>
  );
}

function AddTableRow({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAdd = () => {
    onAdd({ name, age });
    setName('');
    setAge('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Row</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <TextField
          label="Age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DataTable() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
    { id: 3, name: 'Bob Smith', age: 40 },
  ]);
  const [addRowOpen, setAddRowOpen] = useState(false);

  const handleCellChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleAddRow = (rowData) => {
    const newId = data.length + 1;
    const newData = { ...rowData, id: newId };
    setData([...data, newData]);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <EditableTableCell
              value={row.name}
              onChange={(value) => handleCellChange(row.id, 'name', value)}
            />
            <EditableTableCell
              value={row.age}
              onChange={(value) => handleCellChange(row.id, 'age', value)}
            />
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3}>
            <Button onClick={() => setAddRowOpen(true)}>Add New Row</Button>
            <AddTableRow
              open={addRowOpen}
              onClose={() => setAddRowOpen(false)}
              onAdd={handleAddRow}
              />
              </TableCell>
              </TableRow>
              </TableBody>
              </Table>
              );
              }
              
              export default DataTable;