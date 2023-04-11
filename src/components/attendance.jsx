import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
const Attenddance = () => {

    const [attdata, setAttData] = useState([
        { name: '1', namenumber: '478', starttime: '2023-03-01T08:00', endtime: '2023-03-01T17:00', holiday: '' },
        { name: '2', namenumber: '235', starttime: '2023-04-01T08:00', endtime: '2023-04-01T17:00', holiday: '病假' },
        { name: '3', namenumber: '489', starttime: '2023-03-15T08:00', endtime: '2023-03-15T17:00', holiday: '事假' },
    ]);

    const [filter, setFilter] = useState({
        name: '',
        starttime: '',
        holiday: ''
    });

    const filteredAtt = attdata.filter((att) => {
        const { name, starttime, holiday } = filter;
        return (
            att.name.toLowerCase().includes(name.toLowerCase()) &&
            att.starttime.includes(starttime) &&
            att.holiday.toLowerCase().includes(holiday.toLowerCase())
        )
    })

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    //修改
    const [clickOpen, setclickOpen] = useState(false);
    const [chattdata, setChattData] = useState(null);

    const handleClick = (att) => {
        setChattData(att);
        setclickOpen(true);
    }

    const handleClose = () => {
        setclickOpen(false);
    }

    const handleSaveClick = () => {
        // 在這裡將修改後的數據保存到資料庫
        // 然後更新狀態以刷新表格
        const updatedRows = attdata.map(row =>
            row.name === chattdata.name ? chattdata : row
        );
        setAttData(updatedRows);
        setclickOpen(false);
    };

    //get 資料
    useEffect(() => {
        axios.get('http://127.0.0.1:3702/attdance')
          .then(response => {
            setAttData(response.data)
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);


    return (
        <TableContainer>
            <div>
                <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="Employee Name"
                        label="員工姓名"
                        value={filter.name}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="starttime"
                        label="開始日期"
                        type="month"
                        InputLabelProps={{ shrink: true }}
                        value={filter.starttime}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="holiday"
                        label="假別"
                        value={filter.holiday}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ textAlign: 'center' }}>員工編號</TableCell>
                        <TableCell>員工姓名</TableCell>
                        <TableCell>開始日期</TableCell>
                        <TableCell>結束日期</TableCell>
                        <TableCell>假別</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAtt.map((att) => (
                        <TableRow key={att.name} onClick={() => handleClick(att)}>
                            <TableCell name={'Employee Name'}>{att.namenumber}</TableCell>
                            <TableCell name={'Employee Name'}>{att.name}</TableCell>
                            <TableCell name={'starttime'}>{att.starttime}</TableCell>
                            <TableCell name={'endtime'}>{att.endtime}</TableCell>
                            <TableCell name={'holiday'}>{att.holiday}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleClick(att)}>
                                    修改
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {chattdata && (
                <Dialog open={clickOpen} onClose={handleClose}>
                    <DialogTitle>修改資料</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="員工姓名"
                            value={chattdata.name}
                            fullWidth
                            disabled
                        />

                        <TextField
                            label="開始日期"
                            type="datetime-local"
                            value={chattdata.starttime}
                            fullWidth
                            onChange={(event) =>
                                setChattData({
                                    ...chattdata,
                                    starttime: event.target.value,
                                })
                            }
                            
                        />
                        <TextField
                            label="結束日期"
                            type="datetime-local"
                            value={chattdata.endtime}
                            fullWidth
                            onChange={(event) =>
                                setChattData({
                                    ...chattdata,
                                    endtime: event.target.value,
                                })
                            }
                            
                        />
                        <TextField
                            label="假別"
                            value={chattdata.holiday}
                            fullWidth
                            onChange={(event) =>
                                setChattData({
                                    ...chattdata,
                                    holiday: event.target.value,
                                })
                            }
                        />
                        <Button variant="contained" onClick={handleSaveClick}>
                            儲存
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </TableContainer>

    );
}
export default Attenddance;