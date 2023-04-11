import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import './style.css';
import { styled } from '@mui/material';

function Attdatetime() {
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);

    const [events, setEvents] = useState([{
        title: '病假',
        start: '2023-03-27',
    },
    {
        title: '打卡',
        start: '2023-03-28T17:10:20',
        allDay: false,
    },
    {
        title: '打卡',
        start: '2023-03-28T07:59:20',
        allDay: true,
    },
    ]);

    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setYear(now.getFullYear());
            setMonth(now.getMonth() + 1);
            setDay(now.getDate());
            setTime(now.toLocaleTimeString());
        }, 1000);
    }, []);

    const handleDateSelect = () => {
        const date = new Date();
        const title = '打卡';
        const eventData = {
            title,
            start: date.toISOString(),
            allDay: false,
        };
        setEvents([...events, eventData]);
        console.log(events);
        // 將 eventData 回傳資料庫
    };


    return (
        <div>
            <div style={{ width: '100%', height: '100%', 'text-align': 'center' }}>
                <div style={{ 'text-align': 'center', 'font-size': '25px', 'color': '#fff', 'font-weight': '700', 'margin': '10px', 'background-color': '#000', }}>
                    <span>{year}年</span>
                    <span>{month}月</span>
                    <span>{day}日</span><br />
                    <span >{time}</span>
                    <button type="submit" onClick={handleDateSelect}
                        style={{ 'font-size': '25px', color: '#fff', 'font-weight': 700, margin: '10px', 'background-color': 'orange' }}
                    >打卡</button>
                </div>
            </div>


            <div className="container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="zh-tw"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek',
                    }}

                    buttonText={{
                        prev: '上個月',
                        next: '下個月',
                        today: '今天',
                        month: '月',
                        week: '週',
                    }}
                    events={events}
                />
            </div>
        </div>
    );
}

export default Attdatetime;
